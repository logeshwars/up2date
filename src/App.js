import React, { useEffect, useState } from "react";
import './App.css';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom';
import Main from './components/Main'
import Hero from './components/Hero'
import NavBar from './components/NavBar';
import Admin from './components/Admin';
import AdminNav from './components/AdminNav';
import { auth, db} from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import date from './util/currentDate'
import { doc, onSnapshot } from "firebase/firestore";
import EventDetails from "./components/EventDetails";
function App() {
  const [events,setEvents]=useState([]);
  const [users,setUsers]=useState([]);
  const[admins,setAdmins]=useState([]);
  const[admin,setAdmin]=useState();
  const[user,setUser]=useState();
  const[unknownUser,setUnknownUser]=useState(false);
  useEffect(()=>
  {
    onSnapshot(
      collection(db, "events"), 
      (snapshot) => {
        setEvents([])
        setUsers([]);
        snapshot.forEach((doc) => {
          if(date<=new Date(doc.data().enddate))
          setEvents((prev) => [...prev, doc.data()]);

        });
       
      },
      (error) => {
        console.log(error);
      });
      onSnapshot(
        collection(db, "users"), 
        (snapshot) => {
          snapshot.forEach((doc) => {
            setUsers((prev) => [...prev, doc.data()]);
        });})
        onSnapshot(collection(db, "Admin"),(snapshot)=>{
          snapshot.forEach((doc) => {
            setAdmins((prev) => [...prev, doc.data()]);
        });
    })
         
  },[])
  useEffect(()=>{ auth.onAuthStateChanged((us)=>{
    setAdmin();
    setUser();
    console.log(us);
    let userVerify=users.find((u)=>u?.email===us.email)
    let adminVerify=admins.find((a)=>a?.email===us.email)
    if(adminVerify!==undefined)
    {
     setAdmin(adminVerify);
    }
    else if(userVerify!==undefined)
    {
      setUser(userVerify);
    }
    else
    {
      setUnknownUser(true);
    }
  })
},[admins,users])
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/'  element={<><NavBar admin={admin} user={user}/><Hero/> <Main user={user} events={events}/></>}/>
          <Route path='details'  element={<><NavBar/><EventDetails/></>}/>
          <Route path='admin'  element={<><AdminNav/><Admin/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
