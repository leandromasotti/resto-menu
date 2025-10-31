import { MenuItem, MenuCategory } from '@/types/menu';

export async function fetchMenuData(): Promise<MenuCategory[]> {
  try {
    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    
    if (!sheetUrl) {
      throw new Error('GOOGLE_SHEET_URL environment variable is not set');
    }

    const response = await fetch(sheetUrl, {
      next: { revalidate: 300 } // Revalidar cada 5 minutos
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch menu data: ${response.status}`);
    }

    const csvText = await response.text();
    const menuItems = parseCSV(csvText);
    const categorizedMenu = groupByCategory(menuItems);
    
    return categorizedMenu;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    // Retornar datos de ejemplo en caso de error
    return getExampleMenuData();
  }
}

function parseCSV(csvText: string): MenuItem[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Buscar las columnas correctas
  const nombreIndex = headers.findIndex(h => h.includes('nombre') || h.includes('titulo'));
  const categoriaIndex = headers.findIndex(h => h.includes('categoria'));
  const precioIndex = headers.findIndex(h => h.includes('precio'));
  const ordenIndex = headers.findIndex(h => h.includes('orden') && !h.includes('categoria'));
  const categoriaOrdenIndex = headers.findIndex(h => h.includes('categoria orden') || h.includes('categoriaorden'));
  const masVendidoIndex = headers.findIndex(h => h.includes('mas vendido') || h.includes('masvendido'));
  const mejorPrecioIndex = headers.findIndex(h => h.includes('mejor precio') || h.includes('mejorprecio'));

  if (nombreIndex === -1 || categoriaIndex === -1 || precioIndex === -1) {
    throw new Error('Required columns (Nombre, Categoria, Precio) not found in CSV');
  }

  const menuItems: MenuItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(cell => cell.trim().replace(/"/g, ''));
    
    if (row.length >= 3) {
      const titulo = row[nombreIndex];
      const categoria = row[categoriaIndex];
      const precioStr = row[precioIndex];
      
      // Convertir precio a número, removiendo símbolos de moneda si existen
      const precio = parseFloat(precioStr.replace(/[^0-9.-]/g, ''));
      
      if (titulo && categoria && !isNaN(precio)) {
        const item: MenuItem = {
          titulo,
          categoria,
          precio
        };

        // Agregar orden si existe
        if (ordenIndex !== -1 && row[ordenIndex]) {
          const orden = parseInt(row[ordenIndex]);
          if (!isNaN(orden)) {
            item.orden = orden;
          }
        }

        // Agregar categoriaOrden si existe
        if (categoriaOrdenIndex !== -1 && row[categoriaOrdenIndex]) {
          const categoriaOrden = parseInt(row[categoriaOrdenIndex]);
          if (!isNaN(categoriaOrden)) {
            item.categoriaOrden = categoriaOrden;
          }
        }

        // Agregar "Más Vendido" si existe y tiene algún valor
        if (masVendidoIndex !== -1 && row[masVendidoIndex] && row[masVendidoIndex].trim() !== '') {
          item.masVendido = true;
        }

        // Agregar "Mejor Precio" si existe y tiene algún valor
        if (mejorPrecioIndex !== -1 && row[mejorPrecioIndex] && row[mejorPrecioIndex].trim() !== '') {
          item.mejorPrecio = true;
        }

        menuItems.push(item);
      }
    }
  }

  return menuItems;
}

function groupByCategory(menuItems: MenuItem[]): MenuCategory[] {
  const categoryMap = new Map<string, MenuItem[]>();

  menuItems.forEach(item => {
    if (!categoryMap.has(item.categoria)) {
      categoryMap.set(item.categoria, []);
    }
    categoryMap.get(item.categoria)!.push(item);
  });

  // Convertir a array y ordenar categorías
  const categories: MenuCategory[] = Array.from(categoryMap.entries())
    .map(([name, items]) => ({
      name,
      // Ordenar items: primero por orden (si existe), luego alfabéticamente
      items: items.sort((a, b) => {
        // Si ambos tienen orden, ordenar por orden
        if (a.orden !== undefined && b.orden !== undefined) {
          return a.orden - b.orden;
        }
        // Si solo uno tiene orden, ese va primero
        if (a.orden !== undefined) return -1;
        if (b.orden !== undefined) return 1;
        // Si ninguno tiene orden, ordenar alfabéticamente
        return a.titulo.localeCompare(b.titulo);
      })
    }))
    // Ordenar categorías: primero por categoriaOrden, luego alfabéticamente
    .sort((a, b) => {
      // Obtener el categoriaOrden del primer item de cada categoría (asumiendo que todos los items de una categoría tienen el mismo categoriaOrden)
      const aCategoriaOrden = a.items.find(item => item.categoriaOrden !== undefined)?.categoriaOrden;
      const bCategoriaOrden = b.items.find(item => item.categoriaOrden !== undefined)?.categoriaOrden;
      
      // Si ambas categorías tienen categoriaOrden, ordenar por ese valor
      if (aCategoriaOrden !== undefined && bCategoriaOrden !== undefined) {
        return aCategoriaOrden - bCategoriaOrden;
      }
      // Si solo una tiene categoriaOrden, esa va primero
      if (aCategoriaOrden !== undefined) return -1;
      if (bCategoriaOrden !== undefined) return 1;
      // Si ninguna tiene categoriaOrden, ordenar alfabéticamente
      return a.name.localeCompare(b.name);
    });

  return categories;
}

function getExampleMenuData(): MenuCategory[] {
  return [
    {
      name: "Entradas",
      items: [
        { titulo: "Bruschetta", categoria: "Entradas", precio: 8.50, orden: 1, categoriaOrden: 1, masVendido: true },
        { titulo: "Tabla de Quesos", categoria: "Entradas", precio: 12.00, orden: 2, categoriaOrden: 1, mejorPrecio: true }
      ]
    },
    {
      name: "Platos Principales",
      items: [
        { titulo: "Pasta Carbonara", categoria: "Platos Principales", precio: 15.50, orden: 1, categoriaOrden: 2, masVendido: true },
        { titulo: "Salmón Grillado", categoria: "Platos Principales", precio: 22.00, orden: 2, categoriaOrden: 2 }
      ]
    },
    {
      name: "Postres",
      items: [
        { titulo: "Tiramisu", categoria: "Postres", precio: 7.50, orden: 1, categoriaOrden: 3 },
        { titulo: "Cheesecake", categoria: "Postres", precio: 6.50, orden: 2, categoriaOrden: 3, mejorPrecio: true }
      ]
    }
  ];
}
