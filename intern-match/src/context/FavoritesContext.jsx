import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "internmatch_favorites";

const getInitialFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getInitialFavorites);

  const addFavorite = (intern) => {
    const newFavorites = [...favorites, intern];
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (internId) => {
    const newFavorites = favorites.filter((f) => f.id !== internId);
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (internId) => favorites.some((f) => f.id === internId);

  const toggleFavorite = (intern) => {
    if (isFavorite(intern.id)) {
      removeFavorite(intern.id);
    } else {
      addFavorite(intern);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

export { FavoritesContext };