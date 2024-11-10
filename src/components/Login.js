import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `${host}/api/auth/login`,
      {
        method: "POST",
        body:
          JSON.stringify({ email: credentials.email, password: credentials.password }),
        headers: myHeaders
      }
    );
    console.log(credentials.email);
    console.log(credentials.password);
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert(json.error, "danger");
    }
  }
  return (
    <div>
      <h2>Login to continue to iNotebook</h2>
      <div className="container my-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" value='email'>Email</label>
            <input type="email" className="form-control" name='email' value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} id="password" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
