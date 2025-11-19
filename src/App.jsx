import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import QuickAddForms from './components/QuickAddForms'
import RecentTables from './components/RecentTables'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-right">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <Header />

        <div className="mt-6 space-y-6">
          <SummaryCards />
          <QuickAddForms />
          <RecentTables />
        </div>
      </div>
    </div>
  )
}

export default App
