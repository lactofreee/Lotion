import { initTrashModal } from './layout/sidebar/trashList.ts';
import { initDarkMode } from './layout/toolbar/toolbar.ts';

// 앱 초기화 함수
const App = (): void => {
  // 다크모드 초기화
  initDarkMode();
  
  // 휴지통 목록 초기화
  initTrashModal();

};

// DOM이 로드되면 앱 초기화
document.addEventListener('DOMContentLoaded', App);