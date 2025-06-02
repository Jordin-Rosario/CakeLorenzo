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
    name: string;
    description: string;
    prince: number;
    after_prince:number
    image: string; // Puede ser una URL o un archivo base64 si estás trabajando con formularios
    available: boolean;
    offer: boolean;
    new_article:boolean;
    hidden: boolean;
    sold: boolean;
    cake_type: number;
    create_time: string; // ISO string (ej: '2025-05-20T15:00:00Z')
  }