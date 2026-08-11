import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegramPlane, FaDiscord, FaVk, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/50 bg-card py-12 mt-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-muted-foreground text-sm">
          {t('footer.copyright')}
        </p>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="text-sm mr-2">{t('footer.socials')}</span>
          <a href="#" className="hover:text-accent transition-colors"><FaGithub size={18} /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaTelegramPlane size={18} /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaDiscord size={18} /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaVk size={18} /></a>
          <a href="#" className="hover:text-accent transition-colors"><FaEnvelope size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
