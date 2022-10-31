import { ThreeDots } from "react-loader-spinner"
import { createContext, useState } from 'react';
import styled from "styled-components";

export const AuthContext = createContext([false, () => {}])

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(false)

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const antiServerBugList = ["white", "#FFF16F", "#56D59F"]

export const apiURL = "https://mock-api.driven.com.br/api/v4/driven-plus/"

export const Loading = (props) => {
    return <ThreeDots
        height={props.height} //24 
        width={props.width} //50
        radius={props.radius} //9
        color="#FFFFFF" 
        ariaLabel="three-dots-loading"
        visible={true}
    />
}

export const PageLoad = ()=>{
    return (
        <ThisLoad>
            <Loading />
        </ThisLoad>
    )
}
const ThisLoad = styled.div`
    height: 100vh;
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0E0E13;
`

export function SaveUser(user){
   if ( localStorage.length < 1 ){
    localStorage.setItem('user', JSON.stringify(user))
   } 
}

