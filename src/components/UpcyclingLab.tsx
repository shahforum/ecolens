import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Hammer,
  Scissors,
  Lightbulb,
  ChevronRight,
  X,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { WasteAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function UpcyclingLab({
  item,
  onOpen,
}: {
  item: WasteAnalysis | null;
  onOpen: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<{
    title: string;
    steps: string[];
    tools: string[];
  } | null>(null);
  const [isOpen, setIsOpen] = useState(onOpen);

  const generateProject = async () => {
    if (!item) return;
    setLoading(true);
    try {
      const prompt = `
        Create a detailed DIY upcycling project for a ${item.itemName} made of ${item.material}.
        Return ONLY a JSON object:
        {
          "title": "Creative Project Name",
          "tools": ["Tool 1", "Tool 2"],
          "steps": ["Detailed Step 1", "Detailed Step 2", "Detailed Step 3"]
        }
      `;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ text: prompt }],
        config: { responseMimeType: "application/json" },
      });

      const text = response.text;
      if (text) setProject(JSON.parse(text));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[101] bg-forest/20 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-8 bg-forest text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Sparkles className="text-sage w-6 h-6 animate-pulse" />
                <h2 className="text-2xl font-bold tracking-tight">
                  AI Upcycling Lab
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {!project ? (
                <div className="text-center space-y-6 py-10">
                  <div className="w-20 h-20 bg-mint-light rounded-3xl flex items-center justify-center mx-auto text-sage">
                    <Lightbulb className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">New Project Available</h3>
                    <p className="text-sm text-forest/50">
                      I can transform your <b>{item?.itemName}</b> into
                      something unique. Want to see a detailed plan?
                    </p>
                  </div>
                  <button
                    onClick={generateProject}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? "Designing..." : "Generate DIY Guide"}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <span className="chip">Tutorial</span>
                    <h3 className="text-3xl font-bold text-forest">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest/40">
                      <Hammer className="w-4 h-4" /> Tools Needed
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-mint-light rounded-full text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest/40">
                      <Scissors className="w-4 h-4" /> Step-by-Step Instructions
                    </div>
                    <div className="space-y-6">
                      {project.steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-sm text-forest/70 leading-relaxed font-medium pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {project && (
              <div className="p-8 border-t border-black/5">
                <button className="btn-primary w-full">
                  Save to My Projects
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
