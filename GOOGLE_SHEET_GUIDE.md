# 📋 Guía Completa: Configuración de la Aplicación

## 🔗 Cómo obtener el ID de tu Google Sheet

### Paso 1: URL del Google Sheet
Cuando abres tu Google Sheet, la URL se ve así:
```
https://docs.google.com/spreadsheets/d/1abcdefghijklmnopqrstuvwxyz0123456789/edit#gid=0
```

### Paso 2: Extraer el ID
El ID es la parte larga entre `/d/` y `/edit`:
```
1abcdefghijklmnopqrstuvwxyz0123456789
```

### Paso 3: Crear la URL de exportación CSV
Reemplaza `YOUR_SHEET_ID` con tu ID real:
```
https://docs.google.com/spreadsheets/d/1abcdefghijklmnopqrstuvwxyz0123456789/export?format=csv&gid=0
```

## ⚙️ Variables de Entorno

### Configuración del archivo `.env.local`

```env
# Google Sheets - URL de tu hoja pública
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=0

# Restaurante - Nombre que aparecerá en toda la app
RESTAURANT_NAME=Mi Restaurante Favorito
```

### ✨ Personalización del nombre

**Ejemplos de nombres:**
```env
RESTAURANT_NAME=Pizzería Don Luigi
RESTAURANT_NAME=Café Central
RESTAURANT_NAME=Restaurante El Buen Sabor
RESTAURANT_NAME=Bar & Grill The Corner
```

**¿Dónde aparece el nombre?**
- 🏠 **Título del navegador:** "Mi Restaurante - Menú Digital"
- 📱 **Header de la app:** Encabezado principal
- 🔍 **SEO:** Metadatos para búsquedas
- 📄 **Footer:** Aviso de precios

## 📊 Formato requerido del Google Sheet

Tu Google Sheet debe tener estas columnas (las últimas 3 son opcionales):

| Titulo | Categoria | Precio | Orden | Mas Vendido | Mejor Precio |
|--------|-----------|--------|-------|-------------|--------------|
| Bruschetta | Entradas | 8.50 | 1 | X | |
| Ensalada César | Entradas | 7.00 | 2 | | X |
| Pasta Carbonara | Platos Principales | 15.50 | 1 | X | |
| Salmón Grillado | Platos Principales | 22.00 | 2 | | |
| Tiramisu | Postres | 7.50 | 1 | | |
| Cheesecake | Postres | 6.50 | 2 | | X |

### 📝 Descripción de columnas:

**Columnas obligatorias:**
- **Titulo**: Nombre del plato
- **Categoria**: Categoría del menú (Entradas, Platos Principales, etc.)
- **Precio**: Precio numérico (sin símbolos de moneda)

**Columnas opcionales:**
- **Orden**: Número para ordenar los platos dentro de cada categoría (1, 2, 3, etc.)
- **Mas Vendido**: Poner "X" para mostrar badge de "⭐ Más Vendido" (rojo)
- **Mejor Precio**: Poner "X" para mostrar badge de "✅ Mejor Precio" (verde)

### 🎨 Resultado visual:

Los badges aparecerán así:
- **Más Vendido**: `⭐ Más Vendido` (badge rojo)
- **Mejor Precio**: `✅ Mejor Precio` (badge verde)

## ⚠️ Importante

**Columnas obligatorias:**
1. **Los nombres de las columnas deben ser exactos**: `Titulo`, `Categoria`, `Precio`
2. **Los precios deben ser números**: `15.50` ✅, `$15.50` ❌
3. **El sheet debe ser público**: Configurar como "Cualquier persona con el enlace puede ver"

**Columnas opcionales:**
4. **Orden**: Números enteros (1, 2, 3, etc.) para ordenar platos dentro de cada categoría
5. **Mas Vendido**: Solo poner "X" para activar el badge, dejar vacío para no mostrar
6. **Mejor Precio**: Solo poner "X" para activar el badge, dejar vacío para no mostrar

**Comportamiento del ordenamiento:**
- Los platos con **Orden** aparecen primero, ordenados numéricamente
- Los platos sin **Orden** aparecen después, ordenados alfabéticamente
- Las categorías siempre se ordenan alfabéticamente

## 🧪 Probar la configuración

1. Configura las variables en `.env.local`
2. Ejecuta `npm run dev`
3. Ve a `http://localhost:3000`
4. Deberías ver:
   - Tu nombre de restaurante en el header
   - Tu menú cargado automáticamente

## 📱 URL de ejemplo para testing

Puedes usar esta URL pública de ejemplo para probar:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv&gid=0
```

*Nota: Esta es una hoja de ejemplo de Google, reemplázala con la tuya propia cuando esté lista.*