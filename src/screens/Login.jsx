import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const submitChange = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await resp.json();
        console.log(json)

        if (!json.success) {
            alert("wrong creditinals fields");
        }
        if (json.success) {
            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem('authToken', json.authtoken)
            navigate('/')
        }
    }
    return (
        <div className='container'>
            <form onSubmit={submitChange}>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to={'/signUp'} className="m-3 btn btn-danger"> I'm a new  user</Link>
            </form>
        </div>
    )
}