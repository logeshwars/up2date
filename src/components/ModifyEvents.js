import React from 'react'
import './ModifyEvents.css'
function ModifyEvents() {
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
                    <td><input value={"E-horizon"}/></td>
                    <td><textarea value={"all events will be conducted"}/></td>
                    <td> <input value={"Logeshwar"}/></td>
                    <td><input value={"1234567890"}/></td>
                    <td><input value={"MCA"}/></td>
                    <td><input type="date"/></td>
                    <td><input type="date"/></td>
                    <td><input type="date"/></td>
                    <td><input value={"Yes"}/></td>
                    <td><button>Update</button></td>
                </tr>
            </table>
        </div>
        </div>
    )
}

export default ModifyEvents
