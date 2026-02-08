export type AssetType = "image" | "audio" | "json";

export interface AssetEntry {
  id: string;
  type: AssetType;
  src: string;
}

export interface AssetManifest {
  assets: AssetEntry[];
}
