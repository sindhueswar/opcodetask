/* eslint-disable react/prop-types */
const Event = ({ event, children }) => {
  // console.log(event)
  return (
    <div className="mb-6">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">{event.name}</h2>
          <p className="text-[10px] text-slate-500">{new Date(event.createdAt).toLocaleDateString()}</p>
        </div>

        <div>{children}</div>
      </div>

        <p className="text-sm mt-4">{event.date}</p>

    <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6"></div>
    </div>
  );
};

export default Event;
