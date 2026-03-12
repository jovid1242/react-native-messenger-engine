import { Image } from 'react-native';

export interface ImageDimensions {
  width: number;
  height: number;
}

const cache = new Map<string, ImageDimensions>();

/**
 * Возвращает ширину и высоту изображения по URI.
 * Результат кэшируется для повторных вызовов с тем же URI.
 */
export function getImageDimensions(uri: string): Promise<ImageDimensions> {
  const cached = cache.get(uri);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        const dimensions = { width, height };
        cache.set(uri, dimensions);
        resolve(dimensions);
      },
      reject
    );
  });
}
