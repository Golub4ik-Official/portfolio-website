import fs from 'fs';
import path from 'path';
import https from 'https';

const games = [
  {
    name: 'ss14.jpg',
    url: 'https://cdn.akamai.steamstatic.com/steam/apps/1221060/header.jpg'
  },
  {
    name: 'ss13.png',
    url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Space_Station_13_logo.png'
  }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
          return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  const dir = path.join(process.cwd(), 'public', 'games');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const game of games) {
    const dest = path.join(dir, game.name);
    try {
      await download(game.url, dest);
      console.log(`Downloaded ${game.name}`);
    } catch (err) {
      console.error(`Error downloading ${game.name}:`, err.message);
    }
  }
}

run();
