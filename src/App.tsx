/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf } from 'lucide-react';
import Home from './components/Home';
import About from './components/About';
import Scanner from './components/Scanner';

type Page = 'home' | 'scanner' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      {/* Universal Header */}
      <nav className="flex justify-between items-center px-12 py-8 z-50">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-forest group-hover:text-sage transition-colors">
            EcoLens <span className="font-normal text-sage group-hover:text-forest transition-colors">AI</span>
          </span>
        </div>

        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-forest/40">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`hover:text-forest transition-colors ${currentPage === 'home' ? 'text-forest border-b-2 border-sage pb-1' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('scanner')}
            className={`hover:text-forest transition-colors ${currentPage === 'scanner' ? 'text-forest border-b-2 border-sage pb-1' : ''}`}
          >
            Terminal
          </button>
          <button 
            onClick={() => setCurrentPage('about')}
            className={`hover:text-forest transition-colors ${currentPage === 'about' ? 'text-forest border-b-2 border-sage pb-1' : ''}`}
          >
            Our Team
          </button>
        </div>

        <button 
          onClick={() => setCurrentPage('scanner')}
          className="px-6 py-2.5 bg-forest text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-forest/5"
        >
          Launch App
        </button>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {currentPage === 'home' && <Home onStart={() => setCurrentPage('scanner')} />}
          {currentPage === 'scanner' && <Scanner />}
          {currentPage === 'about' && <About />}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Nav Overlay (Optional/Simplified) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-forest/90 backdrop-blur-xl p-4 rounded-full flex justify-around items-center text-white/50 text-[10px] font-bold uppercase tracking-widest shadow-2xl">
          <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-sage' : ''}>Home</button>
          <button onClick={() => setCurrentPage('scanner')} className={currentPage === 'scanner' ? 'text-sage' : ''}>App</button>
          <button onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'text-sage' : ''}>Team</button>
        </div>
      </div>
    </div>
  );
}
