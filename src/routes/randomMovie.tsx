import { createFileRoute } from "@tanstack/react-router";
import RandomMovie from "../pages/RandomMovie/RandomMovie";

export const Route = createFileRoute("/randomMovie")({
  component: RandomMovie
});
