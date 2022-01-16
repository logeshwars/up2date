import React,{useState,useEffect} from 'react'
import date from '../util/currentDate'
import './ModifyEvents.css'
import {db} from "../firebase";
import {collection} from "firebase/firestore";
import {onSnapshot} from "firebase/firestore";
function ClosedEvents() {
    const[events,setEvents]=useState([]);
    useEffect(()=>{
        onSnapshot(
            collection(db, "events"), 
            (snapshot) => {
              setEvents([])
              snapshot.forEach((doc) => {
                if(date>=new Date(doc.data().enddate))
                setEvents((prev) => [...prev, doc.data()]);
              });
             
            },
            (error) => {
              console.log(error);
            });
    },[events])
    return (
        <div className='modifyEvents'>
            <div className="createEventTitle">
        <h3>Closed Events</h3>
        </div>
        <div className='table'>
            <table>
                <tr>
                    <th>NO</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Cordinator</th>
                    <th>Phone-NO</th>
                    <th>Department</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Closing Date</th>
                    <th>Registering</th>
                </tr>
             {events.map((e,index)=>
                (<tr key={index}>
                    <td>{index}</td>
                    <td>{e.title}</td>
                    <td><p className='tableWrap'>{e.description}
                    </p>
                    </td>
                    <td>{e.cordinator}</td>
                    <td>{e.cordinatorPH}</td>
                    <td>{e.department}</td>
                    <td>{e.startdate}</td>
                    <td>{e.enddate}</td>
                    <td>{e.closedate}</td>
                    <td>{e.needed}</td>
                </tr>))} 

            </table>
        </div>
        </div>
    )
}

export default ClosedEvents
