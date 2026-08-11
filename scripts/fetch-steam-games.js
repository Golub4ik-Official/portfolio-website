import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = '76561199124775261'; // User's SteamID64

if (!STEAM_API_KEY) {
  console.error("STEAM_API_KEY is not set. Skipping Steam data fetch.");
  process.exit(0); // Exit successfully so we don't break the build if key is missing locally
}

async function fetchSteamGames() {
  try {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Steam API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.response || !data.response.games) {
      throw new Error("Invalid response from Steam API");
    }

    // Sort by playtime (descending)
    const sortedGames = data.response.games.sort((a, b) => b.playtime_forever - a.playtime_forever);

    // Get top 10
    const topGames = sortedGames.slice(0, 10).map(game => ({
      name: game.name,
      hours: `${(game.playtime_forever / 60).toFixed(1)} hrs`,
      link: `https://store.steampowered.com/app/${game.appid}`,
      logo: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/capsule_184x69.jpg`
    }));

    const outputPath = path.join(__dirname, '..', 'public', 'steam-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(topGames, null, 2));
    
    console.log(`Successfully fetched and saved ${topGames.length} top games to steam-data.json`);
  } catch (error) {
    console.error("Failed to fetch steam games:", error);
    process.exit(1);
  }
}

fetchSteamGames();
