import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Protected(prop) {
  const navigate=useNavigate();
  const [isAunthenticated, setIsAuthenticated]=useState(null);
  useEffect(()=>{
    if(prop.loggedIn && localStorage.getItem('username') && localStorage.getItem('token')){
      axios.post("http://localhost:3000/authenticate", {username:localStorage.getItem('username'), role:localStorage.getItem('role')},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then((response)=>{
        if(response.data.status==='success'){
          prop.setPayedBills(response.data.payedBills);
          prop.setPendingBills(response.data.pendingBills);
          prop.setUsers(response.data.users);
          prop.setDueBills(response.data.dueBills);
          prop.setProfile(response.data.profile);
          setIsAuthenticated(true)
        }
        else navigate('/', {replace:true})
      })
      .catch((err)=>{
        console.log(err.message)
        navigate('/', {replace:true})
      })
    }
  },[prop.loggedIn, navigate, prop])

  if(isAunthenticated===null){
      return(
      <div className='enter-page'>
      </div>)
    }
    else{
      return isAunthenticated?<Outlet/>:null
    }
}

export default Protected