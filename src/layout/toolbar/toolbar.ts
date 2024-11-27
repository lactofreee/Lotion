// 0. 상태 확인 : localStorage에서 다크모드 상태를 확인하는 함수
export const isDarkMode = (): boolean => {
  // localStorage에 저장된 'darkMode' 값이 'true'이면 true 반환
  return localStorage.getItem('darkMode') === 'true';
};

// 1. 다크모드 스타일을 적용하는 함수
export const setDarkMode = (enable: boolean): void => {
  const html = document.documentElement;
  const filter = "invert(100%) hue-rotate(180deg)";
  
  if (enable) {
    // 다크모드 필터 활성화
    html.style.filter = filter;
    html.style.webkitFilter = filter;
  } else {
    // 다크모드 필터 제거
    html.style.filter = '';
    html.style.webkitFilter = '';
  }
};

// 2. 버튼 텍스트를 업데이트하는 함수
export const updateButtonText = (darkMode: boolean): void => {
  const button = document.getElementById('toolbar__theme-toggle--button');
  
  // html element는 타입 검사에서 null일 가능성이 있어 오류 반한됨 -> 타입 가드 필요
  if (button) {
    button.textContent = darkMode ? 'dark' : 'light';
  }
};

// 3. 다크모드를 토글하는 함수
export const toggleDarkMode = (): void => {
  const newDarkMode = !isDarkMode();
  
  // 3-1. 로컬스토리지에 상태 저장
  localStorage.setItem('darkMode', String(newDarkMode));
  // 3-2. 다크모드 스타일 적용
  setDarkMode(newDarkMode);
  // 3-3. 버튼 텍스트 업데이트
  updateButtonText(newDarkMode);
};

// 4. 다크모드 초기화 함수
export const initDarkMode = (): void => {
  // 4-1.다크모드 불린값 확인
  const darkMode = isDarkMode();
  // 4-2. 저장된 상태에 따라 스타일 적용
  setDarkMode(darkMode);
  // 4-3. 버튼 텍스트 초기화
  updateButtonText(darkMode);
  // 4-4. 테마 토글 버튼에 이벤트 리스너 추가
  const button = document.getElementById('toolbar__theme-toggle--button');
  if (button) {
    button.addEventListener('click', toggleDarkMode);
  }
};