import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const ProfilePage = () => {
    const {user, setUser, setRedirect} = useContext(UserContext);

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


  return (
    <div className="text-center max-w-xs pt-10">
      Logged in as {user.name} ({user.email})<br />
      <button onClick={logout} className="bg-primary py-1 w-full mt-2 text-white rounded-2xl">Logout</button>
    </div>
  )
}

export default ProfilePage