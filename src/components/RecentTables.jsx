import { useEffect, useState } from 'react'

const currency = (n) => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(n || 0)

function Section({ title, children }) {
  return (
    <section className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      {children}
    </section>
  )
}

function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left rtl:text-right">
        <thead>
          <tr className="text-slate-300 text-sm">
            {columns.map((c) => (
              <th key={c.key} className="py-2 px-2">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-200/90">
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-slate-700/50">
              {columns.map((c) => (
                <td key={c.key} className="py-2 px-2">
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RecentTables() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [items, setItems] = useState([])

  const loadAll = async () => {
    try {
      const [ri, re, it] = await Promise.all([
        fetch(`${baseUrl}/api/incomes`).then(r=>r.json()),
        fetch(`${baseUrl}/api/expenses`).then(r=>r.json()),
        fetch(`${baseUrl}/api/items`).then(r=>r.json()),
      ])
      setIncomes(ri)
      setExpenses(re)
      setItems(it)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Section title="הכנסות אחרונות">
        <Table
          columns={[
            { key: 'date', label: 'תאריך' },
            { key: 'title', label: 'כותרת' },
            { key: 'amount', label: 'סכום', render: v => currency(v) },
          ]}
          data={incomes}
        />
      </Section>

      <Section title="הוצאות אחרונות">
        <Table
          columns={[
            { key: 'date', label: 'תאריך' },
            { key: 'title', label: 'כותרת' },
            { key: 'amount', label: 'סכום', render: v => currency(v) },
          ]}
          data={expenses}
        />
      </Section>

      <Section title="מלאי">
        <Table
          columns={[
            { key: 'name', label: 'שם' },
            { key: 'sku', label: 'SKU' },
            { key: 'quantity', label: 'כמות' },
            { key: 'unit_cost', label: 'עלות ליחידה', render: v => currency(v) },
          ]}
          data={items}
        />
      </Section>
    </div>
  )
}

export default RecentTables
