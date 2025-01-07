import { showModal } from "../createNewDoc/showModal";
import { createMenuEl } from "./createMenuEl";

const menuHoverEventHandler = () => {
  const parentEl = document.getElementById("sidebar__doucument-list--ul");

  parentEl?.addEventListener("mouseover", (event) => {
    const targetEl = event.target as HTMLElement;

    const liEl = targetEl.closest("#sidebar__doucument-list--li");

    if (liEl) {
      liEl.classList.add("doucument-list--hover");
    }
  });

  parentEl?.addEventListener("mouseout", (event) => {
    const targetEl = event.target as HTMLElement;

    const liEl = targetEl.closest("#sidebar__doucument-list--li");

    if (liEl) {
      liEl.classList.remove("doucument-list--hover");
    }
  });
};

const menuActiveEventHandler = () => {
  const parentEl = document.getElementById("sidebar__doucument-list--ul");

  parentEl?.addEventListener("click", (event) => {
    const dropDownButton = (event.target as HTMLElement)?.closest(
      "#doucument-list__dropdown--button"
    );

    if (dropDownButton) {
      const isActive = dropDownButton.classList.toggle("active");

      const liEl = dropDownButton.closest("li");

      if (liEl) {
        const childDocsWrapper = document.createElement("ul");
        childDocsWrapper.id = "document__list--ul";
        childDocsWrapper.className = "document__list--ul";

        // const childDocs = createMenuEl(childDocsWrapper);

        const childDoc = document.createElement("p");
        childDoc.innerText = "hello";
        childDocsWrapper.appendChild(childDoc);

        liEl.appendChild(childDocsWrapper);
        if (isActive) {
        } else {
        }
      }
    }
  });
};

const createDocButtonHandler = () => {
  const parentEl = document.getElementById("sidebar__doucument-list--ul");

  parentEl?.addEventListener("click", (event) => {
    const addButton = (event.target as HTMLElement).closest(
      "#doucument-list__create-document--button"
    );

    if (addButton) {
      const parentLi = (addButton as HTMLElement).closest(
        ".sidebar__doucument-list--li"
      );
      const parentUid = parentLi?.getAttribute("data-uid");

      if (parentUid) {
        showModal(parentUid); // 모달 띄우기
      }
    }
  });
};

export const menuEventHandler = () => {
  menuHoverEventHandler();
  menuActiveEventHandler();
  createDocButtonHandler();
};
