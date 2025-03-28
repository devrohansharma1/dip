import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { practicals } from '../data/practicals';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, searchTerm, setSearchTerm }: SidebarProps) => {
  const [filteredPracticals, setFilteredPracticals] = useState(practicals);

  useEffect(() => {
    const filtered = practicals.filter(practical => 
      practical.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practical.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPracticals(filtered);
  }, [searchTerm]);

  return (
    <aside 
      className={`bg-card w-full md:w-64 lg:w-72 fixed md:sticky top-0 h-screen overflow-y-auto z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <span className="text-primary mr-2">
              <i className="fas fa-image"></i>
            </span> 
            DIP Practicals
          </h2>
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="relative mt-4">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">
              <i className="fas fa-search"></i>
            </span>
            <Input
              type="text"
              placeholder="Search practicals..."
              className="w-full bg-secondary pl-10 pr-4 text-sm focus:ring-primary search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-100px)]">
        <nav className="py-4">
          <ul className="space-y-1">
            {filteredPracticals.map((practical) => (
              <li key={practical.id}>
                <a 
                  href={`#practical-${practical.id}`} 
                  className="block px-4 py-2 hover:bg-secondary rounded-md mx-2 transition-colors duration-200"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <div className="flex items-center">
                    <span className="w-6 text-center text-primary">{practical.id}.</span>
                    <span className="ml-2">{practical.title}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
