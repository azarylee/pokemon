import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

let subject = null;

export const getNotes = () => {
  if (!subject) {
    return undefined;
  }

  return subject.value;
};

export const useSharedNotes = () => {
  const [notes, setNotes] = useState([]);

  if (!subject) {
    subject = new BehaviorSubject([]);
  }

  useEffect(() => {
    const subscription = subject.subscribe((notes) => {
      setNotes(notes);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  function addNote(newNote) {
    subject.next([...notes, newNote]);
  }

  function clear() {
    subject.next([]);
  }

  return { addNote, clear, notes };
};
