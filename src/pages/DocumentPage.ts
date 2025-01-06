import { fetchDocument } from '../api/api';
import ErrorPage from './ErrorPage';

const DocumentPage = async (param?: string): Promise<void> => {
  const editorTitleTextarea = document.getElementById('editor__title--textarea') as HTMLTextAreaElement;
  const editorContentTextarea = document.getElementById('layout__editor--content') as HTMLTextAreaElement;

  if (!editorTitleTextarea || !editorContentTextarea) {
    console.error('html 요소가 없음');
    return;
  }

  if (!param) {
    console.error('문서 ID가 없습니다');
    ErrorPage(); // 수정 : 직접 ErrorPage 컴포넌트 호출
    return;
  }

  try {
    const document = await fetchDocument(param);
    
    // 문서 데이터로 에디터 업데이트
    editorTitleTextarea.value = document.title;
    editorContentTextarea.value = document.content;
    
    // 편집 가능하도록 설정
    editorTitleTextarea.disabled = false;
    editorContentTextarea.disabled = false;
  } catch (error) {
    console.error('문서를 불러오는데 실패했습니다:', error);
    ErrorPage(); // 직접 ErrorPage 컴포넌트 호출
  }
};

export default DocumentPage;