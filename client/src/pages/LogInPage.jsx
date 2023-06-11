import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            axios.post('/login', { email, password });
            alert('Login Successful')
        } catch (e) {
            alert("Login Failed")
        }
    }
    return (
        <div className="mt-32">
            <h1 className="text-4xl text-center">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" onChange={ev => setEmail(ev.target.value)} value={email} />
                <input type="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)} value={password} />
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    <span>Aready a Member? </span>
                    <Link className="underline text-black" to={"/register"}>Regsiter</Link>
                </div>
            </form>
        </div>
    )
}

export default LogInPage;