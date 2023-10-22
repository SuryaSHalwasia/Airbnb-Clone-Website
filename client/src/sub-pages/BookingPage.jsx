/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from 'axios'
import { Navigate } from "react-router-dom"
import { userContext } from "../pages/UserContext"
export default function BookingPage({place}){
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(2)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')
    
    const {user} = useContext(userContext)
    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])
    useContext(userContext)
    let numberOfDays = 0
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
        if(numberOfDays < 0)
            alert('Please put valid dates')
        setCheckIn('')
        setCheckOut('')        
    }

    async function bookPlace() {
        const data = {checkIn, checkOut, numberOfGuests, name, mobile, 
            place:place._id, price:numberOfDays*place.price}
        if(checkIn === '' || checkOut === '' || numberOfGuests === '' || name === '' || mobile === '')
        {
            alert("Please provided all values. Incomplete fields")
            return
        }
            
        const response = await axios.post("/booking", data)
        const bookingID = response.data._id
        setRedirect(`/account/bookings/${bookingID}`)

    }

    if(redirect){
        return <Navigate to={redirect} />
    }
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                Price: ${place.price}/night
                </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                <div className="py-3 px-4">
                <label>Check in:</label>
                <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div className="py-3 px-4 border-l">
                <label>Check out:</label>
                <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
            </div>
                </div>
            <div className="py-3 px-4 border-t">
                <label>Number of guests:</label>
                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} /></div>
            </div>
            {numberOfDays > 0 && (
                <div className="py-3 px-4 border-t">
                <label>Your full name:</label>
                <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                <label>Your phone number:</label>
                <input type="tel" value={mobile} onChange={ev => setMobile(ev.target.value)} />
            </div>
            
            
            )}
            <button onClick={bookPlace} className="primary mt-4">Book this place
            {numberOfDays > 0 && (
                <>
                <span> ${numberOfDays * place.price}</span></>
            )}</button>
            
        </div>
    )
}