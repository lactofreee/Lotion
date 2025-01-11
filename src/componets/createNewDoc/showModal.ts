import { createModalContent } from "./createModalContent";

export const showModal = (parentUid?: string): void => {
  const modal = document.createElement("div");
  modal.id = "create-document-modal";
  modal.className = "create-document-modal";

  createModalContent(modal);

  document.body.appendChild(modal);
};
