/* eslint-disable no-unused-vars */
import {Route,Routes} from "react-router-dom"
import './App.css'
import Layout from "./Layout"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

import axios from "axios"
import { UserContextProvider } from "./pages/UserContext"
import AccountPage from "./pages/AccountPage"
import PlacesSubPage from "./sub-pages/PlacesSubPage"
import SinglePlacePage from "./pages/SinglePlacePage"
import AllBookingsPage from "./sub-pages/AllBookingsPage"
import BookingPage from "./sub-pages/BookingPage"
import UserBookings from "./sub-pages/UserBookings"
axios.defaults.baseURL = "http://127.0.0.1:4000"
axios.defaults.withCredentials = true
function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        
        <Route path="/account/:subpage?" element={<AccountPage />}/>
        
        <Route path="/account/:subpage/:action" element={<AccountPage />}/>
        <Route path="/place/:id" element={<SinglePlacePage />} />
        <Route path="/account/bookings/:id" element={<UserBookings/>}/> 
      </Route>
        
        
        
    </Routes>

    </UserContextProvider>
    
  )
   
}

export default App
