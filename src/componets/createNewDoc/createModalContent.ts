import { modalEventHandler } from "./modalEventHandler";

export const createModalContent = (parentEl: HTMLDivElement) => {
  // 모달 컨테이너 생성
  const modalDivContainer = document.createElement("div");
  modalDivContainer.className = "modal-div__container";

  // 폼 요소 생성
  const form = document.createElement("form");
  form.id = "modal__form";
  form.className = "modal__form";

  // 제목 컨테이너 생성
  const titleContainer = document.createElement("h1");
  titleContainer.id = "layout__editor--title";
  titleContainer.className = "layout__editor--title";

  const titleTextarea = document.createElement("textarea");
  titleTextarea.placeholder = "제목 없음";
  titleTextarea.id = "editor__title--textarea";
  titleTextarea.className = "editor__title--textarea";
  titleTextarea.name = "title"; // 폼 필드 이름 설정

  titleContainer.appendChild(titleTextarea);

  // 내용 필드 생성
  const contentTextarea = document.createElement("textarea");
  contentTextarea.placeholder = "ctrl + s를 눌러 저장하세요.";
  contentTextarea.id = "layout__editor--content";
  contentTextarea.className = "layout__editor--content";
  contentTextarea.name = "content"; // 폼 필드 이름 설정

  // 폼에 필드 추가
  form.appendChild(titleContainer);
  form.appendChild(contentTextarea);

  // 이벤트 처리
  modalEventHandler(parentEl, form);

  // 폼을 모달 컨테이너에 추가
  modalDivContainer.appendChild(form);

  // 모달 컨테이너를 부모 엘리먼트에 추가
  if (parentEl) {
    parentEl.appendChild(modalDivContainer);
  } else {
    console.error("Parent element is not provided!");
  }
};
