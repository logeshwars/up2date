import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import AdminNav from "./components/AdminNav";
import date from "./util/currentDate";
import { auth, db } from "./firebase";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import EventDetails from "./components/EventDetails";
function App() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState();
  const [user, setUser] = useState();
  const [userParticipations, setUserParticipations] = useState([]);
  const [userParticipationsId, setUserParticipationsId] = useState([]);
  const [unknownUser, setUnknownUser] = useState(false);
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
    onSnapshot(
      collection(db, "participations"),
      (snapshot) => {
        setUserParticipations([]);
        snapshot.forEach((doc) => {
          if (user?.email === doc.data()?.email) {
            setUserParticipations((prev) => [...prev, doc.data()]);
            setUserParticipationsId((prev) => [...prev, doc.id]);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers([]);
      snapshot.forEach((doc) => {
        setUsers((prev) => [...prev, doc.data()]);
      });
    });
    onSnapshot(collection(db, "Admin"), (snapshot) => {
      snapshot.forEach((doc) => {
        setAdmins((prev) => [...prev, doc.data()]);
      });
    });
  }, [user]);
  useEffect(() => {
    auth.onAuthStateChanged((us) => {
      setAdmin();
      setUser();
      let userVerify = users.find((u) => u?.email === us.email);
      let adminVerify = admins.find((a) => a?.email === us.email);
      if (adminVerify !== undefined) {
        setAdmin(adminVerify);
      } else if (userVerify !== undefined) {
        setUser(userVerify);
      } else {
        setUnknownUser(true);
      }
    });
  }, [admins, users, userParticipations]);
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
            path="/details"
            element={
              <>
                <NavBar admin={admin} user={user} />
                <EventDetails user={user} userParticipations={userParticipations} userParticipationsId={userParticipationsId} />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <AdminNav />
                <Admin events={events} users={users} />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
