import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from '../services/favoritesService'; 

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>(getFavorites()); 

  const addToFavoritos = (id: number) => {
    if (!favoritos.includes(id)) {
      addFavorite(id); 
      setFavoritos([...favoritos, id]);
    }
  };

  const removeFromFavoritos = (id: number) => {
    removeFavorite(id); 
    setFavoritos(favoritos.filter(favId => favId !== id));
  };

  const isFavorito = (id: number) => favoritos.includes(id);

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = recetas.length > 0 ? Math.max(...recetas.map(r => r.id)) + 1 : 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId,
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value: RecipeContextType = {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
