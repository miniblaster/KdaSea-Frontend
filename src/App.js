import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/Connectors";
import Swal from "sweetalert2";
import DetailPage from "./pages/DetailPage";
import MintPage from "./pages/mint";
import CreateAlbum from "./pages/CreateAlbum";
import ProfilePage from "./pages/ProfilePage";
import SellPage from "./pages/SellPage";
import { login } from "./api/api";
import LoginPage from "./pages/LoginPage";
import AfterLoginHeader from "./components/AfterLoginHeader";
import StoreFrontPage from "./pages/StoreFrontPage";
import AferLoginFooter from "./components/AfterLoginFooter";
import ProfilePage2 from "./pages/ProfilePage2";
import { createTheme } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core";
import { pink } from "@mui/material/colors";

function App() {
  const { active, account, library, activate } = useWeb3React();
  const [isLoaded, setLoaded] = useState(false);
  const [conn, setConn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (active) setConn(true);
    else setConn(false);
  }, [active]);

  useEffect(() => {
    if (conn) {
      login(account).then((res) => {
        console.log(res);
      });
    }
  }, [conn]);

  const [mode, setMode] = useState("light");

  if (!isLoaded) return <Loading />;

  return (
    <div className="container-fluid p-0">
      <Router>
        {/* {conn?(<AfterLoginHeader account={account} isConnected = {conn}/>):(<Header isConnected={conn} account={account} onClick={connectMetamask} />)} */}
        <Header mode={mode} setMode={setMode} />
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate to="/marketplace" mode={mode} />}
          />
          <Route path="/login" exact element={<LoginPage mode={mode} />} />
          <Route
            path="/marketplace"
            exact
            element={<StoreFrontPage mode={mode} />}
          />
          <Route path="*" element={<Navigate to="/" mode={mode} />} />
          <Route path="/detail">
            {account ? (
              <Route
                path=":id"
                element={
                  <DetailPage library={library} account={account} mode={mode} />
                }
              />
            ) : (
              <Route path="" element={<LoginPage mode={mode} />} />
            )}
          </Route>
          <Route
            path="/create"
            exact
            element={
              account ? (
                <MintPage library={library} account={account} mode={mode} />
              ) : (
                <LoginPage mode={mode} />
              )
            }
          />
          <Route
            path="/create-album"
            exact
            element={
              account ? <CreateAlbum mode={mode} /> : <LoginPage mode={mode} />
            }
          />
          <Route path="/profile">
            <Route
              path=":address"
              element={
                account ? (
                  <ProfilePage2 mode={mode} />
                ) : (
                  <LoginPage mode={mode} />
                )
              }
            />
          </Route>
          <Route path="/sell">
            <Route
              path=":id"
              element={
                account ? (
                  <SellPage library={library} account={account} mode={mode} />
                ) : (
                  <LoginPage mode={mode} />
                )
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
