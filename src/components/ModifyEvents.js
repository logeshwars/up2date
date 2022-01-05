import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import './ModifyEvents.css'
function ModifyEvents({events}) {
    const[event,setEvent]=useState([{}]);
    useEffect(()=>{
    events.forEach((doc) => {
        setEvent(prevState =>([...prevState,doc.data()]));
        // console.log(doc.data());
      });
     console.log(event);
    },[events])
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
                    <td>10-10-2000</td>
                    <td>10-10-2000</td>
                    <td>Yes</td>
                    <td><button className='tableUpdate'>Update</button></td>
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
                    <td>10-10-2000</td>
                    <td>10-10-2000</td>
                    <td>Yes</td>
                    <td><button className='tableUpdate'>Update</button></td>
                </tr>
            </table>
        </div>
        </div>
    )
}

export default ModifyEvents
