export interface City {
  id: string;
  city: string;
  months: Month[];
}

export interface Month {
  name: string;
  co: number;
  co2: number;
  methane: number;
  propane: number;
  butane: number;
}
