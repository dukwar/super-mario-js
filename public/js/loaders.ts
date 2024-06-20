export function loadImage(url: string) {
  return new Promise((resolve) => {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export async function loadLevel(name: string) {
  return fetch(`/levels/${name}.json`).then((r) => r.json());
}
