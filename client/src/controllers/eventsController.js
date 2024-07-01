/**************************** Get all events  ********************************/
const getEvents = async () => {
  const res = await fetch("/api/events");
  const data = await res.json();
  console.log("getEvent", res.body);
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Get user events  ******************************/
const getUserEvents = async () => {
  const res = await fetch("/api/events/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Create events  ******************************/
const createEvent = async (name, date) => {
  // console.log("createEvent", name, date);
  if (!name || !date) {
    throw Error("All fields are required");
  }

  const res = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, date }),
  });
  console.log("body", JSON.stringify({ name, date }));
  const data = await res.json();

  if (!res.ok) {
    console.log("createEvent", res.body);
    console.log("createEvent", data.error);
    throw Error(data.error);
  }

  return data;
};

/**************************** Delete events  ******************************/
const deleteEvent = async (_id) => {
  const res = await fetch(`/api/events/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Update events  ******************************/
const updateEvent = async (_id, name, date) => {
  if (!name || !date) {
    throw Error("All fields are required");
  }

  const res = await fetch(`/api/events/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, date }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

export { getEvents, getUserEvents, createEvent, deleteEvent, updateEvent };
