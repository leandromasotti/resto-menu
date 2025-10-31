export function getRestaurantName(): string {
  return process.env.RESTAURANT_NAME || 'Menu Digital';
}

export function getRestaurantSubtitle(): string {
  return process.env.RESTAURANT_SUBTITLE || 'Restaurante';
}

export function getRestaurantConfig() {
  return {
    name: getRestaurantName(),
    subtitle: getRestaurantSubtitle()
  };
}
