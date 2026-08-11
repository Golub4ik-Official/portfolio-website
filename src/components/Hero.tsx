import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaTelegramPlane, FaDiscord, FaVk, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  const { t } = useTranslation();

  const socials = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaTelegramPlane, href: '#', label: 'Telegram' },
    { icon: FaDiscord, href: '#', label: 'Discord Server' },
    { icon: FaVk, href: '#', label: 'VK' },
    { icon: FaEnvelope, href: '#', label: 'Email' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">{t('hero.greeting')}</h2>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              {t('hero.role')}
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            {t('hero.bio')}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {socials.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-white transition-all transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20">
            <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted-foreground">
              [Photo Placeholder]
            </div>
          </div>
          <div className="absolute -inset-4 rounded-full border border-accent/10 animate-[spin_10s_linear_infinite]" />
          <div className="absolute -inset-8 rounded-full border border-accent/5 animate-[spin_15s_linear_infinite_reverse]" />
        </motion.div>
      </div>
    </section>
  );
}
