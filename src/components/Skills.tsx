import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Monitor, Server, Database } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <Monitor size={24} />,
      skills: ['HTML+CSS', 'JavaScript', 'React', 'Tailwind CSS']
    },
    {
      title: t('skills.backend'),
      icon: <Server size={24} />,
      skills: ['Python', 'Java', 'Node.js', 'SQL', 'C++']
    },
    {
      title: t('skills.tools'),
      icon: <Database size={24} />,
      skills: ['Godot', 'Blender', 'Git', 'Docker']
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t('skills.title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass p-6 rounded-2xl border border-border/50 hover:border-accent/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-6 text-accent">{t(category.title)}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIndex) => (
                  <span 
                    key={sIndex}
                    className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
