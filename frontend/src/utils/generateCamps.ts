import { ReliefCamp } from '../types/types';

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateNearbyCamps(
  userLat: number,
  userLng: number,
  count: number = 5,
  radiusKm: number = 5
): ReliefCamp[] {
  // 1 degree is approximately 111km at the equator
  const degreesPerKm = 1 / 111;
  const radiusDegrees = radiusKm * degreesPerKm;

  // Define latitude and longitude variables that can be adjusted
  const latitudeFactor = 1.0; // Multiplier for latitude calculations
  const longitudeFactor = 1.0; // Multiplier for longitude calculations

  return Array.from({ length: count }, (_, i) => {
    const angle = (i * 2 * Math.PI) / count; // Distribute camps in a circle
    const distance = randomInRange(0, radiusDegrees);
    
    const lat = userLat + (distance * Math.cos(angle) * latitudeFactor);
    const lng = userLng + (distance * Math.sin(angle) * longitudeFactor);

    const campNames = [
      "Emergency Shelter",
      "Community Relief Center",
      "Safe Haven Camp",
      "Aid Station",
      "Rescue Point",
      "Relief Hub",
      "Crisis Center",
      "Support Station"
    ];

    return {
      id: i + 1,
      name: `${campNames[i % campNames.length]} ${String.fromCharCode(65 + i)}`,
      location: { lat, lng },
      capacity: Math.floor(randomInRange(100, 1000)),
      contact: `+880 ${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
  });
}