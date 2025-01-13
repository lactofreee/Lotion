import { deleteDocument } from '../../api/api';
import createRouter from '../../router/router';

export class deleteHandler {
  private static extractUidFromUrl(): string | null {
    const path = window.location.pathname;
    const match = path.match(/^\/([^/]+)$/);
    return match ? match[1] : null;
  }

  public static async handleDocumentDelete(): Promise<void> {
    const deleteButton = document.getElementById('toolbar__delete--button');
    if (!deleteButton) {
      console.error('Delete button not found');
      return;
    }

    deleteButton.addEventListener('click', async () => {
      try {
        const uid = this.extractUidFromUrl();
        
        // uid가 없거나 숫자가 아닌 경우 처리
        if (!uid || isNaN(Number(uid))) {
          console.error('Invalid document ID');
          return;
        }

        // 문서 삭제 API 호출
        await deleteDocument(Number(uid));
        
        // 라우터 인스턴스는 사용할 때 생성
        const router = createRouter();
        // 삭제 성공 후 메인 페이지로 이동
        router.navigate('/', { replace: true });
        
        console.log('Document successfully deleted');
        
      } catch (error) {
        console.error('Failed to delete document:', error);
      }
    });
  }

  // 문서 페이지 초기화 시 이벤트 핸들러 설정
  public static init(): void {
    this.handleDocumentDelete();
  }
}