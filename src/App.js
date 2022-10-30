import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubDetailPage from "./pages/SubDetailPage";
import SubscriptionPage from "./pages/SubscriptionPage";

function App() {
  return (
    <AppStyle>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/sign-up" element={<RegisterPage />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/subscriptions" element={<SubscriptionPage />}/>
          <Route path="/subscriptions/:SubID" element={<SubDetailPage />}/>
        </Routes>
      </BrowserRouter>
    </AppStyle>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto';
  }
`

const AppStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
`