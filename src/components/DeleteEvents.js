import React,{useState,useEffect} from 'react'
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import './ModifyEvents.css'
function DeleteEvents({events}) {
    return (
        <div className='modifyEvents'>
            <div className="createEventTitle">
        <h3>Delete Events</h3>
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
                (<tr>
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
                    <td>
                <button
                  className="tableUpdate tableDelete"
                >
                  Remove
                </button>
              </td>
                </tr>))} 

            </table>
        </div>
        </div>
    )

}

export default DeleteEvents
