// Generated by https://quicktype.io

export interface TeamResponse {
  data: Team[];
}

export interface Team {
  id:           number;
  conference:   Conference;
  division:     string;
  city:         string;
  name:         string;
  full_name:    string;
  abbreviation: string;
}

export enum Conference {
  East = "East",
  Empty = "    ",
  West = "West",
}