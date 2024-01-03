import React,{useEffect, useState} from 'react';
import { deleteNote, listNotes, archiveNote, unarchiveNote, listActiveNotes, listArchivedNotes } from '../services/NoteService';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap'; // Import Bootstrap components
import { FaEdit, FaTrashAlt, FaArchive, FaUnlock } from 'react-icons/fa'; // Import Font Awesome icons

const ListNotesComponent = () => {

 const [activeNotes, setActiveNotes] = useState([])
 const [archivedNotes, setArchivedNotes] = useState([])
 const [showActive, setShowActive] = useState(true); 
 const [notes, setNotes] = useState([])

 const navigator = useNavigate();

 useEffect(()=> { 
   getAllNotes();
 }, [])
 useEffect(()=> { 
   if(showActive) {
       listActiveNotes().then((response) =>{
           setActiveNotes(response.data);
       }).catch(error => {
           console.error(error);
       })
   } else {
       listArchivedNotes().then((response) =>{
           setArchivedNotes(response.data);
       }).catch(error => {
           console.error(error);
       })
   }
 }, [showActive]) 
 
 function getAllNotes(){
    if (showActive) {
        listActiveNotes().then((response) =>{
            setActiveNotes(response.data);
        }).catch(error => {
            console.error(error);
        })
    } else {
        listArchivedNotes().then((response) =>{
            setArchivedNotes(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
 }
 
 
 function addNote(){
   navigator('/add-note')
 }

 function updateNote(id){
   navigator(`/edit-note/${id}`)
 }

function removeNote(id){
   console.log(id)
   deleteNote(id).then((response)=> {
       getAllNotes(); 
   }).catch(error =>{
       console.error(error);
   })
}

 
 function archiveNoteHandler(id){
    console.log('Archive button clicked');
    archiveNote(id).then((response)=> {
        // Remove the archived note from activeNotes
        setActiveNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        // Add the archived note to archivedNotes
        setArchivedNotes(prevNotes => [...prevNotes, response.data]);
    }).catch(error =>{
        console.error(error);
    })
 }
 
 function unarchiveNoteHandler(id){
    console.log('Unarchive button clicked');
    unarchiveNote(id).then((response)=> {
        // Remove the unarchived note from archivedNotes
        setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        // Add the unarchived note to activeNotes
        setActiveNotes(prevNotes => [...prevNotes, response.data]);
    }).catch(error =>{
        console.error(error);
    })
  }
  

 
  return (
    <div className='container'> 
      <br /> 
        <h2 className='text-center'></h2>
        <div className="button-container">
            <Button variant="dark" className="btn-sm" onClick={addNote} >Add note</Button>
            <Button variant="dark" className="btn-sm" onClick={() => setShowActive(!showActive)} >{showActive ? 'Show Archived Notes' : 'Show Active Notes'}</Button> 
        </div>
        <br></br>
        <Table striped bordered hover>
   <thead>
       <tr>
           <th>Note Title </th>
           <th>{showActive ? 'Active Notes' : 'Archived Notes'}</th>
       </tr>
   </thead>
   <tbody>
       {
           showActive ? activeNotes.map(note => 
               <tr key={note.id}>
                  <td>{note.title}</td>
                  <td>
                      <Button variant="info" onClick={()=> updateNote(note.id)}><FaEdit /></Button>
                      <Button variant="danger" onClick={()=> removeNote(note.id)}><FaTrashAlt /></Button>
                      {!note.archived && <Button variant="warning" onClick={()=> archiveNoteHandler(note.id)}><FaArchive /></Button>}
                      {note.archived && <Button variant="primary" onClick={()=> unarchiveNoteHandler(note.id)}><FaUnlock /></Button>}
                  </td>
               </tr>
           ) : archivedNotes.map(note => 
               <tr key={note.id}>
                  <td>{note.title}</td>
                  <td>
                      <Button variant="info" onClick={()=> updateNote(note.id)}><FaEdit /></Button>
                      <Button variant="danger" onClick={()=> removeNote(note.id)}><FaTrashAlt /></Button>
                      {!note.archived && <Button variant="warning" onClick={()=> archiveNoteHandler(note.id)}><FaArchive /></Button>}
                      {note.archived && <Button variant="primary" onClick={()=> unarchiveNoteHandler(note.id)}><FaUnlock /></Button>}
                  </td>
               </tr>
           )
       }
   </tbody>
</Table>

      <br></br>
    </div>
    )
   }
   
   export default ListNotesComponent