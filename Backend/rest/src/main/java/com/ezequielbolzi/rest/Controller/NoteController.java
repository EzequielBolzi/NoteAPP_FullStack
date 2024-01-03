
package com.ezequielbolzi.rest.Controller;

import com.ezequielbolzi.rest.Model.Note;
import com.ezequielbolzi.rest.Service.NoteService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"*"})
@RestController
public class NoteController {
    @Autowired
    private NoteService noteService;

    public NoteController() {
    }

    @GetMapping({"/notes"})
    public List<Note> getNote() {
        return this.noteService.getNotes();
    }

    @PostMapping({"/savenote"})
    public String saveNote(@RequestBody Note note) {
        this.noteService.saveNote(note);
        return "Saved Note";
    }

    @PutMapping({"/update/{id}"})
    public ResponseEntity<?> updateNote(@PathVariable long id, @RequestBody Note note) {
        Optional<Note> optionalNote = this.noteService.findNoteById(id);
        if (optionalNote.isPresent()) {
            Note updateNote = (Note)optionalNote.get();
            updateNote.setTitle(note.getTitle());
            this.noteService.saveNote(updateNote);
            return new ResponseEntity<>("Updated Note", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Note not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<?> deleteNote(@PathVariable long id) {
        Optional<Note> optionalNote = this.noteService.findNoteById(id);
        if (optionalNote.isPresent()) {
            Note deletedNote = (Note)optionalNote.get();
            this.noteService.deleteNote(deletedNote);
            return new ResponseEntity<>("Deleted Note", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Note not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping({"/archive/{noteId}"})
    public String archiveNote(@PathVariable long noteId) {
        this.noteService.archiveOrUnarchiveNote(noteId, true);
        return "Archived Note";
    }

    @PutMapping({"/unarchive/{noteId}"})
    public String unarchiveNote(@PathVariable long noteId) {
        this.noteService.archiveOrUnarchiveNote(noteId, false);
        return "Unarchived Note";
    }

    @GetMapping({"/activeNotes"})
    public List<Note> getActiveNotes() {
        return this.noteService.getActiveNotes();
    }

    @GetMapping({"/archivedNotes"})
    public List<Note> getArchivedNotes() {
        return this.noteService.getArchivedNotes();
    }
}
