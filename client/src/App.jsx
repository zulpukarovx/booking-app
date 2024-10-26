import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import { AccountLayout } from "./Layouts/AccountLayout";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyAccomodationsPage from "./pages/MyAccomodationsPage";
import AddNewHotels from "./pages/AddNewHotels";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<RegisterPage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<ProfilePage />}/>
            <Route path="bookings" element={<MyBookingsPage />}/>
            <Route path="places" element={<MyAccomodationsPage />}/>
            <Route path="places/add-new-hotels" element={<AddNewHotels />}/>
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
