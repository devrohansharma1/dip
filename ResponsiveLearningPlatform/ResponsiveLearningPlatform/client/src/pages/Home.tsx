import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import PracticalSection from "../components/PracticalSection";
import { practicals } from "../data/practicals";
import { ScrollArea } from "@/components/ui/scroll-area";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="flex-1 p-4 md:p-6 transition-all duration-300">
        <header className="flex justify-between items-center mb-6">
          <button 
            className="md:hidden bg-card p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <div className="flex items-center ml-auto">
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-card rounded-lg p-6 md:p-8 mb-8 animate-fadeIn">
          <div className="md:flex items-center">
            <div className="md:w-3/5">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Digital Image Processing Practicals</h1>
              <p className="text-muted-foreground mb-4">
                A comprehensive collection of practical exercises for learning Digital Image Processing techniques including convolution, filtering, and image transformations.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">Image Processing</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">Signal Processing</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">Convolution</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs">Filtering</span>
              </div>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&h=300" 
                alt="Digital Image Processing" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          {/* Practicals Sections */}
          {practicals.map((practical) => (
            <PracticalSection 
              key={practical.id} 
              practical={practical} 
            />
          ))}

          {/* Summary of Practicals */}
          <section className="bg-card rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">All Practicals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {practicals.map((practical) => (
                <a 
                  key={practical.id}
                  href={`#practical-${practical.id}`} 
                  className="practical-card bg-secondary p-4 rounded-lg hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {practical.id}
                    </span>
                    <h3 className="ml-3 font-semibold">{practical.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{practical.shortDescription}</p>
                </a>
              ))}
            </div>
          </section>
          
          <footer className="mt-8 py-6 border-t border-border text-center text-muted-foreground">
            <p>© 2025 Digital Image Processing Practical Guide. All content sourced from original materials.</p>
          </footer>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;
