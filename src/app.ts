import { initDarkMode } from './layout/toolbar/toolbar';

// 앱 초기화 함수
const App = (): void => {
  // 다크모드 초기화
  initDarkMode();
  
};

// DOM이 로드되면 앱 초기화
document.addEventListener('DOMContentLoaded', App);