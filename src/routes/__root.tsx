import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthModals from "../components/Auth/AuthModals";
import { useProfileStore } from "../store/userStore";
import { useListManagement } from "../hooks/useListManagement";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: Root
});

function Root() {
  const userId = useProfileStore((state) => state.user?.id);
  const { fetchLists } = useListManagement(0);

  const setFavorites = useProfileStore((state) => state.setFavorites);
  const setWatchlist = useProfileStore((state) => state.setWatchlist);

  useEffect(() => {
    if (userId) {
      fetchLists();
    } else {
      setFavorites([]);
      setWatchlist([]);
    }
  }, [userId, fetchLists, setFavorites, setWatchlist]);
  return (
    <>
      <Header />
      <AuthModals />
      <Outlet />
      <Footer />
    </>
  );
}
