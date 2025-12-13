import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import { vi } from "vitest";

vi.mock("../../store/userStore", () => ({
  useProfileStore: () => ({
    favorites: [{ id: 1, title: "Fav Movie", poster_path: "/fav.jpg" }],
    watchlist: [{ id: 2, title: "Watch Movie", poster_path: "/watch.jpg" }],
    user: { id: 1, username: "User", email: "user@test.com" }
  })
}));

vi.mock("../../hooks/useFetchReviews", () => ({
  useFetchReviews: () => ({ reviews: [], loading: false, error: null })
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn()
}));

describe("Profile", () => {
  it("renders user info", () => {
    render(<Profile />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("user@test.com")).toBeInTheDocument();
  });

  it("renders favorite movies slider", () => {
    render(<Profile />);
    expect(screen.getByText("Favorite Films")).toBeInTheDocument();
  });
});
