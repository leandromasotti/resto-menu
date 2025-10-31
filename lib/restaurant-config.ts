export function getRestaurantName(): string {
  return process.env.RESTAURANT_NAME || 'Menu Digital';
}

export function getRestaurantSubtitle(): string {
  return process.env.RESTAURANT_SUBTITLE || 'Restaurante';
}

export function getInstagramUrl(): string {
  return process.env.INSTAGRAM_URL || '';
}

export function getFacebookUrl(): string {
  return process.env.FACEBOOK_URL || '';
}

export function getWhatsAppPhone(): string {
  return process.env.WHATSAPP_PHONE || '';
}

export function getWhatsAppContactMessage(): string {
  return process.env.WHATSAPP_CONTACT_MESSAGE || 'Hola, tengo la siguiente consulta:';
}

export function getDeveloperUrl(): string {
  return process.env.DEVELOPER_URL || 'https://4x.com.ar';
}

export function getRestaurantConfig() {
  return {
    name: getRestaurantName(),
    subtitle: getRestaurantSubtitle(),
    instagramUrl: getInstagramUrl(),
    facebookUrl: getFacebookUrl(),
    whatsappPhone: getWhatsAppPhone(),
    whatsappContactMessage: getWhatsAppContactMessage(),
    developerUrl: getDeveloperUrl()
  };
}
