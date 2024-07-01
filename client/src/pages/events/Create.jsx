import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createEvent } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Alert from "../../Components/Alert";

const Create = () => {
  // Use event context
  const { events, setEvents } = useContext(EventContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [name, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Create a new event
      const data = await createEvent(name, date);
      // Update the events state
      console.log("handleCreate", data);
      setEvents([...events, data.event]);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="name">Create a new event</h1>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Event Title"
          className="input"
          value={name}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <input
          placeholder="Event date"
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn">Create</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Create;
