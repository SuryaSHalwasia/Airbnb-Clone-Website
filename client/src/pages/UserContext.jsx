/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [ready,setReady] = useState(false)
    useEffect(() => {
        if(!user)
        {
            axios.get('/profile').then((data)=>{
            setUser(data.data)
            setReady(true)
            })
        }
    },[])
    return(
        <userContext.Provider value={{user,setUser,ready}}>
            {children}
        </userContext.Provider>
        
    )
}