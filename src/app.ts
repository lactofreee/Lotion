import { setMenu } from './componets/sidebar/setMenu.ts';
import { initTrashModal } from './layout/sidebar/trashList.ts';
import { initDarkMode } from './layout/toolbar/toolbar.ts';
import createRouter from './router/router.ts';

// 앱 초기화 함수
const App = (): void => {
  // 라우터 초기화
  const router = createRouter();
  router.init('layout__editor--contents'); // editor contents의 id를 기반으로 초기화

  // 다크모드 초기화
  initDarkMode();
  
  // 휴지통 목록 초기화
  initTrashModal();

  setMenu()

};

// DOM이 로드되면 앱 초기화
document.addEventListener('DOMContentLoaded', App);