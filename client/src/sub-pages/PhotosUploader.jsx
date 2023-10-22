/* eslint-disable react/prop-types */

import axios from 'axios'
import { useState} from "react";
export default function PhotosUploader({addedPhotos, onChange}){
    const [photoLink, setPhotoLink] = useState('')
    
    const [showImage, setShowImage] = useState(false);
  
    async function addPhotoByLink(ev){
        setShowImage(false)
        ev.preventDefault()
        const {data:imageName} = await axios.post('/upload-by-link', {link:photoLink})
        onChange(prev=>{
            return [...prev, imageName]
        })
        setPhotoLink('')
        setTimeout(() => {
            setShowImage(true);
        }, 500);
        
    }

    async function uploadPhoto(ev){
        
        setShowImage(false)
        ev.preventDefault()
        const files = ev.target.files
        const data_photos = new FormData()
        for(let i = 0; i<files.length; i++)
        {
            data_photos.append('photos', files[i])
        }
        const {data:imageName} = await axios.post('/upload', data_photos, {
            headers: {"Content-Type":"multipart/form-data"}
        })
        {console.log({imageName})}
        onChange(prev=>{
            return [...prev, imageName]
        })
        setPhotoLink('')
        
        setTimeout(() => {
            setShowImage(true);
        }, 500);

    }

    function removePhoto(ev, link){
        ev.preventDefault()
        onChange([...addedPhotos.filter(photo => 
            photo != link)])
    }

    function selectAsMainPhoto(ev, link){
        ev.preventDefault()
        const addedPhotosWithoutSelected = addedPhotos.filter(photo => 
            photo != link)
        const newAddedPhotos = [link, addedPhotosWithoutSelected]
        onChange(newAddedPhotos)
    }
    return(
        <>
        <div className="flex gap-2">
                    <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder={'Insert using url of image'}/>
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                </div>
                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link=>(
                    
                    <div className="h-32 flex relative " key={link}>
                        {showImage && (
                            <div>
                         <img className="rounded-2xl w-full object-cover" src={link} alt="" /> 
                         <button onClick={ev => removePhoto(ev, link)} className=' cursor-pointer absolute top-1 right-1 rounded-2xl text-white bg-black py-2 px-3 bg-opacity-60'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>
<button onClick={ev => selectAsMainPhoto(ev, link)} className=' cursor-pointer absolute top-1 left-1 rounded-2xl text-white bg-black py-2 px-3 bg-opacity-60'>
{link === addedPhotos[0] && (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
  
)}
{link !== addedPhotos[0] && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>)}

</button>
                         </div>)
                                        } 
                         </div> 
                        
))}
                    <label className="flex h-32 cursor-pointer items-center border justify-center gap-1 bg-transparent rounded-2xl p-2 bg-center">
                        
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>
</label>
</div>
</>
    )
}