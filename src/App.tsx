import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gaming from './components/Gaming';
import Music from './components/Music';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans antialiased selection:bg-accent/30 selection:text-accent-foreground">
      <Header />
      
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Gaming />
        <Music />
      </main>

      <Footer />
    </div>
  );
}

export default App;
