import WorldExperience from './components/WorldExperience';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return <WorldExperience sections={{ about: About, skills: Skills, projects: Projects, experience: Experience, contact: Contact }} />;
}
