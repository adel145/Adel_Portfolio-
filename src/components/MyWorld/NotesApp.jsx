import { useEffect, useState } from "react";

const STORAGE_KEY = "adel-portfolio-notes";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes
      ? JSON.parse(savedNotes)
      : [{ id: 1, title: "Project idea", body: "Add a recruiter-friendly case study for Miktsoan." }];
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() && !body.trim()) return;
    setNotes((currentNotes) => [
      { id: Date.now(), title: title.trim() || "Untitled", body: body.trim() },
      ...currentNotes,
    ]);
    setTitle("");
    setBody("");
  };

  return (
    <main className="pt-28 sm:pt-40 px-4 py-8 sm:p-5 bg-primary min-h-screen text-white overflow-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-purple-400">Notes Demo</h1>
      <p className="text-center text-secondary mb-8 text-[15px] sm:text-base">Local notes saved in your browser.</p>

      <div className="max-w-3xl mx-auto">
        <div className="bg-tertiary p-4 sm:p-5 rounded-lg flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500 w-full"
              placeholder="Note title"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Note</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-purple-500 w-full"
              rows="5"
              placeholder="Write a short note"
            />
          </label>
          <button onClick={addNote} className="bg-purple-600 hover:bg-purple-500 rounded-md px-4 py-3 w-full sm:w-fit">
            Save Note
          </button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {notes.map((note) => (
            <article key={note.id} className="bg-tertiary rounded-lg p-4 sm:p-5 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold break-words">{note.title}</h2>
              <p className="mt-3 text-secondary leading-6 break-words">{note.body || "No details yet."}</p>
              <button
                onClick={() => setNotes((currentNotes) => currentNotes.filter((item) => item.id !== note.id))}
                className="mt-4 text-red-200 hover:text-white"
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

export default NotesApp;
