import React, { useEffect, useState } from "react";
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Main from './components/Main'
import Hero from './components/Hero'
import NavBar from './components/NavBar';
import Admin from './components/Admin';
import AdminNav from './components/AdminNav';
import { db} from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import date from './util/currentDate'
import { doc, onSnapshot } from "firebase/firestore";
import EventDetails from "./components/EventDetails";
function App() {
  const [events,setEvents]=useState([]);
  const [user,setUser]=useState([]);
  useEffect(()=>
  {
   
    onSnapshot(
      collection(db, "events"), 
      (snapshot) => {
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
            setUser((prev) => [...prev, doc.data()]);
        });})
         
  },[])
  
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/'  element={<><NavBar/><Hero/> <Main events={events}/></>}/>
          <Route path='details'  element={<><NavBar/><EventDetails/></>}/>
          <Route path='admin'  element={<><AdminNav/><Admin/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
