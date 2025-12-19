import { createFileRoute } from "@tanstack/react-router";
import Profile from "../pages/Profile/Profile";

export const Route = createFileRoute("/profile")({
  component: Profile
});
