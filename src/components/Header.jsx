import { useMemo } from 'react'

function Header() {
  const today = useMemo(() => new Date().toLocaleDateString('he-IL'), [])
  return (
    <header className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold text-white">מנהל עסק קטן</h1>
      </div>
      <div className="text-sm text-blue-200/80">{today}</div>
    </header>
  )
}

export default Header
