import { render, screen } from "@testing-library/react";
import RandomMovieBtn from "./Button";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  )
}));

describe("RandomMovieBtn", () => {
  it("renders button with correct text and link", () => {
    render(<RandomMovieBtn />);
    const linkElement = screen.getByText("Random Movie");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/randomMovie");
  });
});
