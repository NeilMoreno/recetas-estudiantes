export interface Recipe {
  id: number;
  nombre: string;
  imagen: string;
  ingredientes: string[];
  pasos: string[];
  tiempo: number;
  tiempoCoccion: number; 
  dificultad: 'fácil' | 'medio' | 'difícil';
  categoria: string;
  valoracion: number;
  porciones: number;
}

export interface RecipeFormData {
  nombre: string;
  ingredientes: string;
  pasos: string;
  tiempo: number;
  tiempoCoccion: number; 
  dificultad: 'fácil' | 'medio' | 'difícil';
  categoria: string;
  porciones: number;
}

export interface RecipeFormErrors {
  nombre?: string;
  ingredientes?: string;
  pasos?: string;
  tiempo?: string;
  tiempoCoccion?: string; 
  dificultad?: string;
  categoria?: string;
  porciones?: string;
}
