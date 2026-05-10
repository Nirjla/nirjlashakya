import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="p-4 border-b border-border"
    >
      {/* Profile Avatar Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple p-1">
          <div className="w-full h-full rounded-full bg-terminal-background flex items-center justify-center text-2xl font-bold text-accent">
            NS
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-primary-foreground">Nirjla Shakya</h2>
        <p className="text-sm text-accent mb-2">Software Engineer</p>
        
        {/* Status Badges */}
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
            Available
          </span>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
            Remote
          </span>
        </div>
      </div>

      {/* Quick Bio */}
      <p className="text-xs text-muted-foreground text-center mb-4">
        Crafting elegant web experiences with modern tech stack. Passionate about performance and user experience.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="flex-1 px-3 py-2 rounded bg-accent text-accent-foreground text-xs font-mono hover:bg-accent/90 transition-colors">
          Resume
        </button>
        <button className="flex-1 px-3 py-2 rounded border border-border text-foreground text-xs font-mono hover:bg-secondary transition-colors">
          Contact
        </button>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-3">
        <a
          href="https://github.com/nirjla"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-accent"
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/nirjalashakya"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-accent"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:shakyanirjala6@gmail.com"
          className="p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-accent"
          title="Email"
        >
          <Mail size={16} />
        </a>
      </div>
    </motion.div>
  )
}
