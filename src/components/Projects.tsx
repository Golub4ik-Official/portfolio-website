import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const { t } = useTranslation();

  const projectsList = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80',
      tags: ['React', 'Node.js', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      description: 'A beautifully designed task manager with drag-and-drop functionality.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
      tags: ['TypeScript', 'Tailwind', 'Zustand'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'AI Chat Interface',
      description: 'Modern chat interface communicating with OpenAI API.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80',
      tags: ['Next.js', 'OpenAI', 'Framer Motion'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t('projects.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-2xl overflow-hidden border border-border/50 hover:border-accent/50 transition-colors flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                    <FaGithub size={16} /> {t('projects.view_source')}
                  </a>
                  <a href={project.demoUrl} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                    <ExternalLink size={16} /> {t('projects.live_demo')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
