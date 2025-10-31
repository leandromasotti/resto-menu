import { MenuItem } from '@/types/menu';
import MenuBadge from './MenuBadge';

interface MenuItemComponentProps {
  item: MenuItem;
}

export default function MenuItemComponent({ item }: MenuItemComponentProps) {
  const formattedPrice = item.precio.toFixed(0);

  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1 pr-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-900 font-medium leading-tight">
            {item.titulo}
          </h3>
          
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {item.masVendido && (
              <MenuBadge type="masVendido" />
            )}
            {item.mejorPrecio && (
              <MenuBadge type="mejorPrecio" />
            )}
          </div>
        </div>
      </div>
      
      <div className="text-gray-900 font-semibold whitespace-nowrap">
        ${formattedPrice}
      </div>
    </div>
  );

}
