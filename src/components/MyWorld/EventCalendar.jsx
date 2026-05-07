import { useEffect, useState } from "react";

const STORAGE_KEY = "adel-portfolio-events";

const EventCalendar = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    return savedEvents
      ? JSON.parse(savedEvents)
      : [{ id: 1, date: "2026-07-01", title: "Expected B.Sc. graduation month" }];
  });
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!date || !title.trim()) return;
    setEvents((currentEvents) =>
      [...currentEvents, { id: Date.now(), date, title: title.trim() }].sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    );
    setDate("");
    setTitle("");
  };

  return (
    <main className="pt-28 sm:pt-40 px-4 py-8 sm:p-5 bg-primary min-h-screen text-white overflow-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-purple-400">Calendar Demo</h1>
      <p className="text-center text-secondary mb-8 text-[15px] sm:text-base">A lightweight browser-only event planner.</p>

      <div className="max-w-3xl mx-auto">
        <div className="bg-tertiary p-4 sm:p-5 rounded-lg grid sm:grid-cols-[1fr_2fr_auto] gap-4 items-end">
          <label className="flex flex-col gap-2">
            <span className="font-medium">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500 w-full"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Event</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Interview prep, project milestone..."
              className="bg-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500 w-full"
            />
          </label>
          <button onClick={addEvent} className="bg-purple-600 hover:bg-purple-500 rounded-md px-4 py-3 w-full sm:w-auto">
            Add
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {events.map((event) => (
            <article key={event.id} className="bg-tertiary rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <time className="text-purple-300 font-semibold">{event.date}</time>
                <h2 className="text-lg sm:text-xl font-bold mt-1 break-words">{event.title}</h2>
              </div>
              <button
                onClick={() => setEvents((currentEvents) => currentEvents.filter((item) => item.id !== event.id))}
                className="text-red-200 hover:text-white w-fit"
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EventCalendar;
