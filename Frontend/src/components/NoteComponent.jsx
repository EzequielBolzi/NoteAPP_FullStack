import React, { useEffect, useState } from 'react';
import { createNote } from '../services/NoteService';
import { updateNote } from '../services/NoteService';
import { useNavigate, useParams } from 'react-router-dom';

const NoteComponent = () => {

    const [title, setTitle] = useState('')
    const {id} = useParams();

    const navigator = useNavigate();

    function saveOrUpdateNote(e){
        e.preventDefault();

        const note = {title}
        console.log(note)
        if(id){
            updateNote(id,note).then((response)=>{
                console.log(response.data);
                navigator('/notes');
            }).catch(
                error => {
                    console.error(error);
                }) }
                else {
                    createNote(note).then((response)=>{
                        console.log(response.data);
                        navigator('/notes')
                }).catch(
                    error => {
                        console.error(error);
                })

        }

 }
 function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Note</h2>
    } else{
        return <h2 className='text-center'>Add Note</h2>

    }

 }
 return (
   <div className='container'>
       <br /><br />
       <div className='row'>
           <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
                pageTitle()
            }

               <div className='card-body'>
                <form>
                  <div className='form-group mb-2'>
                      <label className='form-label'>Note Title:</label>
                      <input
                          type = 'text'
                          placeholder='Enter Note Title'
                          name='title'
                          value={title}
                          className='form-control'
                          onChange={(e) => setTitle(e.target.value)}
                      >
                      </input>
                  </div>
                  </form>
                  <button className='btn btn-success' onClick={saveOrUpdateNote}>Sumbit</button>
               </div>
           </div>
       </div>
   </div>
 )
}

export default NoteComponent
