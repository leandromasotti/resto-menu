import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showShadow?: boolean;
}

export default function Logo({ 
  size = 'medium', 
  className = '', 
  showShadow = true 
}: LogoProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24 md:w-32 md:h-32',
    large: 'w-32 h-32 md:w-40 md:h-40'
  };

  const baseClasses = `relative ${sizeClasses[size]} logo-container`;
  const shadowClass = showShadow ? 'logo-shadow' : '';
  const finalClasses = `${baseClasses} ${shadowClass} ${className}`.trim();

  return (
    <div className={finalClasses}>
      <Image
        src="/logo.jpeg"
        alt="Logo del Restaurante"
        fill
        className="object-contain rounded-lg"
        priority={size === 'medium' || size === 'large'}
      />
    </div>
  );
}