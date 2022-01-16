import React,{useEffect,useState} from 'react'
import './ModifyEvents.css'
import { auth, db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import "./Participations.css"
function Participation({events}) {
    const[userParticipations,setUserParticipations]=useState()
    useEffect(()=>{
        onSnapshot(
            collection(db, "participations"), 
            (snapshot) => {
              setUserParticipations([])
              snapshot.forEach((doc) => {
                //setUserParticipations((prev) => [...prev, doc.data()]);
                 setUserParticipations( doc.data());
              });
             
            },
            (error) => {
              console.log(error);
            });
    
    },[])
    return (
        <div className='modifyEvents'>
            <div className="createEventTitle">
        <h3>Participations</h3>
        </div>
        <div className='eventTitle'><h6>{userParticipations?.title}</h6></div>
        <div className='table'>
            <table>
                <thead>
                <tr>
                    <th>NO</th>
                    <th>Name</th>
                    <th>Roll-No</th>
                    <th>Department</th>
                    <th>Section</th>
                    <th>Year</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Registered date</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>{userParticipations?.name}</td>
                    <td>{userParticipations?.rollno}
                    </td>
                    <td> {userParticipations?.department}</td>
                    <td>{userParticipations?.section}</td>
                    <td>{userParticipations?.year}</td>
                    <td>{userParticipations?.phone}</td>
                    <td>{userParticipations?.email}</td>
                    <td>{}</td>
                    <td><button style={{backgroundColor:"red",color:"white"}} className='tableUpdate'>Remove</button></td>
                </tr>
                
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Participation
