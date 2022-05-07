import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "62713ae65e5f2e7fb8064689",
            "user": "6270f92fd5096d61d985e06c",
            "title": "The silent Patient",
            "description": "Suspense Mudrder",
            "tag": "public",
            "date": "2022-05-03T14:23:34.832Z",
            "__v": 0
        },
        {
            "_id": "62713ae65e5f2e7fb806cdcdc4689",
            "user": "6270f92fd5096d61d985e06c",
            "title": "The silent Patient",
            "description": "Suspense Mudrder",
            "tag": "public",
            "date": "2022-05-03T14:23:34.832Z",
            "__v": 0
        },
        {
            "_id": "62713ae65e5f2e7fb806dsd4689",
            "user": "6270f92fd5096d61d985e06c",
            "title": "The silent Patient",
            "description": "Suspense Mudrder",
            "tag": "public",
            "date": "2022-05-03T14:23:34.832Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    //Add note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "62713ae65e5f2e7fb806468955",
            "user": "6270f92fd5096d61d985e06cwss",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-05-03T14:23:34.832Z",
            "__v": 0
        };
        setNotes(notes.push(note))
    }

    //Delete note
    const deleteNote = (id) => {
        console.log("Deleting the node with id " + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    //Edit note
    const editNote = () => {

    }


    return (
        <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote }}>
            {props.children}

        </NoteContext.Provider>


    )


}

export default NoteState;
