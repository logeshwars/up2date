import React from "react";
import "./CreateEvent.css";
function CreateEvent() {
  return (
    <div className="createEvent">
      <div className="createEventTitle">
        <h3>Create Event</h3>
        <div className="eventInputs">
          <div className="eventInside">
            <label>Event Title</label>
            <input placeholder="Title" />
          </div>
          <div className="eventInside">
          <label>Event Decription</label>
            <textarea placeholder="Description"></textarea>
          </div>
          <div className="eventInside">
          <div className="eventInside">
            <label>Cordinator</label>
            <input placeholder="Cordinator" />
          </div>
          <div className="eventInside">
            <label>Cordinator Ph.NO</label>
            <input placeholder="Cordinator No" type="tel" />
          </div>
          </div>
          <div className="eventInside">
            <label>Department</label>
            <input placeholder="Department" />
          </div>
          <div className="eventInside">
            <div className="eventInside">
              <label>Start Date</label>
              <input placeholder="Start Date" type="date" />
            </div>{" "}
            <div className="eventInside">
              <label>End Date</label>
              <input placeholder="Title" type="date" />
            </div>
          </div>
          <div className="eventInside">
            <label>Registeration End</label>
            <input placeholder="Title" type="date" />
          </div>
          <div className="eventInside">
            <label>Registeration Needed or not?</label>
            <div className="eventInsideButtons">
            <button >Yes</button>
            <button>No</button>
            </div>
           
          </div>
          <div className="eventInside eventCenterButton">
            <button className="eventCreate">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
