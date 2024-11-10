import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const { name, email, password } = credentials;
    const response = await fetch(
      `${host}/api/auth/createuser`,
      {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
        headers: myHeaders
      }
    )
    const jsonString = await response.json();
    console.log(jsonString);
    if (jsonString.success) {
      localStorage.setItem('token', jsonString.authToken);
      navigate('/');
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert(jsonString.error, "danger");
    }

  }
  return (
    <div>
      <div className="container my-3">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input className="form-control" id="name" name='name' aria-describedby="name" value={credentials.name} onChange={handleOnChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name='email' id="email" aria-describedby="email" value={credentials.email} onChange={handleOnChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input className="form-control" id="password" name='password' value={credentials.password} onChange={handleOnChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
