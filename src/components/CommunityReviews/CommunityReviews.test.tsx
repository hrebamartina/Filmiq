import { render, screen, within } from "@testing-library/react";
import CommunityReviews from "./CommunityReviews";

describe("CommunityReviews", () => {
  it("renders title", () => {
    render(<CommunityReviews reviews={[]} />);
    expect(screen.getByText("Community Reviews")).toBeInTheDocument();
  });

  it("shows message when no reviews", () => {
    render(<CommunityReviews reviews={[]} />);
    expect(screen.getByText("No reviews yet.")).toBeInTheDocument();
  });

  it("renders reviews correctly", () => {
    const reviews = [
      {
        id: "1",
        author: "Alice",
        content: "Great movie!",
        created_at: "2025-12-05T12:00:00Z",
        author_details: { rating: 9 }
      },
      {
        id: "2",
        author: "Bob",
        content: "Not bad.",
        created_at: "2025-12-04T10:00:00Z",
        author_details: { rating: null }
      }
    ];

    render(<CommunityReviews reviews={reviews} />);

    const aliceReview = screen.getByText("Alice").closest("div")!;
    expect(within(aliceReview).getByText("Great movie!")).toBeInTheDocument();
    expect(within(aliceReview).getByText(/9\s*\/\s*10/)).toBeInTheDocument();

    const bobReview = screen.getByText("Bob").closest("div")!;
    expect(within(bobReview).getByText("Not bad.")).toBeInTheDocument();
  });
});
