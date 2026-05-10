/**
 * Theme definitions for the terminal portfolio
 * Each theme includes CSS variables for colors and styling
 */

export const THEMES = {
  silver: {
    name: 'Silver',
    description: 'Classic silver terminal theme',
    cssVariables: {
      '--background': '220 20% 4%',
      '--foreground': '60 10% 90%',
      '--terminal-background': '220 25% 6%',
      '--terminal-header': '220 20% 10%',
      '--accent': '220 15% 70%',
      '--accent-cyan': '180 100% 50%',
      '--accent-purple': '270 80% 60%',
      '--border': '220 15% 18%',
      '--primary-foreground': '60 10% 95%',
      '--muted-foreground': '220 10% 55%',
    },
  },
  dark: {
    name: 'Dark',
    description: 'Deep dark terminal theme',
    cssVariables: {
      '--background': '220 15% 2%',
      '--foreground': '0 0% 95%',
      '--terminal-background': '220 20% 3%',
      '--terminal-header': '220 15% 8%',
      '--accent': '0 0% 60%',
      '--accent-cyan': '180 80% 40%',
      '--accent-purple': '270 70% 50%',
      '--border': '220 10% 15%',
      '--primary-foreground': '0 0% 98%',
      '--muted-foreground': '220 5% 45%',
    },
  },
  'retro-green': {
    name: 'Retro Green',
    description: 'Authentic CRT green monochrome',
    cssVariables: {
      '--background': '120 100% 2%',
      '--foreground': '120 100% 30%',
      '--terminal-background': '120 100% 3%',
      '--terminal-header': '120 100% 5%',
      '--accent': '120 100% 40%',
      '--accent-cyan': '120 100% 50%',
      '--accent-purple': '140 100% 45%',
      '--border': '120 100% 10%',
      '--primary-foreground': '120 100% 35%',
      '--muted-foreground': '120 100% 20%',
    },
  },
  glassmorphism: {
    name: 'Glassmorphism',
    description: 'Modern frosted glass aesthetic',
    cssVariables: {
      '--background': '240 10% 8%',
      '--foreground': '240 15% 88%',
      '--terminal-background': '240 10% 12%',
      '--terminal-header': '240 10% 15%',
      '--accent': '280 70% 60%',
      '--accent-cyan': '200 100% 55%',
      '--accent-purple': '280 75% 65%',
      '--border': '240 10% 25%',
      '--primary-foreground': '240 15% 92%',
      '--muted-foreground': '240 10% 60%',
    },
  },
} as const

export type ThemeKey = keyof typeof THEMES

/**
 * Apply theme to the document
 */
export function applyTheme(themeKey: ThemeKey) {
  const theme = THEMES[themeKey]
  const root = document.documentElement

  Object.entries(theme.cssVariables).forEach(([variable, value]) => {
    root.style.setProperty(variable, value)
  })
}

/**
 * Get theme by key
 */
export function getTheme(themeKey: ThemeKey) {
  return THEMES[themeKey]
}

/**
 * Get all available themes
 */
export function getAllThemes() {
  return Object.entries(THEMES).map(([key, theme]) => ({
    key: key as ThemeKey,
    ...theme,
  }))
}
