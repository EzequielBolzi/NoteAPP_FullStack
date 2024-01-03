import React, { useState, useEffect } from 'react';
import ListNotesComponent from './components/ListNotesComponent';
import NoteComponent from './components/NoteComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return(
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
            <Route path='/' element = { <ListNotesComponent />}></Route>
            {/* // http://localhost:3000/notes */}
            <Route path='/notes' element= {<ListNotesComponent/>}></Route>
            {/* // http://localhost:3000/add-note */}
            <Route path='/add-note' element= {<NoteComponent/>}></Route>
            {/* // http://localhost:3000/edit-note/1 */}
            <Route path='/edit-note/:id' element= {<NoteComponent/>}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  
 );
}

export default App;
