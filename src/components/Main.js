import React,{useState,useEffect} from 'react'
import './Main.css'
import { collection, getDocs } from "firebase/firestore";
import { provider,db } from "../firebase";
import Card from './Card';
function Main() {
    const [events,setEvents]=useState();
    useEffect(()=>
    {
      const getData=async()=>{
      const eventSnapshot = await getDocs(collection(db, "events"));
      setEvents(eventSnapshot);
    }
    getData();
    },[])
    return (
        <div className="main">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}

export default Main
