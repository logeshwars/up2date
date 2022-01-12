import React,{useEffect,useState} from 'react'
import './ModifyEvents.css'
import { auth, db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
function Participation() {
    const[userParticipations,setUserParticipations]=useState([])
    useEffect(()=>{
        onSnapshot(
            collection(db, "participations"), 
            (snapshot) => {
              setUserParticipations([])
              snapshot.forEach((doc) => {
                setUserParticipations((prev) => [...prev, doc.data()]);
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
        <div className='table'>
            <table>
                <tr>
                    <th>NO</th>
                    <th>Name</th>
                    <th>Phone No</th>
                    <th>Roll-No</th>
                    <th>Class</th>
                    <th>Department</th>
                    <th>Section</th>
                    <th>Registered date</th>
                    <th>Remove</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>E-horizon</td>
                    <td><p className='tableWrap'>all events will be conducted
                    all events will be conducted
                    all events will be conducted
                    all events will be conducted
                    </p>
                    </td>
                    <td> Logeshwar</td>
                    <td>1234567890</td>
                    <td>MCA</td>
                    
                    <td>10-10-2000</td>
                    <td>Yes</td>
                    <td><button style={{backgroundColor:"red",color:"white"}} className='tableUpdate'>Remove</button></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>E-horizon</td>
                    <td><p className='tableWrap'>all events will be conducted
                    all events will be conducted
                    all events will be conducted
                    all events will be conducted
                    </p>
                    </td>
                    <td> Logeshwar</td>
                    <td>1234567890</td>
                    <td>MCA</td>
                    <td>10-10-2000</td>
                   
                    <td>Yes</td>
                    <td><button style={{backgroundColor:"red",color:"white"}}  className='tableUpdate'>Remove</button></td>
                </tr>
            </table>
        </div>
        </div>
    )
}

export default Participation
