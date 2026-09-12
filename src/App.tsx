import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Gaming from './components/Gaming';
import Music from './components/Music';
import MinecraftDev from './components/MinecraftDev';
import Election from './components/Election';
import Footer from './components/Footer';

type Page = 'home' | 'minecraft' | 'election';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#/minecraft' || hash === '#minecraft') return 'minecraft';
    if (hash === '#/election' || hash === '#election') return 'election';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/minecraft' || hash === '#minecraft') {
        setCurrentPage('minecraft');
      } else if (hash === '#/election' || hash === '#election') {
        setCurrentPage('election');
      } else if (hash === '#/' || hash === '' || hash === '#about' || hash.startsWith('#')) {
        if (currentPage !== 'home' && (hash === '' || hash === '#/' || hash === '#about')) {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'minecraft') {
      window.location.hash = '/minecraft';
    } else if (page === 'election') {
      window.location.hash = '/election';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-accent/30 selection:text-accent-foreground flex flex-col justify-between">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'minecraft' ? (
            <motion.div
              key="minecraft"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <MinecraftDev onNavigateHome={() => handleNavigate('home')} />
            </motion.div>
          ) : currentPage === 'election' ? (
            <motion.div
              key="election"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Election onNavigateHome={() => handleNavigate('home')} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Hero onOpenMinecraft={() => handleNavigate('minecraft')} />
              <Skills />
              <Projects />
              <Research />
              <Gaming />
              <Music />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;

