import MainPage from "../pages/MainPage.js";
import ErrorPage from "../pages/ErrorPage.js";
import DocumentPage from "../pages/DocumentPage.js";
import { showModal } from "../componets/createNewDoc/showModal.js";

type RouteFunction = (param?: string) => void | Promise<void>;

interface Routes {
  [key: string]: RouteFunction;
}

interface RouterOptions {
  replace?: boolean;
}

interface RouterType {
  getPath: () => string;
  updateURL: (url: string, options?: RouterOptions) => string;
  setupListeners: (handleRoute: (path: string) => void) => void;
}

const routes: Routes = {
  "/": MainPage,
  "/404": ErrorPage,
  "/:uid": DocumentPage,
  "/create-new-doc": showModal,
};

// DocumentPage가 제대로 import 되어있는지 콘솔로 확인
console.log("Routes configuration:", {
  mainPage: routes["/"],
  errorPage: routes["/404"],
  documentPage: routes["/:uid"],
});

const routerTypes: Record<string, RouterType> = {
  history: {
    getPath: () => window.location.pathname,

    updateURL: (
      url: string,
      { replace = false }: RouterOptions = {}
    ): string => {
      const pathname = url.startsWith("http") ? new URL(url).pathname : url;

      if (replace) {
        history.replaceState({}, "", pathname);
      } else {
        history.pushState({}, "", pathname);
      }
      return pathname;
    },

    setupListeners: (handleRoute: (path: string) => void): void => {
      const popstateHandler = () => handleRoute(routerTypes.history.getPath());
      window.removeEventListener("popstate", popstateHandler);
      window.addEventListener("popstate", popstateHandler);

      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest<HTMLAnchorElement>("[data-link]");
        if (link) {
          e.preventDefault();
          const path = routerTypes.history.updateURL(link.href);
          handleRoute(path);
        }
      };
      document.removeEventListener("click", clickHandler);
      document.addEventListener("click", clickHandler);
    },
  },

  hash: {
    getPath: (): string => {
      const hash = window.location.hash.replace(/^#/, "");
      return hash ? hash : "/";
    },

    updateURL: (
      url: string,
      { replace = false }: RouterOptions = {}
    ): string => {
      const hashPath = url.startsWith("http")
        ? new URL(url).hash.replace(/^#/, "")
        : url.replace(/^#/, "");
      const targetHash = hashPath.startsWith("/") ? hashPath : `/${hashPath}`;

      if (replace) {
        const currentURL = new URL(window.location.href);
        currentURL.hash = targetHash;
        history.replaceState({}, "", currentURL.href);
      } else {
        window.location.hash = targetHash;
      }

      return targetHash;
    },

    setupListeners: (handleRoute: (path: string) => void): void => {
      const hashChangeHandler = () => handleRoute(routerTypes.hash.getPath());
      window.removeEventListener("hashchange", hashChangeHandler);
      window.addEventListener("hashchange", hashChangeHandler);

      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest<HTMLAnchorElement>("[data-link]");
        if (link) {
          e.preventDefault();
          const href = link.getAttribute("href") || "";
          const path = routerTypes.hash.updateURL(href);
          handleRoute(path);
        }
      };
      document.removeEventListener("click", clickHandler);
      document.addEventListener("click", clickHandler);
    },
  },
};

interface Router {
  init: (rootElementId: string) => void;
  navigate: (url: string, options?: RouterOptions) => string;
}

const createRouter = (type: "history" | "hash" = "history"): Router => {
  // 동적 라우터 오작동,,,ㅠㅠ으로 인해 테스트 코드 추가
  // const testPaths = ["/abc123", "/abc/123", "/", "/document-1"];
  // testPaths.forEach((path) => {
  //   const uid = path.match(/^\/([^/]+)$/);
  //   console.log(`Path: ${path}, Extracted UID:`, uid ? uid[1] : null);
  // });

  const router = routerTypes[type];
  let rootElement: HTMLElement | null = null;

  // URL에서 uid를 추출하는 함수
  const extractUid = (path: string): string | null => {
    const match = path.match(/^\/([^/]+)$/);
    return match ? match[1] : null;
  };

  const renderPage = async (path: string): Promise<void> => {
    if (routes[path]) {
      await routes[path]();
      return;
    }
  
    // 동적 라우트 처리
    const uid = extractUid(path);
    if (uid && path !== "/404") {
      const page = routes["/:uid"];
      if (page) {
        await page(uid);
        return;
      }
    }
  
    // 404 처리
    await routes["/404"]();
  };

  const handleRoute = (path: string): void => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (path === "/profile" && !user) {
      navigate("/login", { replace: true });
      return;
    }

    if (path === "/login" && user) {
      navigate("/", { replace: true });
      return;
    }

    renderPage(path);
  };

  const navigate = (url: string, options?: RouterOptions): string => {
    const path = router.updateURL(url, options);
    handleRoute(path);
    return path;
  };

  const init = (rootElementId: string): void => {
    rootElement = document.getElementById(rootElementId);
    if (!rootElement) return;

    router.setupListeners(handleRoute);
    handleRoute(router.getPath());
  };

  return { init, navigate };
};

export default createRouter;
