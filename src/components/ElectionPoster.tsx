import { QRCodeSVG } from 'qrcode.react';
import { 
  Printer, 
  ArrowLeft, 
  Crown, 
  Shield, 
  ScrollText, 
  GraduationCap, 
  Users, 
  Megaphone, 
  Star, 
  Vote,
  Sparkles,
  Check
} from 'lucide-react';
import { electionData, type CandidateItem } from '../data/electionData';

interface ElectionPosterProps {
  onNavigateBack: () => void;
}

function getIcon(name: CandidateItem['iconName'], size = 18, className = '') {
  switch (name) {
    case 'crown':
      return <Crown size={size} className={className} />;
    case 'shield':
      return <Shield size={size} className={className} />;
    case 'scroll-text':
      return <ScrollText size={size} className={className} />;
    case 'graduation-cap':
      return <GraduationCap size={size} className={className} />;
    case 'users':
      return <Users size={size} className={className} />;
    case 'megaphone':
      return <Megaphone size={size} className={className} />;
    case 'star':
      return <Star size={size} className={className} />;
    default:
      return <Shield size={size} className={className} />;
  }
}

function getBadgeStyle(badge: string) {
  if (badge.includes('11 А') || badge.includes('11А')) {
    return 'bg-amber-100 text-amber-900 border-amber-300';
  }
  if (badge.includes('11 Б') || badge.includes('11Б')) {
    return 'bg-blue-100 text-blue-900 border-blue-300';
  }
  if (badge.includes('11 В') || badge.includes('11В')) {
    return 'bg-emerald-100 text-emerald-900 border-emerald-300';
  }
  return 'bg-slate-100 text-slate-800 border-slate-300';
}

export default function ElectionPoster({ onNavigateBack }: ElectionPosterProps) {
  const handlePrint = () => {
    window.print();
  };

  const { president, vicePresidents, deputies, appeal } = electionData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 print:p-0 print:bg-white print:text-black">
      {/* Top control bar (hidden when printing) */}
      <div className="max-w-[210mm] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-medium transition-colors border border-slate-700"
          >
            <ArrowLeft size={16} />
            <span>Назад к выборам</span>
          </button>
          <div className="hidden sm:block text-xs text-slate-400">
            <span className="font-semibold text-amber-400">Формат А4</span> (210 × 297 мм) • Готов к цветной печати
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Printer size={18} />
            <span>Распечатать афишу (Ctrl + P)</span>
          </button>
        </div>
      </div>

      {/* Instructions callout (hidden when printing) */}
      <div className="max-w-[210mm] mx-auto mb-6 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-center justify-between print:hidden">
        <span>💡 <b>Совет перед печатью:</b> в диалоге печати браузера установите ориентацию <b>«Книжная»</b>, поля <b>«Минимальные»</b> или <b>«По умолчанию»</b>, включите галочку <b>«Фоновая графика»</b>.</span>
      </div>

      {/* The Printable A4 Sheet */}
      <div 
        id="election-poster-sheet"
        className="poster-sheet mx-auto bg-white text-slate-900 shadow-2xl rounded-sm print:rounded-none print:shadow-none relative flex flex-col justify-between"
        style={{
          width: '210mm',
          height: '297mm',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '9mm 10mm 8mm 10mm',
        }}
      >
        {/* Top Header */}
        <header className="border-b-2 border-slate-900 pb-2 mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-sm">
                <Crown size={18} />
              </div>
              <div>
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-800">
                  {electionData.schoolName} • ДЕНЬ САМОУПРАВЛЕНИЯ
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase">
              <Sparkles size={11} />
              ГОЛОСУЮТ ТОЛЬКО 10 И 11 КЛАССЫ
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[26px] leading-tight font-black tracking-tight text-slate-950 uppercase">
                ВЫБОРЫ РУКОВОДСТВА ЛИЦЕЯ
              </h1>
              <p className="text-[12px] font-bold text-amber-600 tracking-wide uppercase">
                Официальный кандидат в Президенты от 11 А класса
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block border-2 border-amber-500 bg-amber-50 text-amber-950 font-black text-[13px] px-3 py-1 rounded-md tracking-wider">
                БЮЛЛЕТЕНЬ № 1
              </span>
            </div>
          </div>
        </header>

        {/* Top Section: Candidate + Appeal side-by-side */}
        <div className="grid grid-cols-12 gap-3 mb-2.5 items-stretch">
          {/* Candidate Card (4 cols) */}
          <div className="col-span-4 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/50 border-2 border-amber-400/80 rounded-xl p-3 flex flex-col items-center justify-center text-center relative shadow-sm">
            <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded border bg-amber-200/90 text-amber-950 border-amber-400">
              {president.badge}
            </span>

            {/* Photo box */}
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-amber-400/80 bg-white flex flex-col items-center justify-center gap-1 my-1.5 text-slate-400 shadow-inner">
              <Crown size={32} className="text-amber-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">ФОТО</span>
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 mb-0.5">
              КАНДИДАТ В ПРЕЗИДЕНТЫ
            </span>
            <h2 className="text-[17px] font-black text-slate-950 leading-snug">
              {president.name}
            </h2>
            <p className="text-[10px] font-semibold text-slate-600 mt-0.5">
              Лидер команды 11 А класса
            </p>
          </div>

          {/* Appeal to 10-11 graders (8 cols) */}
          <div className="col-span-8 bg-slate-900 text-white rounded-xl p-3.5 flex flex-col justify-between border-2 border-slate-900 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700/80">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Vote size={14} className="text-amber-400" />
                  ОБРАЩЕНИЕ К СТАРШЕКЛАССНИКАМ
                </span>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  10-е и 11-е классы
                </span>
              </div>

              <p className="text-[13px] font-black text-amber-300 mb-1 leading-snug">
                {appeal.greeting}
              </p>

              <div className="space-y-1 text-[11px] text-slate-200 leading-relaxed font-normal">
                {appeal.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-2 mt-1.5 border-t border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11.5px] font-black text-amber-400">
                <Check size={14} className="text-amber-400 stroke-[3]" />
                <span>{appeal.callToAction}</span>
              </div>
              <span className="text-[9.5px] font-medium text-slate-400">
                Твой голос решает судьбу дня!
              </span>
            </div>
          </div>
        </div>

        {/* Section: Vice Presidents & Secretary */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              <h3 className="text-[11.5px] font-black uppercase tracking-wider text-slate-900">
                ЗАМЕСТИТЕЛИ ПРЕЗИДЕНТА И СЕКРЕТАРЬ
              </h3>
            </div>
            <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">
              Единая межклассовая команда
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {vicePresidents.map((vp) => (
              <div 
                key={vp.id}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-between text-left"
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className="p-1 rounded bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    {getIcon(vp.iconName, 14)}
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${getBadgeStyle(vp.badge)}`}>
                    {vp.badge}
                  </span>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase leading-tight line-clamp-1">
                    {vp.role}
                  </div>
                  <div className="text-[11px] font-black text-slate-900 leading-snug truncate">
                    {vp.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Cabinet of Deputies (Завучи) */}
        <div className="mb-2.5 flex-1 flex flex-col justify-start">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-[11.5px] font-black uppercase tracking-wider text-slate-900">
                КАБИНЕТ ЗАВУЧЕЙ ПО НАПРАВЛЕНИЯМ
              </h3>
            </div>
            <span className="text-[9.5px] font-bold text-amber-700 uppercase tracking-wider">
              Ответственные за работу лицея
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {deputies.map((dep) => {
              const isJunior = dep.id === 'dep-junior';
              return (
                <div 
                  key={dep.id}
                  className={`rounded-lg p-2 flex flex-col justify-between border transition-all ${
                    isJunior 
                      ? 'bg-amber-50/70 border-amber-300 shadow-2xs' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <div className={`p-1 rounded border shadow-2xs ${isJunior ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                      {getIcon(dep.iconName, 14)}
                    </div>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${getBadgeStyle(dep.badge)}`}>
                      {dep.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-black text-slate-900 leading-tight">
                      {dep.role}
                    </div>
                    {dep.subtitle && (
                      <div className={`text-[8.5px] font-bold leading-tight mt-0.5 line-clamp-1 ${isJunior ? 'text-amber-800' : 'text-slate-500'}`}>
                        {dep.subtitle}
                      </div>
                    )}
                    <div className="text-[11px] font-extrabold text-slate-800 mt-1 truncate">
                      {dep.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Section: Big CTA + Date/Location + QR Code */}
        <footer className="border-t-2 border-slate-900 pt-2.5">
          <div className="bg-slate-100 border border-slate-300 rounded-xl p-2.5 flex items-center justify-between gap-3">
            {/* Left: Call to action */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[20px] font-black text-slate-950 uppercase tracking-tight">
                  ГОЛОСУЙ ЗА 11 А!
                </span>
                <span className="text-[18px]">🗳️</span>
              </div>
              <p className="text-[10.5px] font-bold text-slate-700 leading-snug">
                Команда готова сделать этот День самоуправления лучшим в истории лицея!
              </p>
              <div className="flex items-center gap-3 mt-1 text-[9.5px] font-semibold text-slate-600">
                <span>📍 {electionData.votingLocationText}</span>
                <span>📅 {electionData.votingDateText}</span>
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-300">
              <div className="bg-white p-1.5 rounded-lg border border-slate-300 shadow-2xs flex items-center justify-center">
                <QRCodeSVG 
                  value={electionData.qrCodeUrl} 
                  size={62} 
                  level="M" 
                  includeMargin={false}
                />
              </div>
              <div className="text-left max-w-[90px]">
                <span className="block text-[8.5px] font-black text-slate-900 uppercase leading-tight">
                  ОНЛАЙН-САЙТ ВЫБОРОВ
                </span>
                <span className="block text-[7.5px] font-semibold text-slate-500 mt-0.5 leading-tight">
                  Сканируй QR для подробностей
                </span>
              </div>
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[8px] font-medium text-slate-400">
            <span>Агитационный материал кандидата в Президенты Лицея №11 от 11 А класса.</span>
            <span>Для учащихся 10–11 классов • Распространяется на правах самоуправления</span>
          </div>
        </footer>
      </div>

      {/* Embedded Print CSS */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, nav, .print\\:hidden, #app-header, #app-footer {
            display: none !important;
          }
          .poster-sheet {
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 8mm 10mm 6mm 10mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
