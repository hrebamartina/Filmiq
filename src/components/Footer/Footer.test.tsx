import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("Footer", () => {
  it("renders main elements", () => {
    render(<Footer />);

    expect(screen.getByText("Don't know what to choose?")).toBeInTheDocument();

    const randomLinks = screen.getAllByText("Random Movie");
    expect(randomLinks.length).toBeGreaterThan(1);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
