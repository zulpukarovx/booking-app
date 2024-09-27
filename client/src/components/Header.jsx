import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Header = () => {

    const {user} = useContext(UserContext);

  return (
    <header className="flex justify-between">
        <Link to="/" className="logo font-poppins flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
            <span className="leading-none">jer tam<br></br>BOOKING</span>
        </Link>
        {
            user ? (
                <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 transition-all 
                hover:shadow-md shadow-gray-300 ease-in-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <Link to="/account" className="flex gap-2">
                        <div className="bg-gray-400 text-white rounded-full border
                        border-gray-400 overflow-hidden cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            {user.name}
                        </div>
                    </Link>
                </div>
            ) : (<Link className="font-semibold underline" to="/login">Sign-in</Link>)
        }
    </header>
  )
}

export default Header