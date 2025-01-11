import { postNewDoc } from "../../api/docApi/updatetDocApi";

const closeModal = (modal: HTMLElement) => {
  document.body.removeChild(modal);
};

const handleModalClose = async (
  modal: HTMLDivElement,
  form: HTMLFormElement
) => {
  const formData = new FormData(form);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const path = window.location.pathname;
  const match = path.match(/^\/([^/]+)\/newDoc$/);
  const uid = match && match[1];

  // 입력값이 있을 때만 API 요청 보내기
  if (uid && (title?.trim() || content?.trim())) {
    try {
      const res = await postNewDoc(uid, title, content);
      console.log("문서 생성 완료", res);

      closeModal(modal);
    } catch (err) {
      console.log("문서 생성중 오류 발생", err);
    }
  } else {
    closeModal(modal);
  }
};

const modalFormEventHandler = (form: HTMLFormElement) => {
  // 폼 제출 이벤트 핸들러
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault(); // 기본 동작 방지
    const formData = new FormData(form);
    const title = formData.get("title");
    const content = formData.get("content");

    console.log("제목:", title);
    console.log("내용:", content);

    // API 요청 보내기 (예시)
    // fetch('/api/submit', {
    //   method: 'POST',
    //   body: JSON.stringify({ title, content }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then(response => response.json())
    //   .then(data => console.log("서버 응답:", data));
  });
};

export const modalEventHandler = (
  modal: HTMLDivElement,
  form: HTMLFormElement
) => {
  modalFormEventHandler(form);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      handleModalClose(modal, form);
    }
  });
};
