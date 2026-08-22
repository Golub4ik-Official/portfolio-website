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
          <a href="https://discord.gg/hFHKKyyDvd" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Discord"><FaDiscord size={18} /></a>
          <a href="https://t.me/Golub4ikOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Telegram"><FaTelegramPlane size={18} /></a>
          <a href="https://github.com/Golub4ik-Official" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="GitHub"><FaGithub size={18} /></a>
          <a href="https://vk.ru/golub4ik_official" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="VK"><FaVk size={18} /></a>
          <a href="mailto:KirillGolubenkoG@yandex.ru" className="hover:text-accent transition-colors" aria-label="Email"><FaEnvelope size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
