import { App } from 'vue'

declare const useResize: {
  (el: HTMLElement, callback: (contentRect: DOMRectReadOnly) => void): void
  install: (app: App) => void
}

export default useResize;
