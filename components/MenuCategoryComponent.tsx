import { MenuCategory } from '@/types/menu';
import MenuItemComponent from './MenuItemComponent';

interface MenuCategoryComponentProps {
  category: MenuCategory;
}

export default function MenuCategoryComponent({ category }: MenuCategoryComponentProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
        {category.name}
      </h2>
      <div className="space-y-1">
        {category.items.map((item, index) => (
          <MenuItemComponent key={`${item.titulo}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}