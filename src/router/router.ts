import MainPage from "../pages/MainPage.js";
import ErrorPage from "../pages/ErrorPage.js";
import DocumentPage from "../pages/DocumentPage.js";
import { showModal } from "../componets/createNewDoc/showModal.js";

type RouteFunction = (param?: string) => void | Promise<void>;

interface Routes {
  [key: string]: RouteFunction; // key = 라우트 경로 / 값(RouteFunction) = 해당 경로의 핸들러 함수
}

// replace: true면 history.replaceState 사용, false면 pushState 사용할 플래그
interface RouterOptions {
  replace?: boolean;
}

const routes: Routes = {
  "/": MainPage,
  "/404": ErrorPage,
  "/:uid": DocumentPage,
  "/:uid/newDoc": showModal,
};

// DocumentPage가 제대로 import 되어있는지 콘솔로 확인 -> 추후 삭제 예정
console.log("Routes configuration:", {
  mainPage: routes["/"],
  errorPage: routes["/404"],
  documentPage: routes["/:uid"],
});

const router = {
  getPath: () => window.location.pathname, // 현재 URL의 pathname 가져오기

  // URL을 업데이트하고 브라우저 히스토리 관리하는 메서드 (= 히스토리를 쌓을지 말지 결정하고 pathname 반환)
  updateURL: (url: string, { replace = false }: RouterOptions = {}): string => {
    const pathname = url.startsWith("http") ? new URL(url).pathname : url;

    if (replace) {
      history.replaceState({}, "", pathname); // 에러 페이지, 리다이렉트 등 (히스토리 X)
    } else {
      history.pushState({}, "", pathname); // 내부 이동 (히스토리 쌓임)
    }
    return pathname;
  },

  setupListeners: (renderPage: (path: string) => void): void => {
    // 뒤로가기 / 앞으로 가기 버튼을 누르면 실행 -> 브라우저는 URL만 변경해주고 내용을 불러오지 않기 때문에 따로 처리해줌
    const popstateHandler = () => renderPage(router.getPath());
    window.removeEventListener("popstate", popstateHandler);
    window.addEventListener("popstate", popstateHandler);

    // 리액트의 Link 태그 => 링크 클릭시 이동을 처리
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // data-link 속성을 가진 가장 가까운 a태그를 찾음
      const link = target.closest<HTMLAnchorElement>("[data-link]");
      if (link) {
        // 기본 동작을 막고 updateURL울 호출해서 업데이트 & 히스토리 관리
        e.preventDefault();
        const path = router.updateURL(link.href);
        renderPage(path);
      }
    };
    document.removeEventListener("click", clickHandler);
    document.addEventListener("click", clickHandler);
  },
};

interface Router {
  init: (rootElementId: string) => void;
  navigate: (url: string, options?: RouterOptions) => string;
}

const createRouter = (): Router => {
  let rootElement: HTMLElement | null = null; // 루트 엘리먼트 지정용인데 현재 사용하지 않고 있음...

  const renderPage = async (path: string): Promise<void> => {
    // "/:uid/create" 경로 매칭
    const createMatch = path.match(/^\/([^/]+)\/newDoc$/);
    if (createMatch) {
      const uid = createMatch[1];
      const page = routes["/:uid/newDoc"];
      if (page) {
        await page(uid); // showModal 함수 호출
        return;
      }
    }

    // "/:uid" 경로 매칭
    const documentMatch = path.match(/^\/([^/]+)$/);
    if (documentMatch) {
      const uid = documentMatch[1];
      const page = routes["/:uid"];
      if (page) {
        await page(uid); // DocumentPage 함수 호출
        return;
      }
    }

    // 정적 경로 처리
    if (routes[path]) {
      await routes[path]();
      return;
    }

    // 404 페이지 처리
    await routes["/404"]();
  };

  // 리액트의 useNavigate => URL을 변경하고 페이지를 렌더링
  const navigate = (url: string, options?: RouterOptions): string => {
    const path = router.updateURL(url, options);
    renderPage(path);
    return path;
  };

  const init = (rootElementId: string): void => {
    rootElement = document.getElementById(rootElementId);
    if (!rootElement) return;

    router.setupListeners(renderPage); // 라우터 이벤트 리스너 설정
    renderPage(router.getPath()); // 초기 페이지 렌더링
  };

  return { init, navigate };
};

export default createRouter;
