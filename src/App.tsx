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
import ElectionPoster from './components/ElectionPoster';
import Footer from './components/Footer';

type Page = 'home' | 'minecraft' | 'election' | 'election-poster';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#/minecraft' || hash === '#minecraft') return 'minecraft';
    if (hash === '#/election' || hash === '#election') return 'election';
    if (hash === '#/election-poster' || hash === '#election-poster' || hash === '#/election/poster') return 'election-poster';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/minecraft' || hash === '#minecraft') {
        setCurrentPage('minecraft');
      } else if (hash === '#/election' || hash === '#election') {
        setCurrentPage('election');
      } else if (hash === '#/election-poster' || hash === '#election-poster' || hash === '#/election/poster') {
        setCurrentPage('election-poster');
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
    } else if (page === 'election-poster') {
      window.location.hash = '/election-poster';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-accent/30 selection:text-accent-foreground flex flex-col justify-between">
      {currentPage !== 'election-poster' && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
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
              <Election 
                onNavigateHome={() => handleNavigate('home')} 
                onNavigatePoster={() => handleNavigate('election-poster')} 
              />
            </motion.div>
          ) : currentPage === 'election-poster' ? (
            <motion.div
              key="election-poster"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ElectionPoster onNavigateBack={() => handleNavigate('election')} />
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

      {currentPage !== 'election-poster' && <Footer />}
    </div>
  );
}

export default App;

