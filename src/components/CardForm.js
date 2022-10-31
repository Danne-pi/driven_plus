import { useContext, useState } from "react"
import styled from "styled-components"
import InputMask from "react-input-mask";
import { apiURL, AuthContext, Loading, ReloadUserInfo } from "./Globlal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreditCardForm(props){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [card, setCard] = useState("")
    const [cod, setCod] = useState("")
    const [val, setVal] = useState("")
    const [user, setUser] = useContext(AuthContext)
    const [confirm, setConfirm] = useState(false)
    const [load, setLoad] = useState(false)

    function submit(){
        setLoad(true)
        const URL = apiURL+"subscriptions"
        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }
        const body = {
            membershipId: props.thisID,
            cardName: name,
            cardNumber: card,
            securityNumber: Number(cod),
            expirationDate: val
        }
        const promise = axios.post(URL, body, config)
        
        promise.then((a)=>{
            ReloadUserInfo(user, setUser)
            setTimeout(() => {
                navigate("/home")
            }, 500);
        })
        promise.catch((a)=>{
            const msg = a.response.data.message
            alert(msg)
        })
    }
    function preSub(e){
        e.preventDefault()
        setConfirm(true)
    }


    return(
        <CardFormStyle onSubmit={preSub}>
            <input
                type="text"
                placeholder="Nome impresso no cartão"
                value={name}
                onChange={e=> setName(e.target.value)}
                required
                disabled={""}
            />
            <InputMask
                mask="9999 9999 9999 9999"
                placeholder="Digitos do cartão"
                value={card}
                onChange={e=> setCard(e.target.value)}
                required
                disabled={""}
            />
            <div>
            <InputMask
                mask="999"
                type="text"
                placeholder="Código de segurança"
                value={cod}
                onChange={e=> setCod(e.target.value)}
                required
                disabled={""}
            />
            <InputMask
                mask="99/99"
                type="text"
                placeholder="Validade"
                value={val}
                onChange={e=> setVal(e.target.value)}
                required
                disabled={""}
            />
            </div>
            <button 
                type="submit"
                disabled={""}
            >{"Assinar"}</button>
            {confirm === false ? <></>:
            <Confirmation>
                <div className="wrapper">
                {
                    load === true ? 

                    <Loading height={22} width={50} radius={9} color={"#FF4791"} />

                    :
                    <>
                    <h2>Tem certeza que deseja assinar o plano {props.title} <br/>(R$ {props.price})?</h2>
                    <div>
                        <button onClick={()=>{setConfirm(false)}} className="cancel">Não</button>
                        <button onClick={submit} className="confirm">SIM</button>
                    </div>
                    </>
                }
                </div>
                
            </Confirmation>
            }
        </CardFormStyle>
    )
}

const CardFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    

    input{
            border-radius: 8px;
            padding: 16px;
            border: none;
            margin-bottom: 7px;
        }
        
        div{
            display: flex;
            gap: 7px;
            input{
                width: 100%;
            }
        }

        button{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            padding: 14px;
            border: none;
            margin-top: 14px;
            color: white;
            background-color: #FF4791;
            font-weight: 700;
            font-size: 18px;
        }
`
const Confirmation = styled.div`
    position: fixed;
    z-index: 5;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(25,25,25,0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper{
        color: black;
        background-color: white;
        width: 75vw;
        height: 35vh;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        padding: 24px;
        justify-content: center;
        align-items: center;
        text-align: center;

        div{
            display: flex;
            gap: 32px;
        }
        .cancel{
            background-color: #CECECE;
        }
    }
`