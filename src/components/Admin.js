import React, { useEffect, useState } from "react";
import "./Admin.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db} from "../firebase";
import { Navigate } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import ModifyEvents from "./ModifyEvents";
import DeleteEvents from "./DeleteEvents";
import ClosedEvents from "./ClosedEvents";
import { collection, getDocs } from "firebase/firestore";
import Users from "./Users";
import Participation from "./Participation";
function Admin() {
  const [gotoMain, setgotoMain] = useState(false);
  const [admin, setAdmin] = useState("");
  const [navNo, setNavNo] = useState(1);
  const [events,setEvents]=useState();
  const [users,setUsers]=useState();
  useEffect(()=>
  {
    const getData=async()=>{
    const eventSnapshot = await getDocs(collection(db, "events"));
    setEvents(eventSnapshot);
    const userSnapshot = await getDocs(collection(db, "users"));
    setUsers(userSnapshot);
      // console.log(doc.id, " => ", doc.data());
  }
  getData();
  },[])
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin(user);
      } else {
        setgotoMain(true);
      }
    });
    console.log(admin);
  }, [admin]);
  useEffect(() => {
    var btns = document.getElementsByClassName("navBtns");
    const changeColor=(element)=>{
      element[1].style.backgroundColor="white";
    }
    Object.entries(btns).forEach(changeColor)
  }, [navNo]);
  return (
    <div className="admin">
      <div className="sideNav">
        {gotoMain && <Navigate to="/" replace />}
        <div>
          <img
            alt=""
            src={!admin.photoURL ? admin.photoURL : "images/avatar.png"}
          />
        </div>
        <h3>{admin.displayName}</h3>
        <div>
          <button className="navBtns" onClick={(e) => {setNavNo(1);e.target.style.backgroundColor="#15f333;"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span>create events</span>
          </button>
        </div>
        <div>
          <button className="navBtns" onClick={() => setNavNo(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
            <span>Modify events</span>
          </button>
        </div>
        <div>
          <button className="navBtns" onClick={() => setNavNo(3)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path
                fill-rule="evenodd"
                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
              />
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            <span>Users details</span>
          </button>
        </div>
        <div>
          <button className="navBtns" onClick={() => setNavNo(4)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-check-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span>Participations</span>
          </button>
        </div>
        <div>
          <button className="navBtns" onClick={() => setNavNo(5)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
            <span>Delete events</span>
          </button>
        </div>
        <div>
          <button className="navBtns" onClick={() => setNavNo(6)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-archive"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span>Closed events</span>
          </button>
        </div>
      </div>
      <div className="adminRightNav">
        {navNo === 1 && <CreateEvent />}
        {navNo === 2 && <ModifyEvents events={events} />}
        {navNo === 3 && <Users users={users}/>}
        {navNo === 4 && <Participation />}
        {navNo === 5 && <DeleteEvents events={events}/>}
        {navNo === 6 && <ClosedEvents events={events}/>}
      </div>
    </div>
  );
}

export default Admin;
