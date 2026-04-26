import { motion } from "motion/react";
import { User, Github, Linkedin, Mail, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

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
    role: "AI Architect",
    bio: "Expert in LLM prompt engineering and localized data retrieval.",
    initial: "A",
  },
];

const projectStory = `
### The Genesis of EcoLens AI

The inspiration for **EcoLens AI** came from a simple observation: most people *want* to be sustainable, but the complexity of municipal rules turns recycling into a guessing game. This leads to **"Wish-cycling"**, where non-recyclables contaminate entire batches. We realized that by leveraging real-time vision, we could provide clarity at the exact moment of disposal.

#### The Tech Behind the Lens
We built the prototype using a combination of high-frequency computer vision and a localized Decision Engine. By integrating the **Gemini 2.0 Flash** model, we achieved low-latency inference for material classification.

The probability of correct classification $P(C)$ is modeled as:
$$P(C | I) = \frac{\exp(f(I))}{\sum_{j} \exp(f_j(I))}$$
where $I$ is the image input and $f(I)$ represents the feature weights assigned by our vision-transformer backbone.

#### Challenges Faced
1.  **Material Ambiguity**: Differentiating between HDPE and PET plastics in varied lighting conditions.
2.  **Locality Complexity**: Aggregating diverse ZIP-code level regulations into a unified schema.
3.  **Low Latency**: Ensuring the "Instant Identity" pillar felt instantaneous on mobile hardware.

#### What We Learned
Beyond the technical implementation, we learned about the **Circular Economy Invariant**:
$$E_{total} = \sum (R_{educed} + R_{eused} + R_{ecycled}) - W_{asted}$$
Maximizing sustainability isn't just about sorting; it's about shifting the behavior towards the top of the waste hierarchy (Reduce & Reuse).
`;

export default function About() {
  return (
    <div className="flex-1 px-12 py-16 max-w-6xl mx-auto space-y-32">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="chip mx-auto">The Visionaries</div>
        <h2 className="text-5xl font-bold text-forest tracking-tight">
          Meet the Minds behind EcoLens.
        </h2>
        <p className="text-lg text-forest/60 max-w-2xl mx-auto">
          We are a team of students at NJIT driven by the goal of closing the
          consumer waste loop through accessible AI.
        </p>
      </div>

      {/* Team Grid */}
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
            <div className="w-20 h-20 rounded-2xl bg-mint-light group-hover:bg-sage/20 flex items-center justify-center text-3xl font-display font-bold text-forest group-hover:text-white mb-6 transition-colors font-sans">
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
              <Mail className="w-4 h-4 cursor-pointer hover:text-sage transition-colors" />
              <Linkedin className="w-4 h-4 cursor-pointer hover:text-sage transition-colors" />
              <Github className="w-4 h-4 cursor-pointer hover:text-sage transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Story Section */}
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-px bg-forest/10 flex-1" />
          <div className="flex items-center gap-2 text-sage lowercase font-bold tracking-widest text-xs">
            <BookOpen className="w-4 h-4" />
            The Project Story
          </div>
          <div className="h-px bg-forest/10 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-forest leading-tight">
              Sustainability shouldn't be a{" "}
              <span className="text-sage underline decoration-sage/30 underline-offset-8">
                guessing game.
              </span>
            </h3>
            <div className="bg-sage/10 p-8 rounded-[2rem] border border-sage/20">
              <p className="text-forest/80 italic leading-relaxed">
                "Our mission is to reduce landfill contamination by 25% by 2026,
                empowering every individual to participate in the circular
                economy with confidence."
              </p>
            </div>
          </div>

          <div className="markdown-body prose prose-forest max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {projectStory}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-12 glass-card bg-forest text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <User className="w-64 h-64 -mr-20 -mt-20" />
        </div>
        <div className="max-w-xl relative z-10 space-y-6">
          <h3 className="text-3xl font-bold">Interested in collaborating?</h3>
          <p className="opacity-70">
            We are always looking for partners in municipalities and
            eco-conscious brands to scale EcoLens to more cities.
          </p>
          <button className="px-8 py-3 bg-white text-forest rounded-full font-bold hover:bg-sage hover:text-white transition-all transform hover:-translate-y-1">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
