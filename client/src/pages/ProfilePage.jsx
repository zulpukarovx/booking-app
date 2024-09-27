import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const {user, setUser, ready} = useContext(UserContext);

    const logout = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/logout', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Login failed: ${errorData.message || response.statusText}`); 
        }

        const data = await response.json();
        setRedirect('/');
        setUser(null);
        alert('Logout successful');
        return data;
      } catch (error) {
        console.error('Error during registration:', error);
        throw error; 
      }
    };
    
    if(!ready) {
      return "Loading...";
    }
    
    if(ready && !user && !redirect) {
      return <Navigate to={'/login'} />;
    }
    
    if(redirect) {
      <Navigate to={redirect} />;
    }

  return (
    <div className="text-center mx-auto max-w-xs pt-10">
      Logged in as {user.name} ({user.email})<br />
      <button onClick={logout} className="bg-primary py-1 w-full mt-2 text-white rounded-2xl">Logout</button>
    </div>
  )
}

export default ProfilePage