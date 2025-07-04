import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';

const FavoritesPage: React.FC = () => {
  const { recetas, favoritos } = useRecipes();

  const recetasFavoritas = recetas.filter(receta => 
    favoritos.includes(receta.id)
  );

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1 className="page-title">❤️ Mis Recetas Favoritas</h1>
        <p className="page-subtitle">
          Aquí tienes todas las recetas que has marcado como favoritas
        </p>
      </div>

      {recetasFavoritas.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h3>No tienes recetas favoritas aún</h3>
          <p>
            Explora nuestras recetas y marca las que más te gusten haciendo clic en el corazón
          </p>
          <Link to="/recetas" className="cta-button primary">
            Explorar Recetas
          </Link>
        </div>
      ) : (
        <>
          <div className="favorites-info">
            <p className="favorites-count">
              🎉 Tienes {recetasFavoritas.length} receta{recetasFavoritas.length !== 1 ? 's' : ''} favorita{recetasFavoritas.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="recipes-grid">
            {recetasFavoritas.map(receta => (
              <RecipeCard key={receta.id} recipe={receta} />
            ))}
          </div>
          
          <div className="favorites-actions">
            <Link to="/recetas" className="secondary-button">
              Explorar Más Recetas
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;