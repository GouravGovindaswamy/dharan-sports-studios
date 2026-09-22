import { ThemeProvider } from "./context/ThemeContext";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Profile } from "./components/Profile";
import { Leadership } from "./components/Leadership";
import { Pathway } from "./components/Pathway";
import { CoachingMatrix } from "./components/CoachingMatrix";
import { Locations } from "./components/Locations";
import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";
import { Testimonials } from "./components/Testimonials";
import { ContactDock } from "./components/ContactDock";
import { Footer } from "./components/Footer";
import { Grain } from "./components/ui/Grain";
import { SectionDivider } from "./components/ui/SectionDivider";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-app text-primary transition-colors duration-300">
        <Grain />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ember-500 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <SectionDivider />
          <Profile />
          <SectionDivider />
          <Leadership />
          <SectionDivider />
          <Pathway />
          <SectionDivider />
          <CoachingMatrix />
          <SectionDivider />
          <Locations />
          <SectionDivider />
          <Services />
          <SectionDivider />
          <Sponsors />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <ContactDock />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
