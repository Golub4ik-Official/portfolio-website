import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Presentation } from 'lucide-react';
import { FaFlask } from 'react-icons/fa';

export default function Research() {
  const { t } = useTranslation();

  const techStack = t('research.tech', { returnObjects: true }) as string[];

  return (
    <section id="research" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center flex justify-center items-center gap-3"
        >
          <FaFlask className="text-accent" /> {t('research.title')}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 flex flex-col h-full border border-accent/30 shadow-[0_0_30px_rgba(202,110,111,0.15)] hover:shadow-[0_0_40px_rgba(202,110,111,0.25)] transition-shadow relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FaFlask size={150} className="-rotate-12 transform translate-x-4 -translate-y-4" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-accent mb-4">
                {t('research.project_title')}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                {t('research.project_desc')}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-accent mb-8 font-medium">
                {t('research.supervisor')}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-sm px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://golub4ik-official.github.io/Water-Footprint-calculator/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 flex-1 md:flex-none"
                >
                  <ExternalLink size={20} />
                  {t('research.btn_live')}
                </a>
                
                <a 
                  href={`${import.meta.env.BASE_URL}water_footprint.docx`}
                  download
                  className="flex items-center justify-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors border border-border flex-1 md:flex-none"
                >
                  <FileText size={20} className="text-blue-400" />
                  {t('research.btn_paper')}
                </a>

                <a 
                  href={`${import.meta.env.BASE_URL}water_footprint_presentation.pptx`}
                  download
                  className="flex items-center justify-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors border border-border flex-1 md:flex-none"
                >
                  <Presentation size={20} className="text-orange-400" />
                  {t('research.btn_presentation')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
