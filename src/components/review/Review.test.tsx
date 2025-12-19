import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Review from "./Review";
import { vi } from "vitest";

vi.mock("../../hooks/useReviewActions", () => ({
  useReviewActions: () => ({
    addReview: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null
  })
}));

vi.mock("../../store/userStore", () => ({
  useProfileStore: () => ({ user: { id: 1, username: "TestUser" } })
}));

describe("Review", () => {
  it("renders form correctly", () => {
    render(<Review movieId={1} movieTitle="Movie" onClose={() => {}} />);
    expect(screen.getByPlaceholderText("Write your review here...")).toBeInTheDocument();
    expect(screen.getByText("Post Review")).toBeInTheDocument();
  });

  it("posts review on submit", async () => {
    const onClose = vi.fn();
    render(<Review movieId={1} movieTitle="Movie" onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Write your review here..."), {
      target: { value: "Great movie!" }
    });
    fireEvent.click(screen.getByText("Post Review"));

    await waitFor(() => {
      expect(screen.getByText("Review posted successfully!")).toBeInTheDocument();
    });
  });
});
