import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Monitor, Cpu, Mouse, Loader2, Gamepad2, Clock, Star } from 'lucide-react';

interface SteamGame {
  name: string;
  hours: string;
  link: string;
  logo: string;
}

export default function Gaming() {
  const { t } = useTranslation();
  const [recentGames, setRecentGames] = useState<SteamGame[]>([]);
  const [mostPlayedGames, setMostPlayedGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites' | 'most_played'>('recent');

  useEffect(() => {
    const fetchSteamGames = async () => {
      try {
        const steamUrl = 'https://steamcommunity.com/id/golub4ikofficial/?xml=1';
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(steamUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        
        const gamesList = Array.from(xmlDoc.querySelectorAll('mostPlayedGame')).map(game => ({
          name: game.querySelector('gameName')?.textContent || 'Unknown',
          hours: `${game.querySelector('hoursOnRecord')?.textContent || '0'} hrs`,
          link: game.querySelector('gameLink')?.textContent || '#',
          logo: game.querySelector('gameLogoSmall')?.textContent || ''
        }));
        
        setRecentGames(gamesList);
      } catch (error) {
        console.error("Failed to fetch recent steam games", error);
      }

      // Fetch most played games from generated static JSON
      try {
        const localResponse = await fetch('/steam-data.json');
        if (localResponse.ok) {
          const localData = await localResponse.json();
          setMostPlayedGames(localData);
        }
      } catch (err) {
        console.error("Failed to load local steam data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamGames();
  }, []);

  const favoriteGames = [
    {
      name: 'Minecraft',
      logo: `${import.meta.env.BASE_URL}games/minecraft.webp`,
      link: 'https://www.minecraft.net/',
      desc: 'Sandbox / Survival'
    },
    {
      name: 'Space Station 13',
      logo: `${import.meta.env.BASE_URL}games/ss13.png`,
      link: 'https://spacestation13.com/',
      desc: 'Roleplay / Simulation'
    },
    {
      name: 'Space Station 14',
      logo: `${import.meta.env.BASE_URL}games/ss14.png`,
      link: 'https://spacestation14.io/',
      desc: 'Multiplayer / Sandbox'
    },
    {
      name: 'Arma 3',
      logo: `${import.meta.env.BASE_URL}games/arma3.jpg`,
      link: 'https://arma3.com/',
      desc: 'Military Simulation'
    }
  ];

  // Placeholders shown if steam-data.json fails or hasn't been generated yet
  const fallbackMostPlayed = [
    { name: 'Update via GitHub Action', hours: '... hrs', logo: '', link: 'https://github.com/Golub4ik-Official/portfolio-website/actions' }
  ];

  const displayMostPlayed = mostPlayedGames.length > 0 ? mostPlayedGames : fallbackMostPlayed;

  const setupSpecs = [
    { icon: Monitor, label: 'Monitor', value: 'Laptop Screen' },
    { icon: Cpu, label: 'Processor', value: 'Intel Core i5-9300H @ 2.40GHz' },
    { icon: Trophy, label: 'Graphics', value: 'NVIDIA GeForce GTX 1660 Ti' },
    { icon: Mouse, label: 'Peripherals', value: 'Defender Sinister & ГАРНИЗОН' }
  ];

  return (
    <section id="gaming" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t('gaming.title')}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Games Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => setActiveTab('recent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'recent' ? 'bg-accent text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                <Gamepad2 size={16} /> {t('gaming.tabs.recent')}
              </button>
              <button 
                onClick={() => setActiveTab('most_played')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'most_played' ? 'bg-accent text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                <Clock size={16} /> {t('gaming.tabs.most_played')}
              </button>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'bg-accent text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                <Star size={16} /> {t('gaming.tabs.favorites')}
              </button>
            </div>
            
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'recent' && (
                  <motion.div 
                    key="recent"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="grid gap-4"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center py-12 text-muted-foreground">
                        <Loader2 className="animate-spin mr-2" /> {t('gaming.loading')}
                      </div>
                    ) : recentGames.length > 0 ? (
                      recentGames.map((game, index) => (
                        <a key={index} href={game.link} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl border border-border/50 flex justify-between items-center hover:border-accent/50 transition-colors group">
                          <div className="flex items-center gap-4">
                            {game.logo && <img src={game.logo} alt={game.name} className="h-10 rounded shadow-md opacity-90 group-hover:opacity-100 transition-opacity" />}
                            <div>
                              <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{game.name}</h4>
                              <p className="text-sm text-muted-foreground">Steam</p>
                            </div>
                          </div>
                          <span className="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap">
                            {game.hours}
                          </span>
                        </a>
                      ))
                    ) : (
                      <div className="text-muted-foreground py-4 text-center">Нет недавней активности</div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'most_played' && (
                  <motion.div 
                    key="most_played"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="grid gap-4"
                  >
                    {displayMostPlayed.map((game, index) => (
                      <a key={index} href={game.link} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-xl border border-border/50 flex justify-between items-center hover:border-accent/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          {game.logo && <img src={game.logo} alt={game.name} className="h-10 rounded shadow-md opacity-90 group-hover:opacity-100 transition-opacity" />}
                          <div>
                            <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{game.name}</h4>
                            <p className="text-sm text-muted-foreground">Steam</p>
                          </div>
                        </div>
                        <span className="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {game.hours}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'favorites' && (
                  <motion.div 
                    key="favorites"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {favoriteGames.map((game, index) => (
                      <a key={index} href={game.link} target="_blank" rel="noopener noreferrer" className="glass flex flex-col rounded-xl border border-border/50 overflow-hidden hover:border-accent/50 transition-colors group">
                        <div className="h-24 overflow-hidden relative">
                          <img src={game.logo} alt={game.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        </div>
                        <div className="p-4 relative -mt-6">
                          <h4 className="font-bold text-base group-hover:text-accent transition-colors drop-shadow-md">{game.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{game.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Setup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Monitor className="text-accent" /> {t('gaming.setup')}
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {setupSpecs.map((item, index) => (
                <div key={index} className="glass p-6 rounded-xl border border-border/50 text-center hover:border-accent/50 transition-colors">
                  <item.icon className="mx-auto mb-4 text-accent" size={32} />
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
