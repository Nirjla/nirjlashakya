import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { getAboutBio } from '../../data/sections'

export default function ProfileCard() {
  const [bio, setBio] = useState<string | null>(null)

  useEffect(() => {
    getAboutBio().then(setBio)
  }, [])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="p-5 border-b border-border space-y-4"
    >
      {/* Profile Avatar - Logo */}
      <div className="flex justify-center mb-2">
        <div className="w-24 h-24 rounded-full bg-terminal-background border border-border">
          <img
            src="/nirjla_terminal.png"
            alt="Nirjla Shakya Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold text-foreground">Nirjla Shakya</h2>
        <p className="text-xs text-accent-cyan font-mono uppercase tracking-widest">Software Engineer</p>

        {/* Status Badges */}
        <div className="flex justify-center gap-2 flex-wrap pt-1">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-secondary text-accent-cyan border border-border">
            Available
          </span>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-secondary text-accent-cyan border border-border">
            Remote
          </span>
        </div>
      </div>

      {/* Quick Bio */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        {bio ?? ''}
      </p>

      {/* CTA Button */}
      <motion.a
        href="mailto:shakyanirjala6@gmail.com"
        whileTap={{ scale: 0.98 }}
        className="block text-center w-full px-3 py-2.5 rounded bg-secondary text-accent text-xs font-mono font-semibold border border-border hover:bg-secondary/80 transition-colors"
      >
        Contact
      </motion.a>

      {/* Social Links */}
      <div className="flex justify-center gap-2 pt-2">
        <a
          href="https://github.com/nirjla"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded border border-border hover:bg-secondary text-muted-foreground hover:text-accent-cyan transition-colors"
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/nirjalashakya"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded border border-border hover:bg-secondary text-muted-foreground hover:text-accent-cyan transition-colors"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:shakyanirjala6@gmail.com"
          className="p-2 rounded border border-border hover:bg-secondary text-muted-foreground hover:text-accent-cyan transition-colors"
          title="Email"
        >
          <Mail size={16} />
        </a>
      </div>
    </motion.div>
  )
}

