import { useState } from 'react'
import '../styles/TransactionHistory.css'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

export default function TransactionHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="transaction-history-container">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <MainContent />
    </div>
  )
}
