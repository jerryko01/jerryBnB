import { useContext, useState } from 'react'
import { UserContext } from "../UserContext.jsx"
import { Navigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import PlacesPage from "./PlacesPage.jsx"
import AccountNav from "../AccountNav.jsx"

const AccountPage = () => {
    const [redirect, setRedirect] = useState(false);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile"
    }


    async function logout() {
        await axios.post('https://jerrybnb-deploy-backend.onrender.com/logout')
        setRedirect("/")
        setUser(null)
    }

    if (!ready) {
        return "Loading..."
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === "places" ? (
                <PlacesPage />
            ) :
                (
                    <div>
                        <div className="mb-4 text-center">Logged in as: {user.name}, {user.email}</div>
                        <div className="w-20 mx-auto">
                            <button onClick={logout} className="primary">
                                Logout
                        </button>
                        </div>

                    </div>
                )}

        </div>
    )
}

export default AccountPage
