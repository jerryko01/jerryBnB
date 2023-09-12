import { Link, Navigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function registerUser(ev) {
        ev.preventDefault();
        if (name === "" || email === "" || password === "") {
            alert('Please Fill in All the Information')
        } else {
            try {
                await axios.post('https://jerrybnb-deploy-backend.onrender.com/register', {
                    name, email, password
                })
                setRedirect(true);
                alert('Registration Successful')
            } catch (error) {
                alert("Registration Failed - Please Try Again Later")
            }
        }

    }
    if (redirect) {
        return <Navigate to={"/login"} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="Your Name" value={name} onChange={(ev) => setName(ev.target.value)} />
                    <input type="email" placeholder="your@email.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">Already Registered? <Link className="text-black underline" to={"/login"}>Log In</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage