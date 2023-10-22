/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Features from "./FeaturesSubPage";
import axios from 'axios'
import PhotosUploader from "./PhotosUploader";
import PlacesListSubPage from "./PlacesListSubPage";


export default function PlacesSubPage(){
    const {action} = useParams()
    //const idValue = id ? id.id : null;

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')

    const [description, setDescription] = useState('')
    
    const [features, setFeatures] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    
    const[checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    
    const [addedPhotos, setAddedPhots] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [price, setPrice] = useState(200)
    useEffect(()=>{
        if(id!==null)
        {
            axios.get('/places/'+id).then(response=>{
                const {data} = response
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhots(data.addedPhotos)
                setDescription(data.description)
                setFeatures(data.features)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            })
        }

    },[id])
    
    
    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            
            </>
        ) 
    }

    async function savePlace(ev){
        ev.preventDefault()

        const placeData = {title, address, addedPhotos, description, features, 
            extraInfo, checkIn, checkOut, maxGuests, price}
        if(!id)
            await axios.post('/places',placeData)
        else
        {
            await axios.put('/places',{id, ...placeData})
        }
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to ={'/account'} />
        
    }
    
    return (
        <div>
        
        <PlacesListSubPage action={action}/>
    {action === 'new' && (
        <div>
            
            
            <form onSubmit={savePlace}>
                {preInput('Title',"Title for your accommodations. This will be displayed in the listings.")}
                
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title: My forest cabin"/>
                {preInput('Address','Address of the accommodation.')}

                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address"/>
                
                {preInput('Photos','Tip: This is the main selling point of the accommodation. Please provide clear and attractive photographs.')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhots}/>
{preInput('Description', 'Please describe the place.')}
<textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>            
{preInput('Features','Select all the features that apply' )}    
<Features selected={features} onChange={setFeatures}/>
{preInput('Extra Information','House rules')}
                <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
{preInput('Check-in Check-out time','Please provide enough time between to ensure housekeeping.')}
<div className="grid gap-2 grid-cols-2 md:grid-cols-4">
<div>
    <h3 className="mt-2 -mb-1">Check-in time</h3>
    <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="12:00"/></div>
<div>
    <h3 className="mt-2 -mb-1">Check-out time</h3>
    <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="10:00"/></div>
<div>
    <h3 className="mt-2 -mb-1">Max number of guests</h3>
    <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} placeholder="2"/></div>
    <div>
    <h3 className="mt-2 -mb-1">Price per night (in dollars)</h3>
    <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)} placeholder="$100"/></div>

</div>

<div>
    <button className="primary my-4">Save</button> 
</div>
            </form>
            </div>
    )}
    </div>
)}