import { Link } from "react-router-dom";

function LogInPage() {
    return (
        <div className="mt-32 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-center text-4xl mb-4">Login</h1>
                <form className="max-w-md mx-auto" >
                    <input type="email" placeholder={"your@email.com"} />
                    <input type="password" placeholder="Password" />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        <span>Don't have an account yet?  </span>
                        <Link className="underline text-black" to={"/register"}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default LogInPage;