import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import * as api from "../../api/tmdbApi";
import { vi } from "vitest";

vi.spyOn(api, "fetchMoviesByGenre").mockImplementation(async (genreId) => [
  { id: genreId, title: `Movie ${genreId}`, poster_path: `/poster${genreId}.jpg`, genre_ids: [genreId], overview: "Test overview", release_date: "2024-01-01" }
]);

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn()
}));

describe("Home", () => {
  it("renders sliders for all genres", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Comedy")).toBeInTheDocument();
      expect(screen.getByText("Horror")).toBeInTheDocument();
    });
  });
});
