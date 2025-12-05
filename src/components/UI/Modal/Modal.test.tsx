import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "./Modal";

beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("Modal", () => {
  it("renders children when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose when clicking close button", () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("×"));
    expect(onClose).toHaveBeenCalled();
  });
});
