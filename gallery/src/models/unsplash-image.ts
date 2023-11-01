export interface UnsplashImage {
  description: string;
  urls: {
    raw: string;
  };
  width: number;
  height: number;
  user: {
    username: string;
  };
}
