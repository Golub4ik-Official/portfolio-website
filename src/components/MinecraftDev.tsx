import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Code2, 
  Cpu, 
  Layers, 
  Palette, 
  Zap, 
  Database, 
  ShieldCheck, 
  Box, 
  Gauge, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  Flame, 
  Activity,
  Terminal,
  Compass
} from 'lucide-react';
import { FaTelegramPlane, FaDiscord, FaVk, FaEnvelope } from 'react-icons/fa';

interface MinecraftDevProps {
  onNavigateHome: () => void;
}

export default function MinecraftDev({ onNavigateHome }: MinecraftDevProps) {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, messageKey: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedText(messageKey);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const stats = [
    {
      value: t('minecraft_page.stats.exp_val'),
      label: t('minecraft_page.stats.exp_lbl'),
      sub: t('minecraft_page.stats.exp_sub'),
      icon: <Flame className="text-accent" size={24} />,
      highlight: true
    },
    {
      value: t('minecraft_page.stats.projects_val'),
      label: t('minecraft_page.stats.projects_lbl'),
      sub: t('minecraft_page.stats.projects_sub'),
      icon: <Code2 className="text-accent" size={24} />
    },
    {
      value: t('minecraft_page.stats.tps_val'),
      label: t('minecraft_page.stats.tps_lbl'),
      sub: t('minecraft_page.stats.tps_sub'),
      icon: <Activity className="text-emerald-400" size={24} />
    },
    {
      value: t('minecraft_page.stats.versions_val'),
      label: t('minecraft_page.stats.versions_lbl'),
      sub: t('minecraft_page.stats.versions_sub'),
      icon: <Layers className="text-accent" size={24} />
    }
  ];

  const services = [
    {
      key: 'plugins',
      icon: <Cpu size={26} />,
      tags: ['Paper API', 'Folia (Multi-threaded)', 'Adventure API', 'Brigadier']
    },
    {
      key: 'gui',
      icon: <Palette size={26} />,
      tags: ['Negative Space Glyphs', 'Custom HUD', 'ItemsAdder', 'Oraxen']
    },
    {
      key: 'packets',
      icon: <Zap size={26} />,
      tags: ['PacketEvents', 'ProtocolLib', 'Fake Entities', 'Virtual Blocks']
    },
    {
      key: 'integrations',
      icon: <Database size={26} />,
      tags: ['LuckPerms API', 'Vault API', 'PlaceholderAPI', 'Redis & MySQL Sync']
    },
    {
      key: 'devops',
      icon: <Gauge size={26} />,
      tags: ['Spark Profiler', 'Timings', 'Pterodactyl', 'Linux Systemd']
    },
    {
      key: 'models',
      icon: <Box size={26} />,
      tags: ['Blockbench 3D', 'Aseprite Pixel-Art', 'Custom Armors', 'Cosmetics']
    }
  ];

  const techCategories = [
    {
      titleKey: 'minecraft_page.stack_categories.platforms',
      icon: <Server size={18} />,
      items: ['PaperMC', 'Purpur', 'Folia', 'Velocity', 'BungeeCord', 'Spigot', 'Fabric (Basics)']
    },
    {
      titleKey: 'minecraft_page.stack_categories.libraries',
      icon: <Terminal size={18} />,
      items: ['Adventure & MiniMessage', 'PacketEvents 2.x', 'ProtocolLib', 'Vault API', 'LuckPerms API', 'PlaceholderAPI', 'FastAsyncWorldEdit']
    },
    {
      titleKey: 'minecraft_page.stack_categories.storage',
      icon: <Database size={18} />,
      items: ['MySQL / MariaDB', 'PostgreSQL', 'Redis Pub/Sub', 'SQLite / H2', 'Docker', 'Linux (Ubuntu/Debian)']
    },
    {
      titleKey: 'minecraft_page.stack_categories.tools',
      icon: <Compass size={18} />,
      items: ['Java 17 / 21', 'Kotlin', 'Gradle & Maven', 'Spark Profiler', 'Blockbench', 'Aseprite', 'Git / GitHub']
    }
  ];

  const architectureItems = [
    {
      key: 'async',
      icon: <Zap className="text-accent" size={22} />
    },
    {
      key: 'clean',
      icon: <Layers className="text-accent" size={22} />
    },
    {
      key: 'reliability',
      icon: <ShieldCheck className="text-emerald-400" size={22} />
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Background decoration glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-accent/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Back navigation button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border hover:border-accent text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('minecraft_page.back_to_portfolio')}</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-accent/40 bg-accent/10 text-accent text-xs md:text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t('minecraft_page.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            {t('minecraft_page.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t('minecraft_page.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#contact-minecraft"
              className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/25 hover:scale-105 flex items-center gap-2"
            >
              <Send size={18} />
              <span>{t('minecraft_page.cta_btn')}</span>
            </a>
            <a
              href="https://t.me/Golub4ikOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl glass border border-border hover:border-accent font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-foreground"
            >
              <FaTelegramPlane size={18} className="text-accent" />
              <span>Telegram</span>
            </a>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`glass p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                stat.highlight 
                  ? 'border-accent/50 bg-accent/5 shadow-lg shadow-accent/10' 
                  : 'border-border/60 hover:border-accent/40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-xl bg-secondary/70 border border-border/40">
                  {stat.icon}
                </span>
                {stat.highlight && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                    EXPERIENCE
                  </span>
                )}
              </div>
              <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground/90 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Services / Capabilities */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t('minecraft_page.services_title')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('minecraft_page.services_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-2xl border border-border/50 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {t(`minecraft_page.services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t(`minecraft_page.services.${service.key}.desc`)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[11px] font-medium bg-secondary/80 text-secondary-foreground rounded-lg border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t('minecraft_page.stack_title')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('minecraft_page.stack_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techCategories.map((cat, cIdx) => (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: cIdx * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-2xl border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4 text-accent">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t(cat.titleKey)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-3 py-1.5 text-xs font-semibold bg-secondary/90 text-foreground rounded-lg border border-border/60 hover:border-accent/50 hover:bg-secondary transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture Principles */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t('minecraft_page.arch_title')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('minecraft_page.arch_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architectureItems.map((arch, aIdx) => (
              <motion.div
                key={arch.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: aIdx * 0.15, duration: 0.5 }}
                className="glass p-6 rounded-2xl border border-border/50 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-secondary/80 border border-border/40">
                    {arch.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {t(`minecraft_page.arch_items.${arch.key}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`minecraft_page.arch_items.${arch.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact / CTA Banner */}
        <motion.div
          id="contact-minecraft"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-3xl border border-accent/40 bg-accent/5 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

          <div className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent mb-4 border border-accent/20">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
            {t('minecraft_page.cta_title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            {t('minecraft_page.cta_subtitle')}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 relative">
            <a
              href="https://t.me/Golub4ikOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-accent/25"
            >
              <FaTelegramPlane size={18} />
              <span>Telegram</span>
            </a>

            <a
              href="https://discord.gg/hFHKKyyDvd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl glass border border-border hover:border-accent font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-foreground"
            >
              <FaDiscord size={18} className="text-[#5865F2]" />
              <span>Discord</span>
            </a>

            <a
              href="https://vk.ru/golub4ik_official"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl glass border border-border hover:border-accent font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-foreground"
            >
              <FaVk size={18} className="text-[#0077FF]" />
              <span>ВКонтакте</span>
            </a>

            <button
              onClick={(e) => handleCopy(e, 'KirillGolubenkoG@yandex.ru', 'hero.copied_email')}
              className="px-5 py-3 rounded-xl glass border border-border hover:border-accent font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-foreground cursor-pointer"
            >
              <FaEnvelope size={18} className="text-accent" />
              <span>Email</span>
            </button>

            <AnimatePresence>
              {copiedText && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-10 flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>{t(copiedText)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
