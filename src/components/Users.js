import React from "react";
import "./ModifyEvents.css";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
function Users({ users,usersId,toast }) {
  return (
    <div className="modifyEvents">
      <div className="createEventTitle">
        <h3>Users Details</h3>
      </div>
      <div className="table">
        <table>
          <thead>
          <tr>
            <th>NO</th>
            <th>Profile</th>
            <th>Name</th>
            <th>RollNO</th>
            <th>Department</th>
            <th>Section</th>
            <th>Year</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Entered Date</th>
            <th>Update</th>
          </tr>
          </thead>
          <tbody>
          {users.map((u, index) => (
            <tr>
              <td>{index}</td>
              <td>
                <img src={u.photo} alt="" className="userProfile"/>
              </td>
              <td>{u.name}</td>
              <td>{u.rollno}</td>
              <td>{u.department}</td>
              <td>{u.section}</td>
              <td>{u.year}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.date?.toDate().toLocaleDateString()}</td>
              <td>
                <button
                 
                  className="tableUpdate tableDelete"
                  onClick={async () => {
                    await deleteDoc(doc(db, "users", usersId[index])).then(()=>toast());
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
