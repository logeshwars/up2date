import React, { useEffect, useState } from "react";
import "./ModifyEvents.css";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import "./Participations.css";
function Participation({ events }) {
  const [userParticipations, setUserParticipations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [event, setEvent] = useState([]);
  useEffect(() => {
    onSnapshot(
      collection(db, "participations"),
      (snapshot) => {
        setUserParticipations([]);
        snapshot.forEach((doc) => {
          setUserParticipations((prev) => [...prev, doc.data()]);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const handleChange = () => {
   // console.log(userParticipations);
    setEvent(
      userParticipations.filter((event) => event.title === selectedEvent.title)
    );
  };
  return (
    <div className="modifyEvents">
      <div className="createEventTitle">
        <h3>Participations</h3>
      </div>
      <div className="selectBox">
        <div
          className="selectBoxSelected"
          onClick={() => {
            setShowDropdown(true);
          }}
        >
          <span>
            <img src={selectedEvent.shareImg} alt="" />
            {selectedEvent.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </div>
        {showDropdown && (
          <div className="selectBoxDropDown">
            {events.map((event, index) => (
              <div
                key={index}
                className="selectBoxDropDownItem"
                onClick={() => {
                  setSelectedEvent(event);
                  setShowDropdown(false);
                  handleChange();
                }}
              >
                <span>
                  <img src={event.shareImg} alt="" />
                  <span>{event.title}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="eventTitle">
        <h6>{selectedEvent?.title}</h6>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Roll-No</th>
              <th>Department</th>
              <th>Section</th>
              <th>Year</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Registered date</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {event.map((e, index) => (
              <tr key={index}>
                <td>1</td>
                <td>{e?.name}</td>
                <td>{e?.rollno}</td>
                <td> {e?.department}</td>
                <td>{e?.section}</td>
                <td>{e?.year}</td>
                <td>{e?.phone}</td>
                <td>{e?.email}</td>
                <td>{}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red", color: "white" }}
                    className="tableUpdate"
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

export default Participation;
