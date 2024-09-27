import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const sendRequestLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Login failed: ${errorData.message || response.statusText}`); 
      }

      const data = await response.json();
      setUser(data);
      alert('Login successful');
      setRedirect(true);
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; 
    }
  };

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <main className="mt-4 flex grow items-center justify-around">
        <section className="mb-64">
          <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
          <form className="max-w-sm mx-auto" onSubmit={sendRequestLogin}>
              <input 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <button className="login-btn">Login</button>
              <div className="text-center py-2 text-gray-500 text-sm">
                Don't have an account yet? <Link to="/sign-up" className="text-gray-950 font-semibold underline">Sign up now</Link>
              </div>
          </form>
        </section>
    </main>
  )
}

export default LoginPage