import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTelegramPlane, FaDiscord, FaVk, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleTelegramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('@Golub4ikOfficial');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: FaGithub, href: 'https://github.com/Golub4ik-Official', label: 'GitHub' },
    { icon: FaTelegramPlane, href: '#', label: 'Telegram', onClick: handleTelegramClick },
    { icon: FaDiscord, href: 'https://discord.gg/hFHKKyyDvd', label: 'Discord Server' },
    { icon: FaVk, href: 'https://vk.ru/golub4ik_official', label: 'VK' },
    { icon: FaEnvelope, href: 'mailto:KirillGolubenkoG@yandex.ru', label: 'Email' },
  ];

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-xl md:text-2xl text-accent font-medium mb-4">
              {t('hero.greeting')}
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {t('hero.name')}
            </h1>
            <h3 className="text-2xl md:text-3xl text-muted-foreground font-semibold mb-6">
              {t('hero.nickname')} | {t('hero.role')}
            </h3>
            <p className="text-lg text-muted-foreground/80 mb-6 max-w-2xl mx-auto md:mx-0">
              {t('hero.description')}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              <a 
                href="https://kiber1.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-full border border-accent/30 hover:border-accent transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium">{t('hero.kiber_resident')}</span>
              </a>
              <p className="text-xs text-muted-foreground text-center md:text-left max-w-sm">
                {t('hero.kiber_awards')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 relative">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  onClick={social.onClick}
                  target={social.href !== '#' && !social.href.startsWith('mailto') ? "_blank" : undefined}
                  rel={social.href !== '#' && !social.href.startsWith('mailto') ? "noopener noreferrer" : undefined}
                  className="glass p-4 rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute -top-12 left-1/2 md:left-24 -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-10"
                  >
                    {t('hero.telegram_copied')}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex justify-center md:justify-end relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-accent/40 animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Photo placeholder or actual photo */}
              <div className="absolute inset-8 rounded-full flex items-center justify-center overflow-hidden bg-accent/5">
                <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Kirill Golubenko" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
