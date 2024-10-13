import { MobileBar, Sidebar } from '@/components'
import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { UsersPage } from './Users'
import { Patients } from './patients'
import { MyTreatment, PatientTreatment } from './Treatments'
import { SearchDoctors } from './Doctors'
import { MyFolder } from './MyFolder'
import Calendar from './Calendar/Calendar'
import { DocumentIA } from './IA'

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar />

      <MobileBar />

      <Container>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path='/treatments' element={<MyTreatment />} />
          <Route path='/doctors' element={<SearchDoctors />} />
          <Route path='/patient/:id' element={<PatientTreatment />} />
          <Route path="/folder" element={<MyFolder />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/ia" element={<DocumentIA />} />
        </Routes>
      </Container>
    </div>
  )
}

export default Home
