import { useContext } from "react"
import styled from "styled-components"
import { apiURL, AuthContext } from "../components/Globlal"
import profile from "../assets/profile.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"



export default function HomePage (){
    const [user,] = useContext(AuthContext)
    const navigate = useNavigate()

    function Cancel(){
        const URL = apiURL + "subscriptions"
        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }
        const promise = axios.delete(URL, config)

        promise.then(()=>{
            alert("cancelado!")
            navigate("/subscriptions")
        })
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

    function DrawButtons(){
        return user.membership.perks.map((item)=>(
            <button
                key={item.id}
                onClick={()=>{openInNewTab(item.link)}}
            >{item.title}</button>
        ))
    }

    return (
        <HomeStyle>
            <div className="header">
                <img src={user.membership.image} alt="" />
                <img src={profile} alt="" />
            </div>
            <h2>Olá, {user.name}</h2>
            <div className="wrapper">
                <DrawButtons/>
            </div>
            <Footer>
                <button onClick={()=>{navigate("/subscriptions")}} className="change">Mudar plano</button>
                <button onClick={()=>{Cancel()}} className="cancel">Cancelar plano</button>
            </Footer>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #0E0E13;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header{
        width: 100%;
        height: 120px;
        padding-inline: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{
            height: 60px;
        }
    }

    h2{
       text-align: center;
    }

    .wrapper{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-top: 32px;

        button{
            border: none;
            background-color: #FF4791;
            padding: 16px;
            border-radius: 12px;
            font-size: 18px;
            margin-block: 4px;
            color: white;
            font-weight: 700;
        }
    }
`
const Footer = styled.div`
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
        width: 80%;
        border: none;
        padding: 16px;
        border-radius: 12px;
        font-size: 18px;
        margin-block: 4px;
        color: white;
        font-weight: 700;
    }
    .change{
        background-color: #FF4791;
    }
    .cancel{
        background-color: #FF4747;
        margin-bottom: 16px;
    }
    
`