export interface PerfilUsuario  {
  user: {
    id: number;
    username: string;
    email: string;
  };
  telefono: string;
  otro_contacto: string;
  direccion: string;
};

export interface Categoria {
    id: number;
    name: string;
  }
  
  // Relación de tipos de pastel con su categoría
//   export interface CakeType {
//     id: number;
//     type_name: string;
//     category: Categoria;
//   }

export interface Cake {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_anterior:number
    imagen: string; // Puede ser una URL o un archivo base64 si estás trabajando con formularios
    disponible: boolean;
    oferta: boolean;
    articulo_nuevo:boolean;
    ocultar: boolean;
    agotado: boolean;
    cake_type: number;
    creado_en: string; // ISO string (ej: '2025-05-20T15:00:00Z')
  }