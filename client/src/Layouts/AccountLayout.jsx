import { NavLink, Outlet } from "react-router-dom"

export const AccountLayout = () => {
  const activeLink = 'bg-primary text-white rounded-2xl'


  return (
    <div>
      <nav className="w-full flex mt-8 gap-2">
        <NavLink 
            to='.'
            end
            className={({ isActive }) => 
                `py-1 px-5 ${isActive ? activeLink : ''}`
            }>My profile</NavLink>
        <NavLink 
            to='bookings'
            className={({ isActive }) => 
                `py-1 px-5 ${isActive ? activeLink : ''}`
            }>My bookings</NavLink>
        <NavLink 
            to='places'
            className={({isActive}) => `py-1 px-5 ${isActive ? activeLink : ''}`
            }>My accomodations</NavLink>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  )
}
