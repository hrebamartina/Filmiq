import { render, screen, fireEvent, act } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { vi } from "vitest";

const mockOnSwitchToLogin = vi.fn();
const mockRegister = vi.fn().mockResolvedValue(undefined);
const mockCloseModal = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    register: mockRegister,
    isLoading: false,
    error: null,
  }),
}));

vi.mock("../../store/authModalStore", () => ({
  useAuthModalStore: (selector: (state: { closeModal: () => void }) => unknown) =>
    selector({ closeModal: mockCloseModal }),
}));


describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders inputs and Sign Up button", () => {
    render(<SignupForm onSwitchToLogin={mockOnSwitchToLogin} />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("calls register and closes modal on form submit", async () => {
    render(<SignupForm onSwitchToLogin={mockOnSwitchToLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "123456" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("calls onSwitchToLogin when Login button is clicked", () => {
    render(<SignupForm onSwitchToLogin={mockOnSwitchToLogin} />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(mockOnSwitchToLogin).toHaveBeenCalledTimes(1);
  });
});
