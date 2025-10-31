export default function MenuLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <p className="text-gray-600 text-lg">Cargando menú...</p>
    </div>
  );
}