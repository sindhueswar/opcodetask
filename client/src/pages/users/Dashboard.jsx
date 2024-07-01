import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { deleteEvent, getUserEvents } from "../../controllers/eventsController";
import Event from "../../Components/Event";
import Alert from "../../Components/Alert";
import Success from "../../Components/Success";

const Dashboard = () => {
  // Use user context
  const { user, setUser } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      // Grab user's events
      const { userEvents, email } = await getUserEvents();
      // Update user state
      setUser({ email, events: userEvents });
      // Remove the loading
      setLoading(false);
    }, 500);
  }, []);

  // Handle delete event
  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
        // Delete the event
        const data = await deleteEvent(_id);
        // Set the success message
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newEvents = user.events.filter((event) => event._id !== _id);
      setUser({ ...user, events: newEvents });
    }
  };
  return (
    <section className="card">
      <p>{user.email}</p>
      <h1 className="name">User Dashboard</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      {user.events &&
        user.events.map((event) => (
          <div key={event._id}>
            <Event event={event}>
              <div className="flex items-center gap-2">
                <Link
                  className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                  name="Update"
                  state={event} // Send the events to the Update page
                  to="/update"
                ></Link>
                <button
                  className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                  name="Delete"
                  onClick={() => handleDelete(event._id)}
                ></button>
              </div>
            </Event>
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
