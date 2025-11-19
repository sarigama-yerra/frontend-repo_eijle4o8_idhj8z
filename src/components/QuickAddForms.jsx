import { useState } from 'react'

const currency = (n) => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(n || 0)

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300/90">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function QuickAddForms() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const [income, setIncome] = useState({ title: '', amount: '', date: new Date().toISOString().slice(0,10), note: '' })
  const [expense, setExpense] = useState({ title: '', amount: '', date: new Date().toISOString().slice(0,10), note: '' })
  const [item, setItem] = useState({ name: '', sku: '', quantity: 0, unit_cost: 0 })
  const [message, setMessage] = useState('')

  const postJson = async (path, body) => {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('Network error')
    return res.json()
  }

  const onAddIncome = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = { ...income, amount: parseFloat(income.amount) }
      await postJson('/api/incomes', payload)
      setMessage('הכנסה נוספה בהצלחה')
      setIncome({ title: '', amount: '', date: new Date().toISOString().slice(0,10), note: '' })
    } catch (e) {
      setMessage('אירעה שגיאה בהוספה')
    }
  }

  const onAddExpense = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = { ...expense, amount: parseFloat(expense.amount) }
      await postJson('/api/expenses', payload)
      setMessage('הוצאה נוספה בהצלחה')
      setExpense({ title: '', amount: '', date: new Date().toISOString().slice(0,10), note: '' })
    } catch (e) {
      setMessage('אירעה שגיאה בהוספה')
    }
  }

  const onAddItem = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = { ...item, quantity: Number(item.quantity), unit_cost: Number(item.unit_cost) }
      await postJson('/api/items', payload)
      setMessage('פריט נוסף בהצלחה')
      setItem({ name: '', sku: '', quantity: 0, unit_cost: 0 })
    } catch (e) {
      setMessage('אירעה שגיאה בהוספה')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <form onSubmit={onAddIncome} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">הוספת הכנסה</h3>
        <div className="space-y-3">
          <Field label="כותרת">
            <input value={income.title} onChange={e=>setIncome(v=>({...v,title:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="סכום">
            <input type="number" step="0.01" value={income.amount} onChange={e=>setIncome(v=>({...v,amount:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="תאריך">
            <input type="date" value={income.date} onChange={e=>setIncome(v=>({...v,date:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="הערה">
            <input value={income.note} onChange={e=>setIncome(v=>({...v,note:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
        </div>
        <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg">הוסף</button>
      </form>

      <form onSubmit={onAddExpense} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">הוספת הוצאה</h3>
        <div className="space-y-3">
          <Field label="כותרת">
            <input value={expense.title} onChange={e=>setExpense(v=>({...v,title:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="סכום">
            <input type="number" step="0.01" value={expense.amount} onChange={e=>setExpense(v=>({...v,amount:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="תאריך">
            <input type="date" value={expense.date} onChange={e=>setExpense(v=>({...v,date:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="הערה">
            <input value={expense.note} onChange={e=>setExpense(v=>({...v,note:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
        </div>
        <button className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg">הוסף</button>
      </form>

      <form onSubmit={onAddItem} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">הוספת פריט למלאי</h3>
        <div className="space-y-3">
          <Field label="שם פריט">
            <input value={item.name} onChange={e=>setItem(v=>({...v,name:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <Field label="SKU">
            <input value={item.sku} onChange={e=>setItem(v=>({...v,sku:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="כמות">
              <input type="number" value={item.quantity} onChange={e=>setItem(v=>({...v,quantity:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </Field>
            <Field label="עלות ליחידה">
              <input type="number" step="0.01" value={item.unit_cost} onChange={e=>setItem(v=>({...v,unit_cost:e.target.value}))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </Field>
          </div>
        </div>
        <button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg">הוסף</button>
      </form>

      {message && (
        <div className="lg:col-span-3 bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-slate-200 text-center">
          {message}
        </div>
      )}
    </div>
  )
}

export default QuickAddForms
