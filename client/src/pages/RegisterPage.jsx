import { useState } from "react"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendRegistrationRequest = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Registration failed: ${errorData.message || response.statusText}`); 
      }
  
      const data = await response.json();
      alert('Registration successful. Now you can login')
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; 
    }
  };

  return (
    <main className="mt-4 flex grow items-center justify-around">
        <section className="mb-64">
          <h1 className="text-4xl text-center mb-4 font-semibold">Sign up</h1>
          <form className="max-w-sm mx-auto" onSubmit={sendRegistrationRequest}>
              <input 
                type="text" 
                placeholder="name" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <button className="login-btn">Sign up</button>
              <div className="text-center py-2 text-gray-500 text-sm">
                Already have an account? <Link to="/login" className="text-gray-950 font-semibold underline">Sign in</Link>
              </div>
          </form>
        </section>
    </main>
  )
}

export default RegisterPage