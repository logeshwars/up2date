import React from 'react'
import './ModifyEvents.css'
function Users() {
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
                    <td><button style={{backgroundColor:"red",color:"white"}} className='tableUpdate'>Delete</button></td>
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
                    <td><button style={{backgroundColor:"red",color:"white"}}  className='tableUpdate'>Delete</button></td>
                </tr>
            </table>
        </div>
        </div>
    )
}

export default Users
