import React, { useState, useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';

const RecipesPage: React.FC = () => {
  const { recetas } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedSort, setSelectedSort] = useState('valoracion-desc'); // 👈 nuevo estado


  const categories = useMemo(() => {
    return Array.from(new Set(recetas.map(receta => receta.categoria)));
  }, [recetas]);

  const filteredRecetas = useMemo(() => {
    return recetas.filter(receta => {
      const matchesSearch = receta.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        receta.ingredientes.some(ingrediente =>
          ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === '' || 
        receta.categoria === selectedCategory;
      
      const matchesDifficulty = selectedDifficulty === '' || 
        receta.dificultad === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recetas, searchTerm, selectedCategory, selectedDifficulty]);

  const sortedRecetas = useMemo(() => {
    const copia = [...filteredRecetas];
    switch (selectedSort) {
      case 'valoracion-asc':
        return copia.sort((a, b) => a.valoracion - b.valoracion);
      case 'valoracion-desc':
        return copia.sort((a, b) => b.valoracion - a.valoracion);
      case 'tiempo-asc':
        return copia.sort((a, b) => a.tiempo - b.tiempo);
      case 'tiempo-desc':
        return copia.sort((a, b) => b.tiempo - a.tiempo);
      default:
        return copia;
    }
  }, [filteredRecetas, selectedSort]);

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1 className="page-title">📖 Todas las Recetas</h1>
        <p className="page-subtitle">
          Descubre recetas deliciosas y fáciles de preparar
        </p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
        categories={categories}
      />

      {}
      <div className="sort-bar">
        <label htmlFor="sort" className="filter-label">Ordenar por:</label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="filter-select"
        >
          <option value="valoracion-desc">⭐ Valoración (mayor a menor)</option>
          <option value="valoracion-asc">⭐ Valoración (menor a mayor)</option>
          <option value="tiempo-asc">⏱ Tiempo (menor a mayor)</option>
          <option value="tiempo-desc">⏱ Tiempo (mayor a menor)</option>
        </select>
      </div>

      <div className="results-info">
        <p className="results-count">
          {filteredRecetas.length === recetas.length 
            ? `Mostrando todas las ${recetas.length} recetas`
            : `Mostrando ${filteredRecetas.length} de ${recetas.length} recetas`
          }
        </p>
      </div>

      {sortedRecetas.length === 0 ? (
        <div className="no-results">
          <h3>😔 No se encontraron recetas</h3>
          <p>Intenta cambiar los filtros o términos de búsqueda</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedDifficulty('');
              setSelectedSort('valoracion-desc');
            }}
            className="clear-filters-btn"
          >
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="recipes-grid">
          {sortedRecetas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
