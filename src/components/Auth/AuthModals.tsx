import { useAuthModalStore } from "../../store/authModalStore";
import Modal from "../UI/Modal/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModals() {
  const { modalView, closeModal, switchToLogin, switchToSignup } =
    useAuthModalStore();

  const isOpen = modalView !== "closed";

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {modalView === "login" && <LoginForm onSwitchToSignup={switchToSignup} />}

      {modalView === "signup" && <SignupForm onSwitchToLogin={switchToLogin} />}
    </Modal>
  );
}
