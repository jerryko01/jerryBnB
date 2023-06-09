import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    async function registerUser(ev) {
        try {
            if (password === passwordConfirm) {
                ev.preventDefault()
                await axios.post('/register', {
                    name, email, password
                });
                alert('Registration Successful');
            } else {
                ev.preventDefault()
                alert("Please check if you password matches the password confirmation")
            }
        } catch (e) {
            alert("Registration failed. Please try again later.")
            console.log(e);
        }

    }
    return (
        <div className="mt-32 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-center text-4xl mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <input type="password" placeholder="Confirm your Password"
                        value={passwordConfirm}
                        onChange={ev => setPasswordConfirm(ev.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        <span>Already a Member?  </span>
                        <Link className="underline text-black" to={"/login"}>Log in</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default RegisterPage;