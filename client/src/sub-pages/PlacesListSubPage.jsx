/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import PlaceImage from "./PlaceImage";

export default function PlacesListSubPage({action}){
    const [places, setPlaces] = useState([])
    useEffect(() => {
        if (action !== 'new') {
          axios.get('/places').then(({ data }) => {
            setPlaces(data);
          });
        }
      }, [action]);
    return(
        
        <div>
            {action !== 'new' && (
                <div>
    <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
Add new place </Link>
        </div>
        <div className="mt-4">
        {places.length > 0 &&
              places.map((place) => (
                <Link to ={"/account/places/new?id="+place._id}  className="bg-gray-100 cursor-pointer gap-4 p-4 flex rounded-2xl" key={place._id}> {/* Use 'place._id' as the key */}
                  <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <PlaceImage place={place} />
                  </div>
                  <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                </div>
                </Link>
              ))}
        </div>
        </div>

)}
        </div>
    )
}