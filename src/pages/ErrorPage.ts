const ErrorPage = (): void => {
  const editorTitleTextarea = document.getElementById('editor__title--textarea') as HTMLTextAreaElement;
  const editorContentTextarea = document.getElementById('layout__editor--content') as HTMLTextAreaElement;

  if (!editorTitleTextarea || !editorContentTextarea) {
    console.error('html 요소가 없음');
    return;
  }

  editorTitleTextarea.value = '404';
  editorContentTextarea.value = '요청하신 페이지를 찾을 수 없습니다.';
  
  // 편집 가능 여부 -> 불가 (에러 페이지이므로)
  editorTitleTextarea.disabled = true;
  editorContentTextarea.disabled = true;
};

export default ErrorPage;