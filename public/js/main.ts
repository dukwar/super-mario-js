import {SpriteSheet} from './SpriteSheet';
import {loadImage, loadLevel} from './loaders';
import {Background, Level} from '@public/js/types';
import IMG from '@public/img/tiles.png';

const BLOCK_SIZE = 16;

function drawBackground(
  background: Background,
  context: CanvasRenderingContext2D,
  sprites: SpriteSheet,
) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

loadImage(IMG).then((image) => {
  const sprites = new SpriteSheet(image as HTMLImageElement, BLOCK_SIZE, BLOCK_SIZE);
  sprites.define('ground', 0, 0);
  sprites.define('sky', 3, 23);

  loadLevel('1-1').then((level: Level) => {
    level.backgrounds.forEach((background) => {
      context && drawBackground(background, context, sprites);
    });
  });
});

console.log(IMG);
