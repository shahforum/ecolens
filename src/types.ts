export enum WasteCategory {
  REDUCE = 'REDUCE',
  REUSE = 'REUSE',
  RECYCLE = 'RECYCLE'
}

export interface WasteAnalysis {
  itemName: string;
  material: string;
  confidence: number;
  instructions: {
    [WasteCategory.REDUCE]: string[];
    [WasteCategory.REUSE]: string[];
    [WasteCategory.RECYCLE]: string;
  };
  environmentalImpact: string;
}

export interface UserStats {
  itemsScanned: number;
  diversionRate: number; // percentage
  carbonSaved: number; // kg
}
