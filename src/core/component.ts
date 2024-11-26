export default class Component<TState = any, TTarget = HTMLElement> {
  [x: string]: any; // 동적 키를 위한 설정
  target: TTarget; // 제너릭 타입으로 설정
  state!: TState; // 제너릭 타입으로 설정

  constructor(target: TTarget) {
    this.target = target;
    this.setup();
    this.render();
  }

  // 초기 설정
  setup(): void {}

  // 템플릿 반환
  template(): string {
    return "";
  }

  // 렌더링 처리
  render(): void {
    if (this.target instanceof HTMLElement) {
      this.target.innerHTML = this.template();
    }
    this.setEvent();
  }

  // 이벤트 설정
  setEvent(): void {}

  // 상태 업데이트 및 재렌더링
  setState(newState: Partial<TState>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
