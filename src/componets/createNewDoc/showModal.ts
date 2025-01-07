import { createModalContent } from "./createModalContent";

export const showModal = (parentUid: string) => {

  const modal = document.createElement("div");
  modal.id = "create-document-modal";
  modal.className = "create-document-modal";

  createModalContent(modal);

  document.body.appendChild(modal);

  // 이벤트 처리
  const confirmButton = document.getElementById("create-document-confirm");
  const cancelButton = document.getElementById("create-document-cancel");
  const inputField = document.getElementById(
    "document-title"
  ) as HTMLInputElement;

  // Confirm 버튼 클릭
  confirmButton?.addEventListener("click", () => {
    const newDocumentTitle = inputField.value.trim();
    if (newDocumentTitle) {
      console.log(
        `Creating new document under UID: ${parentUid}, Title: ${newDocumentTitle}`
      );
      // TODO: 하위 문서 생성 로직 추가
    }
    closeModal(modal);
  });

  // Cancel 버튼 클릭
  cancelButton?.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
};

const closeModal = (modal: HTMLElement) => {
  document.body.removeChild(modal);
};
