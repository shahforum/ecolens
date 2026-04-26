import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  History, 
  User, 
  RotateCcw, 
  Leaf, 
  Recycle, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  X,
  ScanLine
} from 'lucide-react';
import { analyzeWaste } from '../services/geminiService';
import { WasteAnalysis, WasteCategory } from '../types';
import confetti from 'canvas-confetti';

export default function Scanner() {
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'profile'>('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'scan' && !showResult) {
      startCamera();
    } else {
      stream?.getTracks().forEach(track => track.stop());
    }
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [activeTab, showResult]);

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return;
    
    setIsScanning(true);
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      const result = await analyzeWaste(imageData);
      setAnalysis(result);
      setShowResult(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5D8A5D', '#E8F0E8', '#1E291B']
      });
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 py-8">
      <AnimatePresence mode="wait">
        {activeTab === 'scan' && !showResult && (
          <motion.div
            key="scan-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 relative rounded-[3rem] overflow-hidden bg-forest shadow-2xl border-4 border-white">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover grayscale-[0.2]"
              />
              
              <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between items-center">
                 <div className="chip !bg-white/90 backdrop-blur-sm self-center">
                   Ready to Analyze
                 </div>

                 <div className="flex flex-col items-center">
                    <ScanLine className={`w-12 h-12 ${isScanning ? 'text-sage animate-pulse' : 'text-white/30'}`} />
                 </div>

                 <div className="w-full h-px bg-white/10" />
              </div>

              {isScanning && (
                <motion.div 
                  initial={{ top: '10%' }}
                  animate={{ top: '90%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-1 bg-sage shadow-[0_0_20px_rgba(93,138,93,0.8)] z-10"
                />
              )}
            </div>

            <div className="py-10 flex justify-center">
              <button
                onClick={captureAndAnalyze}
                disabled={isScanning}
                className="w-20 h-20 rounded-full bg-forest border-4 border-white flex items-center justify-center shadow-2xl active:scale-95 transition-all disabled:opacity-50"
              >
                <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center">
                  <Camera className="text-white w-6 h-6" />
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {showResult && analysis && (
          <motion.div
            key="result-view"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1 glass-card p-10 overflow-y-auto mb-10 pb-20"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <div className="chip">{analysis.material}</div>
                <h2 className="text-4xl font-bold text-forest tracking-tight">{analysis.itemName}</h2>
              </div>
              <button onClick={() => setShowResult(false)} className="p-2 hover:bg-black/5 rounded-full"><X/></button>
            </div>

            <div className="space-y-6">
              <section className="p-6 bg-mint-light rounded-2xl border border-sage/10">
                <div className="flex items-center gap-2 mb-4 font-bold text-xs uppercase tracking-widest text-sage">
                  <RotateCcw className="w-4 h-4" /> 01 Reuse
                </div>
                <ul className="space-y-2">
                   {analysis.instructions[WasteCategory.REUSE].map((u, i) => (
                     <li key={i} className="text-sm text-forest/70">• {u}</li>
                   ))}
                </ul>
              </section>

              <section className="p-6 bg-forest text-white rounded-2xl">
                <div className="flex items-center gap-2 mb-4 font-bold text-xs uppercase tracking-widest text-sage">
                  <Recycle className="w-4 h-4" /> 02 Recycle
                </div>
                <p className="text-sm leading-relaxed mb-4">{analysis.instructions[WasteCategory.RECYCLE]}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase opacity-40">Local Target</span>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                    <span className="text-[10px] font-bold">BLUE BIN</span>
                  </div>
                </div>
              </section>

              <div className="text-center italic text-[11px] text-forest/40 px-4">
                "{analysis.environmentalImpact}"
              </div>
            </div>

            <div className="mt-10">
              <button onClick={() => setShowResult(false)} className="btn-primary w-full shadow-lg">Scan Next Item</button>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-3xl font-bold">Your History</h2>
            <div className="space-y-3">
              {[
                { item: 'Bottle', action: 'Recycled', date: 'Today' },
                { item: 'Can', action: 'Resued', date: 'Yesterday' }
              ].map((h, i) => (
                <div key={i} className="glass-card p-5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-forest">{h.item}</h4>
                    <p className="text-[10px] text-forest/40 uppercase font-bold tracking-widest">{h.date}</p>
                  </div>
                  <div className="chip">{h.action}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-forest flex items-center justify-center text-white text-3xl font-bold mb-6">AR</div>
            <h3 className="text-2xl font-bold text-forest">Alex Rivera</h3>
            <p className="text-sage font-bold text-xs uppercase tracking-widest mt-1">Level 12 Eco Guardian</p>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-12">
               <div className="p-6 bg-forest rounded-3xl text-white text-center">
                  <p className="text-[9px] font-bold uppercase text-sage mb-1">Scanned</p>
                  <p className="text-3xl font-bold">124</p>
               </div>
               <div className="p-6 bg-sage/10 rounded-3xl text-center border border-sage/20">
                  <p className="text-[9px] font-bold uppercase text-forest/30 mb-1">Impact</p>
                  <p className="text-3xl font-bold text-forest">8.4kg</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showResult && (
        <div className="mt-auto pt-10">
          <div className="bg-white border border-forest/5 rounded-[2rem] p-4 flex items-center justify-between shadow-2xl">
            <NavButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={<History className="w-5 h-5" />}
              label="Log"
            />
            <button 
              onClick={() => setActiveTab('scan')}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'scan' ? 'bg-forest text-white' : 'bg-off-white text-forest/30'}`}
            >
              <Camera className="w-6 h-6" />
            </button>
            <NavButton 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
              icon={<User className="w-5 h-5" />}
              label="User"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 transition-colors ${active ? 'text-forest' : 'text-forest/30'}`}>
      {icon}
      <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{label}</span>
    </button>
  );
}
