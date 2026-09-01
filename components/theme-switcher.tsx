'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const THEMES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'autumn', label: 'Autumn' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'forest', label: 'Forest' },
  { id: 'neon', label: 'Neon' },
  { id: 'contrast', label: 'Contrast' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'candy', label: 'Candy' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

const DEFAULT_THEME: ThemeId = 'autumn'
const STORAGE_KEY = 'theme'

export function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME
    return (localStorage.getItem(STORAGE_KEY) as ThemeId) ?? DEFAULT_THEME
  })

  function setTheme(next: ThemeId) {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          data-theme={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            'flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted',
            theme === t.id
              ? 'border-primary ring-1 ring-primary'
              : 'border-border'
          )}
        >
          <span className="flex -space-x-1">
            <span className="size-3.5 rounded-full border border-border bg-background" />
            <span className="size-3.5 rounded-full border border-border bg-primary" />
          </span>
          <span className="flex-1">{t.label}</span>
          {theme === t.id && <Check className="size-3.5 text-primary" />}
        </button>
      ))}
    </div>
  )
}
