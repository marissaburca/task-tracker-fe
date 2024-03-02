import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import NoteModal from "../Modals/NoteModal/NoteModal";
import { Row, Col, Spinner } from "react-bootstrap";
import {
  getNotes,
  addNote,
  editNote,
  deleteNote,
} from "../StructuralApi/NotesApi";
import "./NoteBlock.css";
import { useSelector } from "react-redux";

export default function NoteBlock() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Inizialmente true per il caricamento iniziale
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getNotes(token)
      .then((fetchedNotes) => {
        setNotes(fetchedNotes || []); // Assicurati che fetchedNotes non sia undefined
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [token]);

  const handleShowModal = (noteId = null, currentText = "") => {
    setShowModal(true);
    setEditNoteId(noteId);
    setNewNote(currentText);
    setIsEditing(!!noteId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewNote("");
    setIsEditing(false);
    setEditNoteId(null);
  };

  const handleNoteChange = (e) => setNewNote(e.target.value);

  const handleSubmitNote = () => {
    if (newNote.trim()) {
      setIsLoading(true);
      const action = isEditing
        ? () => editNote(editNoteId, { note: newNote }, token)
        : () => addNote({ note: newNote }, token);
      action()
        .then(() => {
          reloadNotes();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
          handleCloseModal();
        });
    }
  };

  const handleDeleteNote = (noteId) => {
    setIsLoading(true);
    deleteNote(noteId, token)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== noteId));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const reloadNotes = () => {
    getNotes(token)
      .then((fetchedNotes) => {
        setNotes(fetchedNotes || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="note-block">
      <div className="title">
        <h3>Notes</h3>
        <span>
          <MdAdd className="toClick" onClick={() => handleShowModal()} />
        </span>
      </div>
      <div  className="notesOut">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className="notesIn">
            {notes.length > 0 ? (
              notes.map((note) => (
                <Row key={note.id} className="shadow">
                  <Col xs={8}>{note.note}</Col>
                  <Col xs={4} className="text-end">
                    {" "}
                    <MdEdit
                      className="toClick"
                      onClick={() => handleShowModal(note.id, note.note)}
                    />
                    <MdDelete
                      className="toClick"
                      onClick={() => handleDeleteNote(note.id)}
                    />
                  </Col>
                </Row>
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        )}{" "}
      </div>
      <NoteModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
        handleSubmitNote={handleSubmitNote}
        isEditing={isEditing}
      />
    </div>
  );
}
