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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-2 md:p-4 rounded-2xl border border-border/50 shadow-2xl"
        >
          <iframe 
            frameBorder="0" 
            allow="clipboard-write"
            style={{ border: 'none', width: '100%', height: '556px', borderRadius: '1rem', background: 'transparent' }} 
            width="100%" 
            height="556" 
            src="https://music.yandex.ru/iframe/playlist/KirillGolubenkoG/3"
            title="Yandex Music Playlist"
          />
        </motion.div>
      </div>
    </section>
  );
}
