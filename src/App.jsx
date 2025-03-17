import { useEffect, useState } from 'react'
import Home from './components/home'
import { Route, Routes } from 'react-router-dom'
import Protected from './protected';
import UserPage from './components/userPage';
import Bills from './components/bills';
import Transactions from './components/transactions';
import AdminDashBoard from './components/admin/adminDashboard';
import AdminBills from './components/admin/billings';
import AdminTransactions from './components/admin/transactions';
import AllUsers from './components/admin/costumers';
import GenerateBill from './components/admin/generateBills';
import { useNavigate } from 'react-router-dom';
import Dues from './components/admin/dueBills';
import ProfileInfo from './components/profile';

function App() {
  const navigate=useNavigate();
  const [loggedIn, setLoggedIn]=useState(false);
  const [payedBills, setPayedBills]=useState([]);
  const [pendingBills, setPendingBills]=useState([]);
  const [users, setUsers]= useState({})
  const [dueBills, setDueBills]=useState([]);
  const [profile, setProfile]=useState({});

  useEffect(()=>{
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      setLoggedIn(true);
      if(localStorage.getItem('role')==='admin'){
        navigate('/admin')
      }
      else{
        navigate('user')
      }
    }
  },[])

  return (
    <Routes>
      <Route path='/' element={<Home setLoggedIn={setLoggedIn} setPayedBills={setPayedBills} setPendingBills={setPendingBills} setUsers={setUsers} setDueBills={setDueBills} setProfile={setProfile}/>}/>
      <Route element={<Protected loggedIn={loggedIn} setPayedBills={setPayedBills} setPendingBills={setPendingBills} setUsers={setUsers} setDueBills={setDueBills} setProfile={setProfile}/>}>
        <Route path='/user' element={<UserPage payedBills={payedBills} pendingBills={pendingBills}/>}/>
        <Route path='/user/bills' element={<Bills payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills}/>}/>
        <Route path='/user/my-profile' element={<ProfileInfo profile={profile}/>}/>
        <Route path='/user/transactions' element={<Transactions payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills}/>}/>
        <Route path='/admin' element={<AdminDashBoard payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills} users={users} />}/>
        <Route path='/admin/AllBills' element={<AdminBills payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills} users={users}/>}/>
        <Route path='/admin/transactions' element={<AdminTransactions payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills} users={users}/>}/>
        <Route path='/admin/AllCostumers' element={<AllUsers payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills} users={users}/>}/>
        <Route path='/admin/generateBills' element={<GenerateBill payedBills={payedBills} pendingBills={pendingBills} setPayedBills={setPayedBills} setPendingBills={setPendingBills} users={users}/>}/>
        <Route path='/admin/DueBills' element={<Dues dueBills={dueBills} setDueBills={setDueBills}/>}/>
      </Route>
    </Routes>
  )
}

export default App
