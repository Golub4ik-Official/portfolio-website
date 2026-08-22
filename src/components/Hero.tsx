import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTelegramPlane, FaDiscord, FaVk, FaEnvelope } from 'react-icons/fa';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const useKonamiCode = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[count]) {
        if (count === KONAMI_CODE.length - 1) {
          document.documentElement.classList.toggle('retro-theme');
          setCount(0);
        } else {
          setCount(count + 1);
        }
      } else {
        setCount(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [count]);
};

interface HeroProps {
  onOpenMinecraft?: () => void;
}

export default function Hero({ onOpenMinecraft }: HeroProps) {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  useKonamiCode();

  const handleCopy = (e: React.MouseEvent, text: string, messageKey: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedText(messageKey);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const socials = [
    { icon: FaGithub, href: 'https://github.com/Golub4ik-Official', label: 'GitHub' },
    { icon: FaTelegramPlane, href: '#', label: 'Telegram', onClick: (e: React.MouseEvent) => handleCopy(e, '@Golub4ikOfficial', 'hero.copied_telegram') },
    { icon: FaDiscord, href: 'https://discord.gg/hFHKKyyDvd', label: 'Discord Server' },
    { icon: FaVk, href: 'https://vk.ru/golub4ik_official', label: 'VK' },
    { icon: FaEnvelope, href: '#', label: 'Email', onClick: (e: React.MouseEvent) => handleCopy(e, 'KirillGolubenkoG@yandex.ru', 'hero.copied_email') },
  ];

  return (
    <section id="about" className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen flex items-center relative overflow-hidden">
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

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
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

            {/* Currently Doing Block - Clickable */}
            <div 
              onClick={() => onOpenMinecraft?.()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenMinecraft?.(); }}
              className="glass p-4 rounded-xl border border-accent/30 mb-8 inline-block text-left relative overflow-hidden group cursor-pointer hover:border-accent hover:shadow-lg hover:shadow-accent/15 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/15 transition-colors" />
              <div className="relative flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-sm font-bold text-foreground">{t('hero.currently_learning')}</span>
              </div>
              <p className="text-sm text-muted-foreground relative z-10 mb-2">{t('hero.current_activity')}</p>
              <div className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t('hero.view_minecraft')}</span>
              </div>
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
                {copiedText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute -top-12 left-1/2 md:left-24 -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-10"
                  >
                    {t(copiedText)}
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
              <div 
                className="absolute inset-8 rounded-full flex items-center justify-center overflow-hidden bg-accent/5 transition-transform duration-500 hover:scale-105"
                title="↑ ↑ ↓ ↓ ← → ← → B A"
              >
                <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Kirill Golubenko" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
