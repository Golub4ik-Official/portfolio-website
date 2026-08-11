import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Music() {
  const { t } = useTranslation();

  return (
    <section id="music" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t('music.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative group"
        >
          {/* Animated glow effect behind the player */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />
          
          <div className="relative glass p-4 md:p-6 rounded-[2rem] border border-accent/20 shadow-2xl overflow-hidden bg-background/60 backdrop-blur-xl">
            <iframe 
              frameBorder="0" 
              allow="clipboard-write"
              style={{ border: 'none', width: '100%', height: '556px', borderRadius: '1rem', background: 'transparent' }} 
              width="100%" 
              height="556" 
              src="https://music.yandex.ru/iframe/playlist/KirillGolubenkoG/3"
              title="Yandex Music Playlist"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
