import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData,SetUserData] = useContext(AuthContext)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  },[])


  const handleLogin = (email, password) => {
  if (email === 'admin@me.com' && password === '123') {
    const adminData = { role: 'admin' };
    setUser(adminData.role);
    localStorage.setItem('loggedInUser', JSON.stringify(adminData));
    return;
  }

  if (userData && Array.isArray(userData)) {
    const employee = userData.find(e => e.email === email && e.password === password);
    if (employee) {
      const empData = { role: 'employee', data: employee };
      setUser(empData.role);
      setLoggedInUserData(employee);
      localStorage.setItem('loggedInUser', JSON.stringify(empData));
      return;
    }
  }

  alert("Invalid Credentials");
};




  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </>
  )
}

export default App