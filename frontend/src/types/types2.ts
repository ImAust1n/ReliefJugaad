export type DisasterType = 'hurricane' | 'earthquake' | 'flood' | 'wildfire';

export interface Location {
  name: string;
  population: number;
  infrastructureDensity: number;
  averagePropertyValue: number;
}

export interface DisasterParams {
  type: DisasterType;
  intensity: number;
  location: Location;
}

export interface ImpactAssessment {
  economicLoss: number;
  rebuildingTime: number;
  infrastructureImpact: number;
  casualtyRisk: number;
}