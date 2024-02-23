import './NoteBlock.css'
import React, { useState } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import NoteModal from '../Modals/NoteModal/NoteModal';
import { v4 as uuidv4 } from 'uuid';

function NoteBlock() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const handleShowModal = (noteId = null, currentText = '') => {
    setShowModal(true);
    setEditNoteId(noteId);
    setNewNote(currentText);
    setIsEditing(noteId !== null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewNote('');
    setIsEditing(false);
    setEditNoteId(null);
  };

  const handleNoteChange = (e) => setNewNote(e.target.value);

  const handleSubmitNote = () => {
    if (newNote.trim()) {
      if (isEditing) {
        setNotes(notes.map(note => note.id === editNoteId ? { ...note, text: newNote } : note));
      } else {
        setNotes([...notes, { id: uuidv4(), text: newNote.trim() }]);
      }
      handleCloseModal();
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <div className="note-block" >
      <h3>Notes <MdAdd onClick={() => handleShowModal()} style={{ cursor: 'pointer' }} /></h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <MdEdit onClick={() => handleShowModal(note.id, note.text)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
            <MdDelete onClick={() => handleDeleteNote(note.id)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
          </li>
        ))}
      </ul>
      
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

export default NoteBlock;

