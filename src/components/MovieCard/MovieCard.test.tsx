import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  it("renders movie title and image", () => {
    const movie = {
      id: 1,
      title: "Inception",
      overview: "A mind-bending thriller about dreams within dreams.",
      release_date: "2010-07-16",
      poster_path: "/inception.jpg"
    };

    render(
      <MovieCard
        movie={movie}
        isFavorite={false}
        inWatchlist={false}
        isListLoading={false}
        isAuthenticated={true}
        onToggleFavorite={async () => Promise.resolve()}
        onToggleWatchlist={async () => Promise.resolve()}
      />
    );

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /inception/i })).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/inception.jpg"
    );
  });
});
