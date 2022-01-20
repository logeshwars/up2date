import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import date from "./util/currentDate";
import { auth, db } from "./firebase";
import { collection, query, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import EventDetails from "./components/EventDetails";
import MyEvents from "./components/MyEvents";
function App() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState();
  const [user, setUser] = useState();
  const [log, setLog] = useState();
  const [userParticipations, setUserParticipations] = useState([]);
  const [userParticipationsId, setUserParticipationsId] = useState([]);
  const [unknownUser, setUnknownUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((us) => {
      if(us?.email!==undefined)
      setLog(us?.email);
      else
      {
      setLog();
      setUser();
      setAdmin();
      }
    });
  });
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers([]);
      snapshot.forEach((doc) => {
        setUsers((prev) => [...prev, doc.data()]);
      });
    });
    onSnapshot(collection(db, "Admin"), (snapshot) => {
      setAdmins([]);
      snapshot.forEach((doc) => {
        setAdmins((prev) => [...prev, doc.data()]);
      });
    });
  }, [log]);
  useEffect(() => {
    setAdmin();
    setUser();
    let userVerify = users.find((u) => u.email === log);
    let adminVerify = admins.find((a) => a.email === log);
    if (adminVerify !== undefined) {
      setAdmin(adminVerify);
    } else if (userVerify !== undefined) {
      setUser(userVerify);
    } else {
      setUnknownUser(true);
    }
  }, [users, admins, log]);

  useEffect(() => {
    onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        setEvents([]);
        snapshot.forEach((doc) => {
          if (date <= new Date(doc.data().enddate))
            setEvents((prev) => [...prev, doc.data()]);
          setEventId((prev) => [...prev, doc.id]);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    if (user?.email !== undefined) {
      const q = query(
        collection(db, "participations"),
        where("email", "==", user?.email)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setUserParticipations([]);
        setUserParticipationsId([]);
        querySnapshot.forEach((doc) => {
          setUserParticipations((prev) => [...prev, doc.data()]);
          setUserParticipationsId((prev) => [...prev, doc.id]);
        });
      });
    }
  }, [user?.email,log]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar admin={admin} user={user} />
                <Hero /> <Main eventId={eventId} user={user} events={events} />
              </>
            }
          />
          <Route
            path="details"
            element={
              <>
                <NavBar admin={admin} user={user} />
                <EventDetails
                  user={user}
                  userParticipations={userParticipations}
                  userParticipationsId={userParticipationsId}
                />
              </>
            }
          />
          <Route
            path="admin"
            element={
              <>
                <Admin events={events} users={users} />
              </>
            }
          />
          <Route
            path="myevents"
            element={
              <>
              <NavBar admin={admin} user={user} />
                <MyEvents events={events} eventsId={eventId} userParticipations={userParticipations} />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
