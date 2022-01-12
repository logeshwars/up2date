import React,{useState,useEffect} from 'react'
import './Main.css'
import { collection, getDocs } from "firebase/firestore";
import { provider,db } from "../firebase";
import Card from './Card';
function Main({events,user}) {
    return (
        <> <div><h3 className="heading">Upcoming Kongu Engneering College Events</h3></div>
        <div className="main">
            {events.map((event,key)=>(<Card key={key} user={user} event={event}/>))}
        </div>
        </>
    )
}

export default Main
