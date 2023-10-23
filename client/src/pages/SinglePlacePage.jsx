import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingPage from "../sub-pages/BookingPage"

export default function PlacePage(){
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    useEffect(()=>{
        if(!id)
            return
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data) 
        })
    },[id])

    if(!place)
        return 'Loading...'

    if(showAllPhotos)
        return(
            <div className="absolute bg-black text-white inset-0 min-h-screen">
                <div className=" bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false) } className="fixed right-2 top-10 flex h-7 gap-1 py- px-4 rounded-lg shadow bg-white text-black shadow-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                        Close Photos</button>
                    </div>
                {place?.addedPhotos?.length >0 && place.addedPhotos.map(photo=>(
                    <div key={photo}>
                        <img className="center" src={photo} alt="" />
                        </div>
                )
                )}
                </div>
                </div>
            )
    return(
        <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8"><h1 className="text-3xl">{place.title}</h1>
        <a className="flex gap-1 my-3 my-2 block font-semibold underline" target="_blank" href={`https://maps.google.com?q=${place.address}`} rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

{place.address}</a>
        <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
                {place.addedPhotos?.[0] && (
                    <div>
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={place.addedPhotos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="grid">{place.addedPhotos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={place.addedPhotos[1]} alt="" />
                )}
                <div className="border overflow-hidden">{place.addedPhotos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={place.addedPhotos[2]} alt="" />
                )}</div></div>
        </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute  right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
Show more photos</button>
<div className="grid mt-11 mb-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
        <div className="my-4">
    <h2 className="font-semibold text-2xl">Description</h2>{place.description}</div>
    <b>Check-In:</b>  {place.checkIn}PM<br/>
        <b>Check-Out:</b>  {place.checkOut}AM <br/>
        Max. number of guests: {place.maxGuests}
        </div>
        
        <div>
            <BookingPage place={place} />
    </div>
    
    </div>
    {place.extraInfo && (<div className="bg-white -mx-8 ox-8 py-9 border-t">
    <div>
        <h2 className="font-semibold text-2xl">Extra Information</h2>
    </div>
    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5 my-4">{place.extraInfo}</div>
        
    </div>)}
    
    
        </div>
    
    
    )
}