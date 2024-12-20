import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/loginpage/LoginPage'
import Dashboard from '../layouts/Dashboard'
import Employees from '../pages/adminpages/Employees'
import Designation from '../pages/adminpages/corehr/Designation'
import Department from '../pages/adminpages/corehr/Department'
import OrganizationChart from '../pages/adminpages/corehr/OrganizationChart'
import AttendanceOverView from '../pages/adminpages/attendance/AttendanceOverView'
import ManualAttendance from '../pages/adminpages/attendance/ManualAttendance'
import OvertimeRequest from '../pages/adminpages/attendance/OvertimeRequest'
import Finance from '../pages/adminpages/Finance'
import Tasks from '../pages/adminpages/Tasks'
import Projects from '../pages/adminpages/Projects'
import Leads from '../pages/adminpages/Leads'
import LeaveRequest from '../pages/adminpages/LeaveRequest'
import MainPage from '../pages/MainPage'
import ManageClinets from '../pages/adminpages/ManageClinets'
import Payroll from '../pages/adminpages/Payroll'
import EmplyoeeAttendance from '../pages/employeepages/EmplyoeeAttendance'
import EmplyoeeProjects from '../pages/employeepages/EmplyoeeProjects'
import EmployeeTasks from '../pages/employeepages/EmployeeTasks'
import ProfilePage from '../pages/ProfilePage'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<MainPage/>}/>
            <Route path='employees' element={<Employees/>}/>
            <Route path='core-hr/department' element={<Department/>}/>
            <Route path='core-hr/designation' element={<Designation/>}/>
            <Route path='core-hr/org-chart' element={<OrganizationChart/>}/>


            {/* <Route path='attendance/overview' element={<AttendanceOverView/>}/> */}
            <Route path='attendance/manual' element={<ManualAttendance/>}/>
            <Route path='attendance/overtime' element={<OvertimeRequest/>}/>


            <Route path='finance' element={<Finance/>}/>
            <Route path='tasks' element={<Tasks/>}/>
            <Route path='projects' element={<Projects/>}/>
            <Route path='leads' element={<Leads/>}/>
            <Route path='leaverequest' element={<LeaveRequest/>}/>
            <Route path='manageClinets' element={<ManageClinets/>}/>
            <Route path='payroll' element={<Payroll/>}/>


            <Route path='emplyoeeAttendance' element={<EmplyoeeAttendance/>}/>
            <Route path='emplyoeeProjects' element={<EmplyoeeProjects/>}/>
            <Route path='employeeTasks' element={<EmployeeTasks/>}/>
            <Route path='leaveRequest' element={<LeaveRequest/>}/>
            <Route path='profilePage' element={<ProfilePage/>}/>

            

            
            </Route>
            
        </Routes>
      
    </div>
  )
}

export default Routers
