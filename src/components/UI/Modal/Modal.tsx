import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  className
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal-root")!;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.modal} ${className || ""}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).nodeName === "DIALOG") onClose();
      }}
      onClose={onClose}
    >
      <button className={styles.modal__close} onClick={onClose}>
        &times;
      </button>
      {children}
    </dialog>,
    modalRoot
  );
}
