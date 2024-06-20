export type Ranges = [number, number, number, number][];

export interface Background {
  tile: string;
  ranges: Ranges;
}

export type Level = {
  backgrounds: Background[];
};
