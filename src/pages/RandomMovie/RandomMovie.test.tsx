import { render, screen, waitFor } from "@testing-library/react";
import RandomMovie from "./RandomMovie";
import { vi } from "vitest";

vi.mock("../../components/MovieCard/MovieCard", () => ({
  default: (props: { movie: { title: string } }) => (
    <div data-testid="movie-card">{props.movie?.title}</div>
  ),
}));

beforeAll(() => {
  class MockIntersectionObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  (globalThis as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver =
    MockIntersectionObserver;
});

const mockMovie = { id: 1, title: "Random Movie", poster_path: null };
vi.stubGlobal("fetch", vi.fn((url: string) => {
  if (url.includes("/discover/movie")) {
    return Promise.resolve({ json: () => Promise.resolve({ results: [mockMovie] }) } as Response);
  }
  if (url.includes(`/movie/${mockMovie.id}`)) {
    return Promise.resolve({ json: () => Promise.resolve(mockMovie) } as Response);
  }
  return Promise.reject(new Error("Unknown URL"));
}));

describe("RandomMovie", () => {
  it("renders heading, movie card and buttons", async () => {
    render(<RandomMovie />);

    expect(screen.getByText(/Choose a genre/i)).toBeInTheDocument();

    await waitFor(() => screen.getByTestId("movie-card"));
    expect(screen.getByTestId("movie-card")).toHaveTextContent("Random Movie");

    expect(screen.getByText("Add to Watchlist")).toBeInTheDocument();
    expect(screen.getByText("Try another")).toBeInTheDocument();
  });
});
