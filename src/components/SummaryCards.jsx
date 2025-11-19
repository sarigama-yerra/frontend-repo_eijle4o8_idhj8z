import { useEffect, useState } from 'react'

const currency = (n) => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(n || 0)

function Stat({ label, value, accent }) {
  return (
    <div className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
      <p className="text-sm text-slate-300/80 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${accent}`}>{currency(value)}</p>
    </div>
  )
}

function SummaryCards() {
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, inventory_value: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/summary`)
        const data = await res.json()
        setSummary(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Stat label={'סה"כ הכנסות'} value={summary.total_income} accent="text-emerald-400" />
      <Stat label={'סה"כ הוצאות'} value={summary.total_expense} accent="text-rose-400" />
      <Stat label="שווי מלאי" value={summary.inventory_value} accent="text-amber-400" />
    </div>
  )
}

export default SummaryCards
