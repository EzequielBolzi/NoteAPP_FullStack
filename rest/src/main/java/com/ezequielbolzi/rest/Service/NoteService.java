package com.ezequielbolzi.rest.Service;

import com.ezequielbolzi.rest.Model.Note;
import com.ezequielbolzi.rest.Repository.NoteRepository;
import java.util.List;
import java.util.Optional;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public NoteService() {
    }

    public List<Note> getNotes() {
        return this.noteRepository.findAll();
    }

    public Note saveNote(Note note) {
        return (Note)this.noteRepository.save(note);
    }

    public Optional<Note> findNoteById(long id) {
        return this.noteRepository.findById(id);
    }

    public void deleteNote(Note note) {
        this.noteRepository.delete(note);
    }

    public List<Note> getActiveNotes() {
        return this.noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return this.noteRepository.findByArchivedTrue();
    }

    public void archiveOrUnarchiveNote(long noteId, boolean status) {
        Note note = (Note)this.noteRepository.findById(noteId).orElseThrow(() -> {
            return new ResourceNotFoundException("Note not found");
        });
        note.setArchived(status);
        this.noteRepository.save(note);
    }
}
