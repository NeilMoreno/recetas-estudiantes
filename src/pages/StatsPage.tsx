import React, { useContext, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const StatsPage: React.FC = () => {
  const context = useContext(RecipeContext);
  if (!context) return <p>Error al cargar datos.</p>;

  const { recetas } = context;

  const totalRecetas = recetas.length;

  const recetasPorCategoria = useMemo(() => {
    const conteo: { [categoria: string]: number } = {};
    recetas.forEach(receta => {
      conteo[receta.categoria] = (conteo[receta.categoria] || 0) + 1;
    });
    return conteo;
  }, [recetas]);

  const recetaMasPopular = useMemo(() => {
    return recetas.reduce((prev, current) => {
      return current.valoracion > prev.valoracion ? current : prev;
    }, recetas[0]);
  }, [recetas]);

  return (
    <div className="main-content">
      <h1 className="page-title">📊 Estadísticas de Recetas</h1>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{totalRecetas}</span>
            <span className="stat-label">Recetas Totales</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{Object.keys(recetasPorCategoria).length}</span>
            <span className="stat-label">Categorías</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">⭐ {recetaMasPopular?.valoracion}</span>
            <span className="stat-label">Más Popular: {recetaMasPopular?.nombre}</span>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2 className="section-title">📂 Recetas por Categoría</h2>
        <ul>
          {Object.entries(recetasPorCategoria).map(([categoria, cantidad]) => (
            <li key={categoria}>
              <strong>{categoria}:</strong> {cantidad} receta(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;
