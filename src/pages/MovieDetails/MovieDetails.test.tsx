import { render, screen, waitFor } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { vi } from "vitest";

vi.mock("../../components/CommunityReviews/CommunityReviews", () => ({
  default: () => (
    <div data-testid="community-reviews">CommunityReviews component</div>
  )
}));

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({ id: "1" })
}));

interface MockResponse {
  ok: boolean;
  json: () => Promise<Record<string, unknown>>;
}

const mockedFetch: typeof fetch = vi.fn((input: RequestInfo) =>
  Promise.resolve({
    ok: true,
    json: async () =>
      input.toString().includes("/reviews")
        ? { results: [] }
        : {
            id: 1,
            title: "Inception",
            overview: "A mind-bending thriller.",
            release_date: "2010-07-16",
            vote_average: 8.8
          }
  } as MockResponse)
) as unknown as typeof fetch;

globalThis.fetch = mockedFetch;

describe("MovieDetails", () => {
  it("renders movie details and CommunityReviews", async () => {
    render(<MovieDetails />);

    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
    });

    expect(screen.getByText("A mind-bending thriller.")).toBeInTheDocument();

    expect(screen.getByText("2010")).toBeInTheDocument();

    expect(screen.getByTestId("community-reviews")).toBeInTheDocument();
  });
});
