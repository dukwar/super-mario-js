export class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<string, CanvasImageSource>;

  constructor(image: HTMLImageElement, width: number, height: number) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name: string, x: number, y: number) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d')?.drawImage(
      this.image,
      x * this.width, // Вырезаем нужные нам части изображения (координата + ширина)
      y * this.height, // Вырезаем нужные нам части изображения (координата + высота)
      this.width, // Ширина
      this.height, // Высота
      0, // Координата по Х
      0, // Координата по Y
      this.width, // Ширина
      this.height, // Высота
    );
    this.tiles.set(name, buffer);
  }

  // Встраиваем в основной контекст наше изображение
  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name);
    buffer && context.drawImage(buffer, x, y);
  }

  // Рисуем плитку, сопоставляя координаты с размерами изображения
  drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
