import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="p-5 border-b border-accent-cyan/20 space-y-4"
    >
      {/* Profile Avatar - Logo with glow */}
      <div className="flex justify-center mb-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-purple/30 p-0.5 ring-1 ring-accent-cyan/30 shadow-lg shadow-accent-cyan/20"
        >
          <div className="w-full h-full rounded-full bg-terminal-background flex items-center justify-center overflow-hidden border border-accent-cyan/20">
            <img 
              src="/nirjla_terminal.png" 
              alt="Nirjla Shakya Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Profile Info */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold text-foreground">Nirjla Shakya</h2>
        <p className="text-xs text-accent-cyan font-mono uppercase tracking-widest">Software Engineer</p>
        
        {/* Status Badges */}
        <div className="flex justify-center gap-2 flex-wrap pt-1">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40 hover:border-accent-cyan/60 transition-colors"
          >
            Available
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-accent-purple/15 text-accent-purple border border-accent-purple/40 hover:border-accent-purple/60 transition-colors"
          >
            Remote
          </motion.span>
        </div>
      </div>

      {/* Quick Bio */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Crafting elegant web experiences with modern tech stack. Passionate about performance and user experience.
      </p>

      {/* CTA Button */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-3 py-2.5 rounded-lg bg-gradient-to-r from-accent-cyan/30 to-accent-cyan/20 text-accent-cyan text-xs font-mono font-semibold border border-accent-cyan/50 hover:border-accent-cyan/80 shadow-lg shadow-accent-cyan/20 transition-all duration-300"
      >
        Contact
      </motion.button>

      {/* Social Links */}
      <div className="flex justify-center gap-2 pt-2">
        <motion.a
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/nirjla"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg border border-border/50 hover:border-accent-cyan/50 bg-secondary/30 hover:bg-accent-cyan/15 transition-all text-muted-foreground hover:text-accent-cyan shadow-sm"
          title="GitHub"
        >
          <Github size={16} />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.linkedin.com/in/nirjalashakya"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg border border-border/50 hover:border-accent-cyan/50 bg-secondary/30 hover:bg-accent-cyan/15 transition-all text-muted-foreground hover:text-accent-cyan shadow-sm"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:shakyanirjala6@gmail.com"
          className="p-2 rounded-lg border border-border/50 hover:border-accent-cyan/50 bg-secondary/30 hover:bg-accent-cyan/15 transition-all text-muted-foreground hover:text-accent-cyan shadow-sm"
          title="Email"
        >
          <Mail size={16} />
        </motion.a>
      </div>
    </motion.div>
  )
}
