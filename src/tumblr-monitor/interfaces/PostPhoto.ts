interface PhotoData {
  width: number;
  height: number;
  url: string;
}

export interface PostPhoto {
  caption: string;
  original_size: PhotoData;
  alt_sizes: PhotoData[];
}
