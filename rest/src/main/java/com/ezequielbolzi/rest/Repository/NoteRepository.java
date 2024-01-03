package com.ezequielbolzi.rest.Repository;

import com.ezequielbolzi.rest.Model.Note;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NoteRepository extends JpaRepository<Note, Long> {
    @Modifying
    @Query("update Note n set n.archived = ?1 where n.id = ?2")
    @Transactional
    void setArchivedStatusById(boolean status, Long id);

    List<Note> findByArchivedFalse();

    List<Note> findByArchivedTrue();
}
