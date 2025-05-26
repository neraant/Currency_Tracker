export interface BankDetail {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  currencies: string[];
}

export interface MapConfig {
  style: string;
  center: [number, number];
  zoom: number;
}
