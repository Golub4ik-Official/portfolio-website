import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentPage?: 'home' | 'minecraft' | 'election';
  onNavigate?: (page: 'home' | 'minecraft' | 'election') => void;
}

export default function Header({ currentPage = 'home', onNavigate }: HeaderProps) {
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (currentPage !== 'home') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('home');
      }
      setTimeout(() => {
        const id = href.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a 
          href="#about" 
          onClick={(e) => {
            if (currentPage !== 'home') {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
            }
          }}
          className="text-xl font-bold text-accent hover:opacity-80 transition-opacity"
        >
          Portfolio
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.key} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}

          <button
            onClick={() => onNavigate?.(currentPage === 'minecraft' ? 'home' : 'minecraft')}
            className={`px-3 py-1 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'minecraft'
                ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                : 'border-accent/40 text-accent hover:bg-accent/10 hover:border-accent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('nav.minecraft')}</span>
          </button>

          <button
            onClick={() => onNavigate?.(currentPage === 'election' ? 'home' : 'election')}
            className={`px-3 py-1 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'election'
                ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                : 'border-amber-400/40 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400'
            }`}
          >
            <span className="text-sm">👑</span>
            <span>Выборы</span>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {currentPage !== 'home' ? (
            <button
              onClick={() => onNavigate?.('home')}
              className="md:hidden px-2.5 py-1 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer bg-accent text-white border-accent"
            >
              {t('nav.back_home')}
            </button>
          ) : (
            <>
              <button
                onClick={() => onNavigate?.('minecraft')}
                className="md:hidden px-2.5 py-1 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer border-accent/40 text-accent"
              >
                {t('nav.minecraft')}
              </button>
              <button
                onClick={() => onNavigate?.('election')}
                className="md:hidden px-2.5 py-1 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer border-amber-400/40 text-amber-400"
              >
                👑
              </button>
            </>
          )}

          <button 
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            {i18n.language === 'en' ? 'RU' : 'EN'}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
