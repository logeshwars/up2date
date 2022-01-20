import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminNav from "./AdminNav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import date from '../util/currentDate'
import { collection} from "firebase/firestore";
import {onSnapshot } from "firebase/firestore";
import CreateEvent from "./CreateEvent";
import ModifyEvents from "./ModifyEvents";
import DeleteEvents from "./DeleteEvents";
import ClosedEvents from "./ClosedEvents";
import Users from "./Users";
import Participation from "./Participation";
import EditEvents from "./EditEvents";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Admin() {
  const [gotoMain, setgotoMain] = useState(false);
  const [admin, setAdmin] = useState("");
  const [navNo, setNavNo] = useState(1);
  const [events,setEvents]=useState([]);
  const [eventsId,setEventsId]=useState([]);
  const [users,setUsers]=useState([]);
  const [usersId,setUsersId]=useState([]);
  const [editEventId,setEditEventId]=useState();
  const [editEvent,setEditEvent]=useState();
  const [showNav,setShowNav]=useState(false);
  const slideLeft={  left:-280+"px"}
  const slideRight={  left:0+"px"}
  const notify = () => toast.success("Done Successfully");
  const deleted = () => toast.error("Deleted Successfully");

  useEffect(()=>
  {
    onSnapshot(
      collection(db, "events"), 
      (snapshot) => {
        setEvents([])
        setEventsId([])
        snapshot.forEach((doc) => {
          if(date<=new Date(doc.data().enddate))
          {
          setEvents((prev) => [...prev, doc.data()]);
          setEventsId((prev) => [...prev, doc.id]);
          }

        });
       
      },
      (error) => {
        console.log(error);
      });
     
      onSnapshot(
        collection(db, "users"), 
        (snapshot) => {
          setUsers([]);
          setUsersId([]);
          snapshot.forEach((doc) => {
            setUsersId((prev) => [...prev, doc.id]);
            setUsers((prev) => [...prev, doc.data()]);
        })
    })
         
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
  function shortString(s, n) {
    if (s.length >= n) {
      return s.slice(0, n);
    } else {
      return s;
    }
  }
  const setNav=()=>
  {
    if(showNav)
    setShowNav(false)
    else
    setShowNav(true);
  }
  return (
    <>
      <AdminNav setNav={setNav}/>
    <div className="admin">
     
      <div className="sideNav" style={showNav?slideRight:slideLeft}>
        {/*gotoMain && <Navigate to="/" replace />*/}
        <div>
          <img
            alt=""
            className="AdminProfile"
            src={admin.photoURL ? admin.photoURL : "images/avatar.png"}
          />
        </div>
        <h3>{admin.displayName && shortString(admin.displayName, 9)}</h3>
        <div>
          <hr />
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 1 && "var(--shadow)",
              borderLeft: navNo === 1 && "4px solid var(--primary)",
            }}
            onClick={(e) => {
              setNavNo(1);
            }}
          >
            <img src="images/page.png" alt="" className="iconImage" />
            <span>create events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 2 && "var(--shadow)",
              borderLeft: navNo === 2 && "4px solid var(--primary)",
            }}
            onClick={(e) => {
              setNavNo(2);
            }}
          >
            <img src="images/edit.png" alt="" className="iconImage" />
            <span>Modify events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 3 && "var(--shadow)",
              borderLeft: navNo === 3 && "4px solid var(--primary)",
            }}
            onClick={() => setNavNo(3)}
          >
            <img src="images/users.png" alt="" className="iconImage" />
            <span>Users details</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 4 && "var(--shadow)",
              borderLeft: navNo === 4 && "4px solid var(--primary)",
            }}
            onClick={() => setNavNo(4)}
          >
            <img src="images/group.png" alt="" className="iconImage" />
            <span>Participations</span>
          </button>
        </div>
        <div>
          <button
            style={{
              boxShadow: navNo === 5 && "var(--shadow)",
              borderLeft: navNo === 5 && "4px solid var(--primary)",
            }}
            className="navBtns"
            onClick={() => setNavNo(5)}
          >
            <img src="images/trash.png" alt="" className="iconImage" />
            <span>Delete events</span>
          </button>
        </div>
        <div>
          <button
            className="navBtns"
            style={{
              boxShadow: navNo === 6 && "var(--shadow)",
              borderLeft: navNo === 6 && "4px solid var(--primary)",
            }}
            onClick={() => setNavNo(6)}
          >
            <img src="images/file.png" alt="" className="iconImage" />
            <span>Closed events</span>
          </button>
        </div>
      </div>
      <div className="adminRightNav">
        {navNo === 1 && <CreateEvent />}
        {navNo === 2 && (
          <ModifyEvents
            setNavNo={(no) => setNavNo(no)}
            setEditEvent={(event) => setEditEvent(event)}
            setEditEventId={(id) => setEditEventId(id)}
            events={events}
            eventsId={eventsId}
          />
        )}
        {navNo === 3 && <Users toast={deleted} users={users} usersId={usersId} />}
        {navNo === 4 && <Participation toast={deleted} events={events} users={users} eventsId={eventsId}/>}
        {navNo === 5 && <DeleteEvents toast={deleted} events={events} eventsId={eventsId} />}
        {navNo === 6 && <ClosedEvents />}
        {navNo === 7 && <EditEvents toast={notify} eventId={editEventId}  setNavNo={(no) => setNavNo(no)} event={editEvent} />}
      </div>
      <ToastContainer />
    </div>
    </>
  );
}

export default Admin;
