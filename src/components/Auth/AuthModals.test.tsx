import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AuthModals from "./AuthModals";

const closeModalMock = vi.fn();
const switchToLoginMock = vi.fn();
const switchToSignupMock = vi.fn();

let modalView = "login";

vi.mock("../../store/authModalStore", () => ({
  useAuthModalStore: () => ({
    modalView,
    closeModal: closeModalMock,
    switchToLogin: switchToLoginMock,
    switchToSignup: switchToSignupMock
  })
}));

vi.mock("../UI/Modal/Modal", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

describe("AuthModals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders LoginForm when modalView is 'login'", () => {
    modalView = "login";
    render(<AuthModals />);
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  it("renders SignupForm when modalView is 'signup'", () => {
    modalView = "signup";
    render(<AuthModals />);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
