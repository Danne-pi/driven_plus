import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { antiServerBugList, apiURL, AuthContext, PageLoad } from "../components/Globlal"
import { ReactComponent as Logo } from '../assets/logo.svg';
import plus from "../assets/Plus.svg"
import back from "../assets/back.svg"
import price from "../assets/price.svg"
import benef from "../assets/benef.svg"
import { CreditCardForm } from "../components/CardForm"



export default function SubDetailPage (){
    const navigate = useNavigate()
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
            console.log(a.data)
        })
        promise.catch(()=>{
            
        })
    },[])

    function ListBenefits(){
        return details.perks.map((item, index)=>(
            <a
            href={item.link}
            target="_blank"
            >{(index+1)+". "+item.title}</a>
        ))
    }

    if(details === ""){
        return <PageLoad />
    }return (
        <SubDetailStyle>
            <Backbutton
                onClick={()=>{navigate(-1)}}
            >
                <img src={back} alt="" />
            </Backbutton>
            <div>
                <Logo fill={antiServerBugList[subID -1]}/>
                <img src={plus} alt=""/>
            </div>
            <h1>{details.name}</h1>
            <div className="info">
                <span>
                    <img src={benef} alt=""/>
                    <h4>Benefícios:</h4>
                </span>
                <ListBenefits />
                <span>
                    <img src={price} alt=""/>
                    <h4>Preço</h4>
                </span>
                <h5 className="price">R${details.price} cobrados mensalmente</h5>
            </div>
            <CreditCardForm thisID={subID} title={details.name} price={details.price}/>            
        </SubDetailStyle>
    )
}

const SubDetailStyle = styled.div`
    color: white;
    width: 100vw;
    height: 100vh;
    background-color: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        margin-top: 12px;
        margin-bottom: 24px;
    }
    
    .info{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        
        a{  color: white;
            text-decoration: none;
            font-weight: 300;
            font-size: 14px;
        }

        span{
            margin-bottom: 4px;
            margin-top: 12px;
            display: flex;
            gap: 8px;
        }

        .price{
            font-weight: 300;
            margin-bottom: 32px;
        }
    }
    
`
const Backbutton = styled.button`
    position: fixed;
    top: 32px;
    left: 32px;
    border: none;
    background-color: transparent;
`