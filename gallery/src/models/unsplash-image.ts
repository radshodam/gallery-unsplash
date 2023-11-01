export interface UnsplashImage {
  description: string;
  id: string;
  urls: {
    raw: string;
  };
  width: number;
  height: number;
  user: {
    username: string;
  };
}

export interface UnsplashSearchResponse {
  results: UnsplashImage[];
}
