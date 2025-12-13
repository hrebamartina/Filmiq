import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

(
  globalThis as unknown as {
    IntersectionObserver: typeof IntersectionObserverMock;
  }
).IntersectionObserver = IntersectionObserverMock;

beforeEach(() => {
  document.body.innerHTML = "";

  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
});
