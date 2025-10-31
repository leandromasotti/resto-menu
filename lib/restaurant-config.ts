export function getRestaurantName(): string {
  return process.env.RESTAURANT_NAME || 'Menu Digital';
}

export function getRestaurantConfig() {
  return {
    name: getRestaurantName(),
    subtitle: 'Restaurante'
  };
}