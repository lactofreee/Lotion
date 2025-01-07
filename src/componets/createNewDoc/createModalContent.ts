export const createModalContent = (parentEl:HTMLDivElement) => {
  const modalDivContainer = document.createElement("div");
  modalDivContainer.className = "modal-div__container";

  const titleContainer = document.createElement("h1");
  titleContainer.id = "layout__editor--title";
  titleContainer.className = "layout__editor--title";

  const titleTextarea = document.createElement("textarea");
  titleTextarea.placeholder = "제목 없음";
  titleTextarea.id = "editor__title--textarea";
  titleTextarea.className = "editor__title--textarea";

  titleContainer.appendChild(titleTextarea);

  const contentTextarea = document.createElement("textarea");
  contentTextarea.placeholder = "crtl + s를 눌러 저장하세요.";
  contentTextarea.id = "layout__editor--content";
  contentTextarea.className = "layout__editor--content";

  modalDivContainer.appendChild(titleContainer);
  modalDivContainer.appendChild(contentTextarea);

  if (parentEl) {
    parentEl.appendChild(modalDivContainer);
  } else {
    console.error("Parent element is not provided!");
  }
};
