import { useContext, useEffect, useState } from "react";
import { getEvents } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Event from "../../Components/Event";

const Admin = () => {
  // Use event context
  const { events, setEvents } = useContext(EventContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Grab all the events on page load
  useEffect(() => {
    setTimeout(async () => {
      // Grab all events
      const data = await getEvents();
      // Update events state
      setEvents(data.events);
      // Remove the loading
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="card">
      <h1 className="name">Latest events</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {events &&
        events.map((event) => (
          <div key={event._id}>
            <Event event={event} />
          </div>
        ))}
    </section>
  );
};

export default Admin;
