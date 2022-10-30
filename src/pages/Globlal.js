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

export const BasicPageLayout = () => {
    return <>
    </>
}

export const BottomSpace = styled.div`
    height: 10vh;
`

export const PageLoad = ()=>{
    return (
        <ThisLoad>
            <Loading />
        </ThisLoad>
    )
}
const ThisLoad = styled.div`
    height: 15vh;
    width: 15vh;
    border-radius: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #52B6FF;
    transform: translate(-50%,-50%);
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ThisCheckDelete = styled.div`
    height: 20vh;
    width: 30vh;
    border-radius: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #52B6FF;
    transform: translate(-50%,-50%);
    z-index: 12;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .question{
        text-align: center;
        color: white;
    }
    span{
        button{
            border: none;
            margin-inline: 8px;
            padding: 8px;
            border-radius: 8px;
        }
    }
`

export function SaveUser(user){
   if ( localStorage.length < 1 ){
    localStorage.setItem('user', JSON.stringify(user))
   } 
}