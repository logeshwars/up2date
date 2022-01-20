import React,{ useEffect, useState } from 'react'
import date from '../util/currentDate'
import './ModifyEvents.css'
import { db } from "../firebase";
import { collection} from "firebase/firestore";
import {onSnapshot } from "firebase/firestore";
function ModifyEvents({setNavNo,setEditEventId,setEditEvent}) {
    const [events,setEvents]=useState([]);
    const [eventsId,setEventsId]=useState([]);
    useEffect(()=>
  {
    onSnapshot(
        collection(db, "events"), 
        (snapshot) => {
          setEvents([])
          setEventsId([])
          snapshot.forEach((doc) => {
            setEvents((prev) => [...prev, doc.data()]);
            setEventsId((prev) => [...prev, doc.id]);
            }
  
          );
         
        },
        (error) => {
          console.log(error);
        });
  },[])
    return (
        <div className='modifyEvents'>
            <div className="createEventTitle">
        <h3>Modify Events</h3>
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
                    <th>Update</th>
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
                    <td><button className='tableUpdate' onClick={()=>{setNavNo(7);setEditEventId(eventsId[index]);setEditEvent(e)}}>Update</button></td>
                </tr>))} 

            </table>
        </div>
        </div>
    )
}

export default ModifyEvents
