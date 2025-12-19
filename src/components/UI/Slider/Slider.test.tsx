import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "./Slider";

const movies = [
  { id: 1, title: "Movie 1", poster_path: "/poster1.jpg" },
  { id: 2, title: "Movie 2", poster_path: "/poster2.jpg" }
];

describe("Slider", () => {
  it("renders movies", () => {
    render(
      <Slider movies={movies} onSelectMovie={vi.fn()} title="Test Slider" />
    );
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("calls onSelectMovie on click", () => {
    const onSelectMovie = vi.fn();
    render(<Slider movies={movies} onSelectMovie={onSelectMovie} />);
    fireEvent.click(screen.getByText("Movie 1"));
    expect(onSelectMovie).toHaveBeenCalledWith(movies[0]);
  });
});
