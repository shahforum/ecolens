import { motion } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Globe } from "lucide-react";

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row px-12 items-center gap-16 py-12">
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4">
            <div className="chip">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
              </span>
              Live in Los Angeles, CA
            </div>
            <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-forest">
              Closing the loop on <span className="text-sage">waste.</span>
            </h1>
            <p className="text-lg text-forest/70 leading-relaxed max-w-md">
              Real-time computer vision meets localized municipal data to remove
              the guesswork from sustainability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="btn-primary group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline">Learn More</button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold text-forest">25%+</div>
              <div className="text-[10px] text-forest/40 font-bold uppercase tracking-widest mt-1">
                Waste Reduction
              </div>
            </div>
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold text-forest">8.4k</div>
              <div className="text-[10px] text-forest/40 font-bold uppercase tracking-widest mt-1">
                Items Scanned
              </div>
            </div>
          </div>
        </div>

        {/* Visual Mockup Container */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative w-[300px] h-[600px] rounded-[3rem] border-[10px] border-forest bg-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-mint-light/50 flex flex-col p-6 items-center justify-center text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mb-4">
                <Leaf className="text-sage w-8 h-8" />
              </div>
              <h3 className="font-bold text-forest mb-2">
                Sustainable Assistant
              </h3>
              <p className="text-xs text-forest/60">
                Ready to analyze your next item. Point your camera to begin.
              </p>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-10 top-20 p-4 glass-card max-w-[180px] rotate-[-4deg]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-mint-light rounded-lg text-sage">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Verified Data
              </span>
            </div>
            <p className="text-[9px] text-forest/60 leading-tight">
              Syncing with LA Sanitation guidelines for 2024.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-10 bottom-20 p-4 glass-card max-w-[180px] rotate-[3deg]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#FDF4EE] rounded-lg text-[#F27D26]">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Geo-Localized
              </span>
            </div>
            <p className="text-[9px] text-forest/60 leading-tight">
              Custom sorting rules based on your current ZIP code.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Trust Pillars */}
      <div className="border-t border-[#E0E7E0] bg-white/30 py-12 px-12">
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-sage uppercase tracking-widest mb-1">
                Pillar 01
              </span>
              <span className="text-sm font-bold text-forest uppercase">
                Instant Identity
              </span>
            </div>
            <div className="w-px h-8 bg-black/5 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-sage uppercase tracking-widest mb-1">
                Pillar 02
              </span>
              <span className="text-sm font-bold text-forest uppercase">
                Decision Engine
              </span>
            </div>
            <div className="w-px h-8 bg-black/5 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-sage uppercase tracking-widest mb-1">
                Pillar 03
              </span>
              <span className="text-sm font-bold text-forest uppercase">
                Circular Habits
              </span>
            </div>
          </div>
          <div className="text-[9px] font-bold text-forest/30 uppercase tracking-[0.2em]">
            SPONSORED BY LA HACKS 2026
          </div>
        </div>
      </div>
    </div>
  );
}
