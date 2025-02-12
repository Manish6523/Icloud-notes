import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';

const Notes = () => {
    
    let history = useNavigate();
    const ref = useRef(null)
    const context = useContext(noteContext)
    const { notes, allNotes, editNote } = context
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        // console.log("clal raha he")
        
        if(localStorage.getItem('token')){
            allNotes()
        }else{
            history('/login')
        }
        // eslint-disable-next-line 
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => { ; setIsModalOpen(false); }

    const handleClick = () => {
        // console.log('id=', note.id)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        toast.success('Edited Successfully')
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    return (
        <>

            <Addnote />
            <div className="flex flex-col gap-4 px-4 items-center justify-center">
                <button ref={ref} onClick={openModal} className="absolute top-0 left-0 bg-slate-600 text-white p-[3px] rounded-full transform transition-transform duration-300 hover:scale-110"></button>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-slate-300 w-[90%] p-6 rounded-lg shadow-lg max-w-sm">
                            <div className='flex items-start justify-between'>
                                <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
                                <button onClick={closeModal} className='bg-red-400 p-2 rounded-full'><img width="14" height="14" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign" /></button>
                            </div>

                            {/* hsbjhsjhcjhsdbcjhsdbjcbsdsdcsdscss */}
                            <form>
                                <div className="mb-3">
                                    <label className="block text-black font-medium mb-1" htmlFor="title">
                                        Title
                                    </label>
                                    <input onChange={onchange} value={note.etitle} minLength={2} type="text" id="etitle" name='etitle' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter title" required />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-black font-medium mb-1" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea onChange={onchange} value={note.edescription} minLength={2} id="edescription" name='edescription' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter description" required />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-black font-medium mb-1" htmlFor="tag">
                                        Tag
                                    </label>
                                    <input onChange={onchange} value={note.etag} minLength={2} type="text" id="etag" name='etag' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter tag" required />
                                </div>
                            </form>
                            {/* ksdnksdcbksbdkcbskcbksjbcksdbkcbsk */}
                            <div className='flex justify-between items-center'>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 6} onClick={() => { handleClick(); closeModal(); }} className="w-fit bg-green-400  py-1.5 px-3 border border-1 border-green-600 rounded-md hover:bg-green-600 transition-colors">
                                    Save
                                </button>
                                <span>minimum length is 5</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-serif font-bold text-center my-3'>Your Notes</h1>
                <div className='flex gap-7 flex-wrap items-center justify-center'>
                    {notes.length === 0 && (<div className='text-xl font-medium flex items-center justify-center flex-col'>
                        <span>No Notes to display </span>
                        <span className='flex'>start by clicking on 
                            <span>+</span> button
                        </span>
                        </div>)}
                    {notes.map((note) => {
                        return (
                            <Noteitem key={note._id} updateNote={updateNote} openModal={openModal} note={note} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes;
