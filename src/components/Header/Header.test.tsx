import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Header from "./Header";

vi.mock("../../store/authModalStore", () => ({
  useAuthModalStore: () => ({
    modalView: "closed",
    openModal: vi.fn(),
    closeModal: vi.fn(),
    switchToLogin: vi.fn(),
    switchToSignup: vi.fn()
  })
}));

vi.mock("../../store/userStore", () => ({
  useProfileStore: () => ({
    user: { name: "Test User" }
  })
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    logout: vi.fn()
  })
}));

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router"
  );

  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    )
  };
});

describe("Header", () => {
  it("renders profile label when user is authenticated", () => {
    render(<Header />);

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/random movie/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
});
