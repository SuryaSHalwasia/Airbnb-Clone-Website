
import {Link} from 'react-router-dom'
import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() =>{
        axios.get("/allplaces").then(response => {
            setPlaces([...response.data,...response.data,...response.data,...response.data])
        })
    },[])
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
         {places.length>0 && places.map(place =>(
            <Link to={'/place/'+place._id} key={place}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.addedPhotos?.[0] && (
                    <img className = "aspect-square rounded-2xl object-cover" src={place.addedPhotos[0]} alt="" />
                )}
                </div>
                <h3 className="font-bold leading-">{place.address}</h3>
                <h2 className="text-sm leading-3 text-gray-500">{place.title}</h2>
                <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
         ))}
      </div>
    );
}