import React from "react";
import ReactDOM from "react-dom";

// Мок IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

// Мок методів <dialog>
HTMLDialogElement.prototype.showModal = function () {};
HTMLDialogElement.prototype.close = function () {};

// Мок createPortal (типізовано для TS)
ReactDOM.createPortal = ((node: React.ReactNode) =>
  node) as unknown as typeof ReactDOM.createPortal;
