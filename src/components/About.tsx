import { motion } from "motion/react";
import { User, Github, Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Forum",
    role: "Full Stack Engineer",
    bio: "Specializing in computer vision and real-time state management.",
    initial: "F",
  },
  {
    name: "Carlin",
    role: "AI Architect",
    bio: "Expert in LLM prompt engineering and localized data retrieval.",
    initial: "C",
  },
  {
    name: "Varsha",
    role: "AI Architect",
    bio: "Expert in LLM prompt engineering and localized data retrieval.",
    initial: "V",
  },
  {
    name: "Ananya",
    role: "Full Stack Engineer",
    bio: "Crafting minimalist experiences for maximum environmental impact.",
    initial: "A",
  },
];

export default function About() {
  return (
    <div className="flex-1 px-12 py-16 max-w-6xl mx-auto">
      <div className="text-center space-y-4 mb-20">
        <div className="chip mx-auto">The Visionaries</div>
        <h2 className="text-5xl font-bold text-forest tracking-tight">
          Meet the Minds behind EcoLens.
        </h2>
        <p className="text-lg text-forest/60 max-w-2xl mx-auto">
          We are a team of students at NJIT driven by the goal of closing the
          consumer waste loop through accessible AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col items-center text-center group hover:bg-forest hover:text-white transition-all duration-500"
          >
            <div className="w-20 h-20 rounded-2xl bg-mint-light group-hover:bg-sage/20 flex items-center justify-center text-3xl font-display font-bold text-forest group-hover:text-white mb-6">
              {member.initial}
            </div>
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-sage mb-4">
              {member.role}
            </p>
            <p className="text-sm opacity-60 leading-relaxed mb-6">
              {member.bio}
            </p>

            <div className="flex gap-4 mt-auto">
              <Mail className="w-4 h-4 cursor-pointer hover:text-sage" />
              <Linkedin className="w-4 h-4 cursor-pointer hover:text-sage" />
              <Github className="w-4 h-4 cursor-pointer hover:text-sage" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-12 glass-card bg-forest text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <User className="w-64 h-64 -mr-20 -mt-20" />
        </div>
        <div className="max-w-xl relative z-10 space-y-6">
          <h3 className="text-3xl font-bold">Interested in collaborating?</h3>
          <p className="opacity-70">
            We are always looking for partners in municipalities and
            eco-conscious brands to scale EcoLens to more cities.
          </p>
          <button className="px-8 py-3 bg-white text-forest rounded-full font-bold hover:bg-sage hover:text-white transition-all">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
