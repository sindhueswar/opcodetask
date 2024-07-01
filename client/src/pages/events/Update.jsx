import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updateEvent } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Alert from "../../Components/Alert";

const Update = () => {
  // Use event context
  const { events, setEvents } = useContext(EventContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Use location hook to receive data from Dashboard 
  const { state } = useLocation();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [name, setName] = useState(state.name);
  const [date, setDate] = useState(state.date);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("handleUpdate",state._id,name,date)
    try {     
      // Update a event
      const data = await updateEvent(state._id, name, date);
      // Exclude the old version of updated event from event context
      // So that there is no duplication of event with same _id
      const updatedEvents = events.filter((event) => event._id !== state._id);
      // Update the events state
      setEvents([...updatedEvents, data.event]);
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="name">Update your event</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Event Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
          // rows="6"
          placeholder="Event Content"
          className="input"
          type = "date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn">Update</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
