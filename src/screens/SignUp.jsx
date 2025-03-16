import { useState } from 'react'
import { Link } from 'react-router-dom'

export function SignUp() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const submitChange = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:5000/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        });
        const json = await resp.json();
        console.log(json)

        if (!json.success) {
            alert("mising required fields");
        }
    }
    return (
        <div className='container'>
            <form onSubmit={submitChange}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" name='name' value={credentials.name} onChange={onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" className="form-control" placeholder="Enter Address" name='location' value={credentials.location} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to={'/login'} className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
    )
}