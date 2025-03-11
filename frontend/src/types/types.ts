export interface ReliefCamp {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  contact: string;
}