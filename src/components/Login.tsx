import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, Mail, Lock, ArrowRight, Github } from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-off-white flex items-center justify-center p-6 z-[100]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Brand Header */}
        <div className="text-center space-y-6">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-16 h-16 bg-forest rounded-[1.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-forest/20"
          >
            <Leaf className="text-white w-8 h-8" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-forest">
              Welcome back.
            </h1>
            <p className="text-forest/40 font-medium">
              Continue your journey to zero waste.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 md:p-10 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40 px-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within:text-sage transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@njit.edu"
                  className="w-full bg-mint-light/50 border border-transparent focus:border-sage/30 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-forest/20 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40 px-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within:text-sage transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-mint-light/50 border border-transparent focus:border-sage/30 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-forest/20 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-14 group relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-forest/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-forest/20 bg-white px-4">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-forest/5 rounded-xl hover:bg-forest/5 transition-all active:scale-95">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span className="text-xs font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-forest/5 rounded-xl hover:bg-forest/5 transition-all active:scale-95">
              <Github className="w-4 h-4" />
              <span className="text-xs font-bold">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-forest/40">
          Don't have an account?{" "}
          <span className="text-sage font-bold cursor-pointer hover:underline">
            Create one
          </span>
        </p>
      </motion.div>
    </div>
  );
}
