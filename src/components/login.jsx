import { useState } from "react";
// import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate= useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { username, password })
    .then((response)=>{
      if(response.data.status==='failure'){
        setError(response.data.error);
      }
      else if(response.data.status==='success'){
        setError('');
        if(response.data.type==='admin'){
          localStorage.setItem('username', 'Admin');
          localStorage.setItem('role', 'admin');
          localStorage.setItem('token', response.data.token);
          props.setPayedBills(response.data.payedBills);
          props.setPendingBills(response.data.pendingBills);
          props.setUsers(response.data.users);  
          props.setDueBills(response.data.dueBills);
          props.setProfile(response.data.profile);
          props.setLoggedIn(true);
          navigate('/admin');
        }
        else{
          localStorage.setItem('username', username);
          localStorage.setItem('role', 'user');
          localStorage.setItem('token', response.data.token);
          props.setPayedBills(response.data.payedBills);
          props.setPendingBills(response.data.pendingBills);
          props.setLoggedIn(true);
          navigate('/user');
        }
      }
      
    })
    .catch((error)=>{
      console.log(error.message)
    })
  };

  return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='form-button' type="submit">Login</button>
        </form>
      </div>
  );
}
