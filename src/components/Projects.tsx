import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'BattlePlugin',
      description: 'Плагин для Paper 1.21.11: битвы между командами с захватом точек, статистикой и историей.',
      tech: ['Java', 'Minecraft API', 'Paper'],
      github: 'https://github.com/Golub4ik-Official/BattlePlugin',
      collaborator: false
    },
    {
      title: 'blockbench-mcp',
      description: 'MCP server + Blockbench plugin bridge: control Blockbench (3D modeling, cubes) from AI assistants via Model Context Protocol.',
      tech: ['TypeScript', 'MCP', 'Blockbench API'],
      github: 'https://github.com/Golub4ik-Official/blockbench-mcp',
      collaborator: false
    },
    {
      title: 'DiscordAuth',
      description: 'Paper plugin for Discord-based authentication with 2FA on new IP.',
      tech: ['Java', 'Discord API'],
      github: 'https://github.com/Golub4ik-Official/DiscordAuth',
      collaborator: false
    },
    {
      title: 'BandaMarines',
      description: 'Contains the code for CM-SS13 (Colonial Marines).',
      tech: ['DM (BYOND)'],
      github: 'https://github.com/Golub4ik-Official/BandaMarines',
      collaborator: true
    },
    {
      title: 'dead-space-14',
      description: 'Dead Space adaptation for Space Station 14 based on RobustToolbox.',
      tech: ['C#', 'RobustToolbox'],
      github: 'https://github.com/Golub4ik-Official/dead-space-14',
      collaborator: true
    },
    {
      title: 'Golub4ik-Web-Checker',
      description: 'Web service checker and monitoring tool.',
      tech: ['Python'],
      github: 'https://github.com/Golub4ik-Official/Golub4ik-Web-Checker',
      collaborator: false
    },
    {
      title: 'Golub4ik-DeadSpace-Checker',
      description: 'Specific checker utility for the Dead Space 14 project.',
      tech: ['Python'],
      github: 'https://github.com/Golub4ik-Official/Golub4ik-DeadSpace-Checker',
      collaborator: false
    },
    {
      title: 'HorseArmorHealth',
      description: 'Minecraft plugin affecting horse armor and health mechanics.',
      tech: ['Java'],
      github: 'https://github.com/Golub4ik-Official/HorseArmorHealth',
      collaborator: false
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          {t('projects.title')}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 glass p-6 rounded-2xl border border-border/50 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-accent">
            <FaGithub /> {t('projects.github_stats')}
          </h3>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            <img 
              src="https://github-readme-stats.vercel.app/api?username=Golub4ik-Official&theme=transparent&hide_border=true&show_icons=true&text_color=e5e5e5&icon_color=ca6e6f&title_color=ca6e6f" 
              alt="GitHub Stats" 
              className="w-full lg:w-[400px] object-contain drop-shadow-md"
            />
            <div className="w-full flex-1 overflow-hidden">
              <img 
                src="https://ghchart.rshah.org/ca6e6f/Golub4ik-Official" 
                alt="GitHub Heatmap" 
                className="w-full min-w-[600px] object-contain opacity-90 hue-rotate-0"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col h-full border border-border/50 hover:border-accent/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaGithub size={100} className="-rotate-12 transform translate-x-4 -translate-y-4" />
              </div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              {project.collaborator && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500 bg-amber-500/10 w-fit px-2 py-1 rounded-full mb-3 border border-amber-500/20">
                  <Users size={12} />
                  <span>Collaborator</span>
                </div>
              )}
              
              <p className="text-muted-foreground mb-6 flex-grow text-sm relative z-10">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                  >
                    {tech}
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
