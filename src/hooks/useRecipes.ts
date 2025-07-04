import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('useRecipes debe usarse dentro de un RecipeProvider');
  }

  const {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  } = context;

  const [filterDifficulty, setFilterDifficulty] = useState<string>('');

  const filterByDifficulty = (dificultad: string): Recipe[] => {
    return recetas.filter(receta => receta.dificultad.toLowerCase() === dificultad.toLowerCase());
  };

  return {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
    filterDifficulty,
    setFilterDifficulty,
    filterByDifficulty, 
  };
};
