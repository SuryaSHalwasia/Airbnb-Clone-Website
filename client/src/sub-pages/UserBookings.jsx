import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { differenceInCalendarDays, format } from 'date-fns'
export default function UserBookings() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]); // Add id as a dependency for useEffect

  const [showAllPhotos, setShowAllPhotos] = useState(false)
    
    if(showAllPhotos)
        return(
            <div className="absolute bg-black text-white inset-0 min-h-screen">
                <div className=" bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {booking.place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false) } className="fixed right-2 top-10 flex h-7 gap-1 py- px-4 rounded-lg shadow bg-white text-black shadow-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                        Close Photos</button>
                    </div>
                {booking.place?.addedPhotos?.length >0 && booking.place.addedPhotos.map(photo=>(
                    <div key={photo}>
                        <img className="center" src={photo} alt="" />
                        </div>
                )
                )}
                </div>
                </div>
            )
  // Render the title conditionally
  return (
    <div>
      {booking ? (
        <>
        <div className="my-8">
        <h2 className="text-3xl mr-48">Photos of {booking.place.title}</h2>
        <a className="flex gap-1 my-3 my-2 block font-semibold underline" target="_blank" href={`https://maps.google.com?q=${booking.place.address}`} rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
{booking.place.address}</a>

<div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex" >
    <div>
        
    <h2 className="text-xl font-bold mb-4">Your booking information</h2>
    <div className="flex gap-1 mb-2 mt-2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>

                            {differenceInCalendarDays(new Date(booking.checkOut), 
                            new Date(booking.checkIn))} nights:
                            <div className="flex gap-1 items-center ml-2 justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>
{format(new Date(booking.checkIn),'yyyy-MM-dd')}</div> &rarr; 
<div className="flex gap-1 items-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>
{format(new Date(booking.checkOut),'yyyy-MM-dd')}</div>
                     
                            </div>
                            
  
</div> 

<div className="bg-primary p-6 text-white rounded-2xl ml-auto">
    <div>Total Price</div>
    <div className="text-3xl">${booking.price}</div>
</div>
</div>
</div>
<div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
                {booking.place.addedPhotos?.[0] && (
                    <div>
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={booking.place.addedPhotos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="grid">{booking.place.addedPhotos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={booking.place.addedPhotos[1]} alt="" />
                )}
                <div className="border overflow-hidden">{booking.place.addedPhotos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={booking.place.addedPhotos[2]} alt="" />
                )}</div></div>
        </div>
        
        </div>
        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute top-13  right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
Show more photos</button>

</>

    
      ) : null}
    </div>
  );
}
