import { DisasterParams, ImpactAssessment } from '../types/types2';

// Simplified impact calculation logic
export const calculateImpact = (params: DisasterParams): ImpactAssessment => {
  const { type, intensity, location } = params;
  
  // Base multipliers for different disaster types
  const typeMultipliers = {
    hurricane: 1.2,
    earthquake: 1.5,
    flood: 1.0,
    wildfire: 1.3
  };

  const multiplier = typeMultipliers[type];
  
  // Economic loss calculation (in millions)
  const economicLoss = Math.round(
    location.population * 
    location.infrastructureDensity * 
    intensity * 
    multiplier * 
    (location.averagePropertyValue / 100000)
  );

  // Rebuilding time calculation (in months)
  // Factors considered:
  // - Base time (3-24 months depending on intensity)
  // - Infrastructure density impact
  // - Population size impact
  // - Disaster type specific challenges
  const baseTime = 3 + ((intensity - 1) * 2.33); // 3-24 months based on intensity
  const infrastructureComplexity = Math.sqrt(location.infrastructureDensity); // More infrastructure = more complex rebuilding
  const populationScale = Math.log10(location.population / 10000 + 1); // Logarithmic scaling for population impact
  
  const rebuildingTime = Math.round(
    baseTime * 
    multiplier * // Disaster type impact
    infrastructureComplexity * // Infrastructure complexity
    (1 + (populationScale * 0.2)) // Population scale with dampening
  );

  // Infrastructure impact (0-100)
  const infrastructureImpact = Math.min(
    100,
    Math.round(
      (intensity * multiplier * location.infrastructureDensity) * 10
    )
  );

  // Casualty risk calculation (0-100)
  // Factors considered:
  // - Population density (higher density = higher risk)
  // - Infrastructure quality (better infrastructure = lower risk)
  // - Disaster intensity
  // - Disaster type multiplier
  const populationDensityFactor = Math.min(1, location.population / 1000000); // Normalized for cities up to 1M
  const infrastructureProtectionFactor = 1 - (location.infrastructureDensity * 0.7); // Better infrastructure reduces risk
  const baseCasualtyRisk = (intensity / 10) * // Base risk from intensity (0-1)
    multiplier * // Disaster type impact
    populationDensityFactor * // Population density impact
    infrastructureProtectionFactor * // Infrastructure protection
    100; // Convert to percentage

  const casualtyRisk = Math.min(100, Math.max(0, Math.round(baseCasualtyRisk)));

  return {
    economicLoss,
    rebuildingTime,
    infrastructureImpact,
    casualtyRisk
  };
};