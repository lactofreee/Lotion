import { fetchTrashList, deleteDocument, type TrashDocument } from '../../api/api';

export const initTrashModal = () => {
  const deleteButton = document.getElementById("delete-list__open--button");
  const deleteListModal = document.getElementById("delete-list__modal");
    
  if (!deleteButton || !deleteListModal) {
    console.error("html 요소가 없음");
    return;
  }

  // 휴지통 목록을 렌더링하는 함수
  const renderTrashList = (trashItems: TrashDocument[]) => {
    trashItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'delete-list__modal-item';
      listItem.id = 'delete-list__modal-item';
      listItem.setAttribute('data-uid', item.id.toString());

      // 내부 wrapper div 생성
      const wrapper = document.createElement('div');
      wrapper.className = 'delete-list__modal-item--wrapper';
      wrapper.id = 'delete-list__modal-item--wrapper';

      // 제목 p 태그 생성
      const nameElement = document.createElement('p');
      nameElement.className = 'modal-item__name';
      nameElement.id = 'modal-item__name';
      nameElement.textContent = item.title;

      // 경로 p 태그 생성 (sub_docs를 경로 형태로 변환)
      const pathElement = document.createElement('p');
      pathElement.className = 'modal-item__path';
      pathElement.id = 'modal-item__path';
      pathElement.textContent = item.sub_docs.join(' / ');

      // 삭제 버튼 생성
      const deleteButton = document.createElement('button');
      deleteButton.className = 'modal-item__delete-button';
      deleteButton.id = 'modal-item__delete-button';

      // 삭제 버튼 클릭시 document 삭제 API 요청
      deleteButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          await deleteDocument(item.id);
          listItem.remove(); // 성공적으로 삭제되면 UI에서도 제거
        } catch (error) {
          console.error('문서 삭제 실패:', error);
        }
      });

      // 삭제 버튼 이미지 생성
      const deleteImage = document.createElement('img');
      deleteImage.src = './src/asset/trash-can.svg';
      deleteImage.alt = '즉시 삭제 버튼';

      // 생성된 element 합치기
      deleteButton.appendChild(deleteImage);
      wrapper.appendChild(nameElement);
      wrapper.appendChild(pathElement);
      listItem.appendChild(wrapper);
      listItem.appendChild(deleteButton);

      // 타이틀 li 다음에 새로운 아이템 추가
      const titleElement = deleteListModal.querySelector('.delete-list__modal-title');
      titleElement?.insertAdjacentElement('afterend', listItem);
    });
  };

  // 휴지통 목록 데이터 가져오기
  const loadTrashList = async () => {
    try {
      const trashItems = await fetchTrashList();
      renderTrashList(trashItems);
    } catch (error) {
      console.error('휴지통 목록을 불러오는데 실패했습니다:', error);
    }
  };

  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteListModal.classList.toggle("show");
    loadTrashList(); // 모달이 열릴 때 목록 불러오기
  });

  // 모달 외부 클릭시 닫기
  document.addEventListener("click", (e) => {
    if (deleteListModal.classList.contains("show") && !deleteListModal.contains(e.target as Node)) {
      deleteListModal.classList.remove("show");
    }
  });
};