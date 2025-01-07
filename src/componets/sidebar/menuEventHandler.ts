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
    const dropDownButton = event.target?.closest(
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
  const menuWrapper = document.getElementById("sidebar__doucument-list--ul");
  const createDocButton = document.getElementById(
    "sidebar__create-document--button"
  );

  createDocButton?.addEventListener("click", (event) => {
    const parentLiEl = event.target?.closest("#sidebar__doucument-list--li");
    console.log(parentLiEl);
  });
};

export const menuEventHandler = () => {
  menuHoverEventHandler();
  menuActiveEventHandler();
  createDocButtonHandler();
};
