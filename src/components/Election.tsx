import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Shield, GraduationCap, Users, Star } from 'lucide-react';

interface ElectionProps {
  onNavigateHome: () => void;
}

interface CandidateCard {
  role: string;
  name: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  accentClass: string;
  borderClass: string;
  glowClass: string;
}

function PhotoPlaceholder({ icon, accentClass }: { icon: React.ReactNode; accentClass: string }) {
  return (
    <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-secondary/80 border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-2 mx-auto mb-5 ${accentClass}`}>
      <div className="text-muted-foreground/50">
        {icon}
      </div>
      <span className="text-[11px] text-muted-foreground/40 font-medium uppercase tracking-wider">Фото</span>
    </div>
  );
}

export default function Election({ onNavigateHome }: ElectionProps) {
  const president: CandidateCard = {
    role: 'Президент',
    name: 'Ваше имя',
    subtitle: 'Кандидат от 11 А класса',
    icon: <Crown size={40} />,
    accentClass: 'group-hover:border-amber-400/60',
    borderClass: 'border-amber-400/50 bg-amber-400/5 shadow-lg shadow-amber-400/10',
    glowClass: 'bg-amber-400/15',
  };

  const vicePresidents: CandidateCard[] = [
    {
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      subtitle: 'Кандидат от 11 А класса',
      icon: <Shield size={32} />,
      accentClass: 'group-hover:border-accent/60',
      borderClass: 'border-accent/40 hover:border-accent/60',
      glowClass: 'bg-accent/10',
    },
    {
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      subtitle: 'Кандидат от 11 Б класса',
      badge: '11 Б',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: <Shield size={32} />,
      accentClass: 'group-hover:border-blue-400/60',
      borderClass: 'border-blue-400/40 hover:border-blue-400/60',
      glowClass: 'bg-blue-400/10',
    },
    {
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      subtitle: 'Кандидат от 11 В класса',
      badge: '11 В',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: <Shield size={32} />,
      accentClass: 'group-hover:border-emerald-400/60',
      borderClass: 'border-emerald-400/40 hover:border-emerald-400/60',
      glowClass: 'bg-emerald-400/10',
    },
  ];

  const deputies: CandidateCard[] = [
    {
      role: 'Завуч по учебно-воспитательной работе',
      name: 'Имя завуча',
      icon: <GraduationCap size={28} />,
      accentClass: 'group-hover:border-purple-400/60',
      borderClass: 'border-purple-400/30 hover:border-purple-400/50',
      glowClass: 'bg-purple-400/10',
    },
    {
      role: 'Завуч младшей школы',
      name: 'Имя завуча',
      subtitle: 'Ответственный за 10-ые классы',
      icon: <Users size={28} />,
      accentClass: 'group-hover:border-sky-400/60',
      borderClass: 'border-sky-400/30 hover:border-sky-400/50',
      glowClass: 'bg-sky-400/10',
    },
    {
      role: 'Завуч по двужихе',
      name: 'Имя завуча',
      subtitle: 'Кандидат от 11 А класса',
      icon: <Star size={28} />,
      accentClass: 'group-hover:border-orange-400/60',
      borderClass: 'border-orange-400/30 hover:border-orange-400/50',
      glowClass: 'bg-orange-400/10',
    },
    {
      role: 'Завуч по двужихе',
      name: 'Имя завуча',
      subtitle: 'Кандидат от 11 Б класса',
      icon: <Star size={28} />,
      accentClass: 'group-hover:border-orange-400/60',
      borderClass: 'border-orange-400/30 hover:border-orange-400/50',
      glowClass: 'bg-orange-400/10',
    },
    {
      role: 'Завуч по двужихе',
      name: 'Имя завуча',
      subtitle: 'Кандидат от 11 В класса',
      icon: <Star size={28} />,
      accentClass: 'group-hover:border-orange-400/60',
      borderClass: 'border-orange-400/30 hover:border-orange-400/50',
      glowClass: 'bg-orange-400/10',
    },
  ];

  const renderCard = (card: CandidateCard, index: number, isPresident = false) => (
    <motion.div
      key={`${card.role}-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${card.borderClass} ${
        isPresident ? 'p-8 md:p-10' : 'p-6'
      }`}
    >
      {/* Glow effect */}
      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] -z-10 pointer-events-none ${card.glowClass}`} />

      {/* Badge */}
      {card.badge && (
        <div className="absolute top-4 right-4">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
            {card.badge}
          </span>
        </div>
      )}

      <PhotoPlaceholder icon={card.icon} accentClass={card.accentClass} />

      <div className="text-center">
        <h3 className={`font-bold text-foreground mb-1 ${isPresident ? 'text-2xl' : 'text-lg'}`}>
          {card.name}
        </h3>
        <p className={`font-semibold mb-1 ${isPresident ? 'text-amber-400 text-lg' : 'text-accent text-sm'}`}>
          {card.role}
        </p>
        {card.subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {card.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-amber-400/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-[900px] right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Back button */}
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
            <span>Назад к портфолио</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-amber-400/40 bg-amber-400/10 text-amber-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <Crown size={16} />
            День самоуправления
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Кандидат в{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-accent to-amber-400">
              Президенты
            </span>
            <br />
            Лицея №11
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            Команда 11 А класса представляет своего кандидата и состав будущего руководства лицея на день самоуправления
          </motion.p>
        </div>

        {/* President Card — Full Width */}
        <div className="max-w-md mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {renderCard(president, 0, true)}
          </motion.div>
        </div>

        {/* Vice Presidents */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            >
              Заместители президента
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base"
            >
              Объединённая команда из трёх классов
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {vicePresidents.map((vp, i) => renderCard(vp, i))}
          </div>
        </div>

        {/* Deputies Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            >
              Состав завучей
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base"
            >
              Ответственные за ключевые направления работы лицея
            </motion.p>
          </div>

          {/* First row: 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-6">
            {deputies.slice(0, 2).map((d, i) => renderCard(d, i))}
          </div>

          {/* Second row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deputies.slice(2).map((d, i) => renderCard(d, i + 2))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-3xl border border-amber-400/40 bg-amber-400/5 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -z-10" />

          <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 text-amber-400 mb-4 border border-amber-400/20">
            <Crown size={28} />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
            Голосуй за 11 А! 🗳️
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Наша команда готова сделать день самоуправления в лицее незабываемым. Вместе мы справимся!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
