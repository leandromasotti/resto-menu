export interface MenuItem {
  titulo: string;
  categoria: string;
  precio: number;
  orden?: number;
  categoriaOrden?: number;
  masVendido?: boolean;
  mejorPrecio?: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];

}
