/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Event context to be used in useContext hook
export const EventContext = createContext();

const EventProvider = ({ children }) => {
  // Events global state
  const [events, setEvents] = useState([]);

  // Return a custom component to expose Event state to the children components
  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
