import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { apiURL, AuthContext } from "./Globlal"



export default function SubDetailPage (){
    const {subID} = useParams()
    const [details, setDetails] = useState("")
    const [user,] = useContext(AuthContext)

    useEffect(()=>{

        const URL = apiURL + "subscriptions/memberships/" + subID

        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }

        const promise = axios.get(URL, config)

        promise.then((a)=>{
            setDetails(a.data)
        })
        promise.catch(()=>{
            
        })
    },[])

    return (
        <SubDetailStyle>

        </SubDetailStyle>
    )
}

const SubDetailStyle = styled.div`
    
`