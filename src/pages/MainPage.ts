const MainPage = (): void => {
  const editorTitleTextarea = document.getElementById('editor__title--textarea') as HTMLTextAreaElement;
  const editorContentTextarea = document.getElementById('layout__editor--content') as HTMLTextAreaElement;

  if (!editorTitleTextarea || !editorContentTextarea) {
    console.error('html 요소가 없음');
    return;
  }

  editorTitleTextarea.value = '';
  editorContentTextarea.value = '';
  
  // 편집 가능 여부
  editorTitleTextarea.disabled = false;
  editorContentTextarea.disabled = false;
};

export default MainPage;