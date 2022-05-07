import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all note
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MGY5MmZkNTA5NmQ2MWQ5ODVlMDZjIn0sImlhdCI6MTY1MTU3MTEwOH0.GtNsxUe6RZtQePRpMvh8ZG090tTtMWVXe1-FPvB2LDI",
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)

    }
    //Add a note

    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MGY5MmZkNTA5NmQ2MWQ5ODVlMDZjIn0sImlhdCI6MTY1MTU3MTEwOH0.GtNsxUe6RZtQePRpMvh8ZG090tTtMWVXe1-FPvB2LDI",
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))

    }


    //Delete note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MGY5MmZkNTA5NmQ2MWQ5ODVlMDZjIn0sImlhdCI6MTY1MTU3MTEwOH0.GtNsxUe6RZtQePRpMvh8ZG090tTtMWVXe1-FPvB2LDI",
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    //Edit note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MGY5MmZkNTA5NmQ2MWQ5ODVlMDZjIn0sImlhdCI6MTY1MTU3MTEwOH0.GtNsxUe6RZtQePRpMvh8ZG090tTtMWVXe1-FPvB2LDI",


            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();


        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }

    }


    return (
        <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>
            {props.children}

        </NoteContext.Provider>


    )


}

export default NoteState;
