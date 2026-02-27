import { useState } from 'react'
import '../styles/MainContent.css'
import TransactionTable from './TransactionTable'

interface TransactionData {
  id: string
  timestamp: string
  medicineName: string
  medicineType: string
  batchId: string
  type: 'Check-in' | 'Check-out'
  quantity: number
  department: string
  pharmacist: string
  pharmacistInitials: string
  status: 'Completed' | 'Pending' | 'Cancelled'
}

const mockTransactions: TransactionData[] = [
  {
    id: '1',
    timestamp: 'Oct 24, 09:30 AM',
    medicineName: 'Amoxicillin 500mg',
    medicineType: 'Antibiotic',
    batchId: 'BATCH-892',
    type: 'Check-in',
    quantity: 500,
    department: 'Main Pharmacy',
    pharmacist: 'Sarah Jenkins',
    pharmacistInitials: 'SJ',
    status: 'Completed',
  },
  {
    id: '2',
    timestamp: 'Oct 24, 10:15 AM',
    medicineName: 'Ibuprofen 200mg',
    medicineType: 'Analgesic',
    batchId: 'BATCH-110',
    type: 'Check-out',
    quantity: -50,
    department: 'Pediatrics',
    pharmacist: 'Mike Ross',
    pharmacistInitials: 'MR',
    status: 'Completed',
  },
  {
    id: '3',
    timestamp: 'Oct 24, 11:00 AM',
    medicineName: 'Paracetamol 1g',
    medicineType: 'Analgesic',
    batchId: 'BATCH-334',
    type: 'Check-out',
    quantity: -20,
    department: 'Emergency',
    pharmacist: 'Sarah Jenkins',
    pharmacistInitials: 'SJ',
    status: 'Pending',
  },
  {
    id: '4',
    timestamp: 'Oct 23, 02:45 PM',
    medicineName: 'Metformin 500mg',
    medicineType: 'Antidiabetic',
    batchId: 'BATCH-991',
    type: 'Check-in',
    quantity: 200,
    department: 'Main Pharmacy',
    pharmacist: 'John Doe',
    pharmacistInitials: 'JD',
    status: 'Completed',
  },
  {
    id: '5',
    timestamp: 'Oct 23, 04:15 PM',
    medicineName: 'Atorvastatin 20mg',
    medicineType: 'Statin',
    batchId: 'BATCH-775',
    type: 'Check-out',
    quantity: -15,
    department: 'Geriatrics',
    pharmacist: 'Sarah Jenkins',
    pharmacistInitials: 'SJ',
    status: 'Completed',
  },
  {
    id: '6',
    timestamp: 'Oct 22, 11:20 AM',
    medicineName: 'Amlodipine 5mg',
    medicineType: 'Calcium Channel Blocker',
    batchId: 'BATCH-556',
    type: 'Check-out',
    quantity: -10,
    department: 'Outpatient',
    pharmacist: 'Mike Ross',
    pharmacistInitials: 'MR',
    status: 'Cancelled',
  },
]

export default function MainContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.batchId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || tx.type === selectedType
    const matchesDept = selectedDepartment === 'all' || tx.department === selectedDepartment
    return matchesSearch && matchesType && matchesDept
  })

  return (
    <main className="main-content">
      <header className="content-header">
        <div className="header-title-group">
          <h1 className="page-title">Transaction History</h1>
          <p className="page-subtitle">Manage and track all inventory movements across departments.</p>
        </div>
        <button className="btn-export">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.66667 10L2.5 5.83333L3.66667 4.625L5.83333 6.79167V0H7.5V6.79167L9.66667 4.625L10.8333 5.83333L6.66667 10ZM1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V9.16667H1.66667V11.6667H11.6667V9.16667H13.3333V11.6667C13.3333 12.125 13.1701 12.5174 12.8438 12.8438C12.5174 13.1701 12.125 13.3333 11.6667 13.3333H1.66667Z" fill="white"/>
          </svg>
          Export CSV
        </button>
      </header>

      <div className="filters-section">
        <div className="date-range-input">
          <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
            <path d="M1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V3.33333C0 2.875 0.163194 2.48264 0.489583 2.15625C0.815972 1.82986 1.20833 1.66667 1.66667 1.66667H2.5V0H4.16667V1.66667H10.8333V0H12.5V1.66667H13.3333C13.7917 1.66667 14.184 1.82986 14.5104 2.15625C14.8368 2.48264 15 2.875 15 3.33333V15C15 15.4583 14.8368 15.8507 14.5104 16.1771C14.184 16.5035 13.7917 16.6667 13.3333 16.6667H1.66667ZM1.66667 15H13.3333V6.66667H1.66667V15ZM1.66667 5H13.3333V3.33333H1.66667V5ZM1.66667 5V3.33333V5Z" fill="#64748B"/>
          </svg>
          <input
            type="text"
            placeholder="Oct 1, 2023 - Oct 31, 2023"
            className="date-input"
            readOnly
          />
        </div>

        <div className="search-input">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M13.8333 15L8.58333 9.75C8.16667 10.0833 7.6875 10.3472 7.14583 10.5417C6.60417 10.7361 6.02778 10.8333 5.41667 10.8333C3.90278 10.8333 2.62153 10.309 1.57292 9.26042C0.524305 8.21181 0 6.93056 0 5.41667C0 3.90278 0.524305 2.62153 1.57292 1.57292C2.62153 0.524305 3.90278 0 5.41667 0C6.93056 0 8.21181 0.524305 9.26042 1.57292C10.309 2.62153 10.8333 3.90278 10.8333 5.41667C10.8333 6.02778 10.7361 6.60417 10.5417 7.14583C10.3472 7.6875 10.0833 8.16667 9.75 8.58333L15 13.8333L13.8333 15ZM5.41667 9.16667C6.45833 9.16667 7.34375 8.80208 8.07292 8.07292C8.80208 7.34375 9.16667 6.45833 9.16667 5.41667C9.16667 4.375 8.80208 3.48958 8.07292 2.76042C7.34375 2.03125 6.45833 1.66667 5.41667 1.66667C4.375 1.66667 3.48958 2.03125 2.76042 2.76042C2.03125 3.48958 1.66667 4.375 1.66667 5.41667C1.66667 6.45833 2.03125 7.34375 2.76042 8.07292C3.48958 8.80208 4.375 9.16667 5.41667 9.16667Z" fill="#64748B"/>
          </svg>
          <input
            type="text"
            placeholder="Search by medicine name, batch ID..."
            className="search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="filter-dropdown" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Check-in">Check-in</option>
          <option value="Check-out">Check-out</option>
        </select>

        <select className="filter-dropdown" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="all">All Departments</option>
          <option value="Main Pharmacy">Main Pharmacy</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Emergency">Emergency</option>
          <option value="Geriatrics">Geriatrics</option>
          <option value="Outpatient">Outpatient</option>
        </select>

        <button className="btn-more-filters">
          <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
            <path d="M5.83333 10V8.33333H9.16667V10H5.83333ZM2.5 5.83333V4.16667H12.5V5.83333H2.5ZM0 1.66667V0H15V1.66667H0Z" fill="#64748B"/>
          </svg>
        </button>
      </div>

      <TransactionTable transactions={filteredTransactions} />
    </main>
  )
}
