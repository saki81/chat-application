import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { authStore } from "./store/authStore";
import { useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { themeStore } from "./store/themeStore";

function App() {
  const {authUser, checkAuth, isCheckingAuth } = authStore();
  const { theme} = themeStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  console.log({ authUser});

  if( isCheckingAuth && !authUser) {
      return (
        <div data-theme={theme} className="flex items-center justify-center h-screen">
           <LoaderPinwheel className="size-10 animate-spin" />
        </div>
      )
  }

  return (
    <div data-theme={theme}>
      <Toaster />
      <Navbar/>
      <Routes>
        <Route path="/" element={ authUser ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/register" element={ !authUser ? <Register/> : <Navigate to="/"/> }/>
        <Route path="/login" element={ !authUser ? <Login/> : <Navigate to="/" /> }/>
        <Route path="/profile" element={ authUser ? <Profile/> : <Navigate to="/login" /> }/>
        <Route path="/settings" element={ <Settings/> }/>  
      </Routes>
    </div>
  )
}

export default App
