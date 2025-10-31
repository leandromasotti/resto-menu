# Menu Digital 🍽️

Una aplicación web responsive para mostrar el menú de un restaurante, conectada a Google Sheets para actualizaciones en tiempo real sin necesidad de redeploy.

## 🚀 Características

- **Actualización automática**: Se conecta a Google Sheets para cargar datos dinámicamente
- **ISR (Incremental Static Regeneration)**: Los datos se revalidan cada 5 minutos automáticamente
- **Diseño responsive**: Optimizado para dispositivos móviles (ideal para códigos QR)
- **Estilo minimalista**: Diseño limpio tipo carta clásica
- **Agrupación por categorías**: Los platos se organizan automáticamente por categoría
- **Ordenamiento inteligente**: Orden personalizable + alfabético automático
- **Badges destacados**: Iconos para "Más Vendido" y "Mejor Precio"
- **Configuración flexible**: Nombre del restaurante via variables de entorno

## 📋 Configuración del Google Sheet

### 1. Crear el Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Configura las columnas exactamente así:

| Titulo | Categoria | Precio | Categoria Orden | Orden | Mas Vendido | Mejor Precio |
|--------|-----------|--------|-----------------|-------|-------------|--------------|
| Bruschetta | Entradas | 8.50 | 1 | 1 | X | |
| Ensalada César | Entradas | 7.00 | 1 | 2 | | X |
| Pasta Carbonara | Platos Principales | 15.50 | 2 | 1 | X | |
| Salmón Grillado | Platos Principales | 22.00 | 2 | 2 | | |
| Tiramisu | Postres | 7.50 | 3 | 1 | | |
| Cheesecake | Postres | 6.50 | 3 | 2 | | X |

**Columnas obligatorias:** `Titulo`, `Categoria`, `Precio`
**Columnas opcionales:** `Categoria Orden` (números), `Orden` (números), `Mas Vendido` (X), `Mejor Precio` (X)

### 📊 Sistema de Ordenamiento

El menú utiliza un sistema de ordenamiento inteligente de dos niveles:

#### 1. Orden de Categorías (`Categoria Orden`)
- **Propósito**: Controla en qué orden aparecen las categorías en el menú
- **Formato**: Números enteros (1, 2, 3, etc.)
- **Funcionamiento**: 
  - Categorías con `Categoria Orden` menor aparecen primero
  - Categorías sin `Categoria Orden` aparecen al final en orden alfabético
  - Todos los items de una categoría deben tener el mismo `Categoria Orden`

#### 2. Orden de Items (`Orden`)
- **Propósito**: Controla el orden de los platos dentro de cada categoría
- **Formato**: Números enteros (1, 2, 3, etc.)
- **Funcionamiento**:
  - Items con `Orden` menor aparecen primero dentro de su categoría
  - Items sin `Orden` aparecen al final en orden alfabético

**Ejemplo de ordenamiento:**
```
📍 Entradas (Categoria Orden: 1)
  - Bruschetta (Orden: 1)
  - Ensalada César (Orden: 2)

📍 Platos Principales (Categoria Orden: 2)  
  - Pasta Carbonara (Orden: 1)
  - Salmón Grillado (Orden: 2)

📍 Postres (Categoria Orden: 3)
  - Tiramisu (Orden: 1)
  - Cheesecake (Orden: 2)
```

### 2. Hacer el Sheet público

1. Haz clic en **"Compartir"** (botón azul en la esquina superior derecha)
2. Cambia a **"Cualquier persona con el enlace"**
3. Asegúrate de que el permiso sea **"Visualizador"**
4. Copia el enlace del sheet

### 3. Obtener la URL de exportación CSV

Transforma la URL de tu sheet:

**De:** `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0`

**A:** `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0`

## ⚙️ Configuración del Proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```

2. Edita `.env.local` y configura las variables:
```env
# URL de tu Google Sheet (reemplaza YOUR_SHEET_ID con tu ID real)
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0

# Nombre de tu restaurante (aparecerá en toda la aplicación)
RESTAURANT_NAME=Mi Restaurante

# Subtítulo/descripción del restaurante (aparece debajo del nombre)
RESTAURANT_SUBTITLE=Cocina Mediterránea
```

**Variables disponibles:**
- `GOOGLE_SHEET_URL`: URL pública de tu Google Sheet en formato CSV
- `RESTAURANT_NAME`: Nombre de tu restaurante (reemplaza "Menu Digital")
- `RESTAURANT_SUBTITLE`: Subtítulo o descripción del restaurante (reemplaza "Restaurante")

### 3. Agregar tu logo

1. Guarda tu logo como `logo.jpeg` en la carpeta `/public/`
2. El logo aparecerá como **fondo elegante de toda la página**:
   - Logo centrado con opacidad sutil que no interfiere con la lectura
   - Efecto fijo que se mantiene mientras se hace scroll
   - Tamaño responsive que se adapta a diferentes pantallas
3. El sistema está optimizado para diferentes tamaños de pantalla
4. El logo se muestra con overlay semitransparente para mantener la legibilidad

**Recomendaciones para el logo:**
- Formato: JPEG de buena calidad
- Tamaño recomendado: Mínimo 400x400px (ideal 800x800px)
- Preferible con fondo transparente o colores suaves
- El logo debe tener buen contraste para verse bien como fondo sutil
- Evitar logos muy detallados, funcionan mejor diseños simples e icónicos

### 4. Personalizar el nombre y subtítulo del restaurante

El nombre y subtítulo del restaurante se configuran automáticamente desde las variables de entorno `RESTAURANT_NAME` y `RESTAURANT_SUBTITLE`. 

**Para cambiar el nombre y subtítulo:**
1. Edita el archivo `.env.local`
2. Cambia los valores según tu restaurante:
```env
RESTAURANT_NAME=Pizzería Don Luigi
RESTAURANT_SUBTITLE=Auténtica Cocina Italiana
```
3. Los valores aparecerán automáticamente en:
   - Título de la página web
   - Header principal (nombre y subtítulo)
   - Footer
   - Metadatos SEO

**Ejemplos de subtítulos:**
- `Cocina Mediterránea`
- `Especialidades Argentinas`
- `Bar & Restaurant`
- `Comida Casera`
- `Parrilla y Mariscos`

**Nota:** No necesitas editar código, solo las variables de entorno.

## 🔧 Desarrollo Local

```bash
# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🚀 Deploy en Vercel

### 1. Preparar el proyecto

1. Sube tu código a GitHub
2. Asegúrate de que tengas tu `logo.jpeg` en `/public/`

### 2. Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. En la configuración de **Environment Variables**, agrega:
   - **Nombre**: `GOOGLE_SHEET_URL`
   - **Valor**: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0`
   - **Nombre**: `RESTAURANT_NAME`
   - **Valor**: `Tu Nombre de Restaurante`
   - **Nombre**: `RESTAURANT_SUBTITLE`
   - **Valor**: `Tu Descripción del Restaurante`

### 3. Deploy

1. Haz clic en **"Deploy"**
2. Vercel generará una URL pública (ej: `https://tu-menu.vercel.app`)

## 📱 Generar Código QR

Una vez deployado:

1. Usa cualquier generador de QR online (ej: [qr-code-generator.com](https://www.qr-code-generator.com/))
2. Pega la URL de tu aplicación deployada
3. Descarga el QR e imprímelo para tus mesas

## 🔄 Actualizar el Menú

Para actualizar el menú:

1. Edita tu Google Sheet directamente
2. Guarda los cambios
3. La aplicación se actualizará automáticamente en máximo 5 minutos
4. **No necesitas hacer redeploy**

## 📁 Estructura del Proyecto

```
/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal y metadatos
│   └── page.tsx         # Página principal del menú
├── components/
│   ├── MenuCategoryComponent.tsx  # Componente para categorías
│   ├── MenuItemComponent.tsx      # Componente para items
│   └── MenuLoader.tsx             # Componente de carga
├── lib/
│   └── menu-data.ts     # Lógica para obtener datos del Sheet
├── types/
│   └── menu.ts          # Tipos TypeScript
├── public/
│   └── logo.jpeg        # Tu logo (agrega este archivo)
├── .env.local           # Variables de entorno (no subir a git)
├── .env.example         # Ejemplo de variables de entorno
└── README.md            # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **ISR (Incremental Static Regeneration)**
- **Google Sheets API** (CSV export)

## 🐛 Solución de Problemas

### El menú no carga

1. Verifica que tu Google Sheet sea público
2. Confirma que la URL en `.env.local` sea correcta
3. Revisa que las columnas se llamen exactamente: `Titulo`, `Categoria`, `Precio`

### Los precios no se muestran bien

- Asegúrate de que los precios estén en formato numérico (ej: `15.50`, no `$15.50`)

### El logo no aparece

- Verifica que el archivo se llame exactamente `logo.jpeg` y esté en `/public/`

## 📞 Soporte

Si tienes problemas o preguntas, revisa:

1. Los logs de Vercel (si está deployado)
2. La consola del navegador para errores
3. Que tu Google Sheet tenga los datos correctos

---

¡Tu menú digital está listo! 🎉
