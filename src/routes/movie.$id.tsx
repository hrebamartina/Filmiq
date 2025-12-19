import { createFileRoute } from "@tanstack/react-router";

import MovieDetails from "../pages/MovieDetails/MovieDetails";

export const Route = createFileRoute("/movie/$id")({
  component: MovieDetails
});
