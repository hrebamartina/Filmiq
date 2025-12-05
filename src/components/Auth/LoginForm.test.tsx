
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { vi } from "vitest";

const mockOnSwitchToSignup = vi.fn();
const mockLogin = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
    error: null
  })
}));

vi.mock('../../store/authModalStore', () => ({
  useAuthModalStore: () => ({
    modalView: 'login',
    closeModal: vi.fn(), 
    switchToLogin: vi.fn(),
    switchToSignup: vi.fn(),
  }),
}));


describe("LoginForm", () => {
  it("renders input fields and button", () => {
    render(<LoginForm onSwitchToSignup={mockOnSwitchToSignup} />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("calls login on form submit", async () => {
    render(<LoginForm onSwitchToSignup={mockOnSwitchToSignup} />);
    
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(mockLogin).toHaveBeenCalledWith({ email: "test@test.com", password: "123456" });
  });

  it("calls onSwitchToSignup when Sign up button is clicked", () => {
    render(<LoginForm onSwitchToSignup={mockOnSwitchToSignup} />);
    fireEvent.click(screen.getByText(/Sign up/i));
    expect(mockOnSwitchToSignup).toHaveBeenCalled();
  });
});
