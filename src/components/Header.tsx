import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'research', href: '#research' },
    { key: 'gaming', href: '#gaming' },
    { key: 'music', href: '#music' },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-accent">Portfolio</a>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a 
              key={item.key} 
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <button 
          onClick={toggleLanguage}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          {i18n.language === 'en' ? 'RU' : 'EN'}
        </button>
      </div>
    </motion.header>
  );
}
