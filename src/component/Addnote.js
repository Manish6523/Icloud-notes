import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
// import Notes from './Noteitem'
import {  toast } from 'react-toastify';

const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "My Title", description: "", tag: "General" })

    const handleClick = () => {
        addNote(note.title, note.description, note.tag)
        toast.success('Note added Successfully')
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => { ; setIsModalOpen(false); }
    return (
        <>
            <div className="flex flex-col gap-4 px-4 items-center justify-center">
                <button onClick={openModal} className="fixed md:bottom-10 mg:right-10 right-5 bottom-5 bg-red-500 text-white md:p-[20px] p-[15px]  rounded-full transform transition-transform duration-300 hover:scale-110 shadow-orange-700 hover:shadow-2xl outline-none hover:outline-gray-700">
                <img className='md:w-7 md:h-7 w-5 h-5' src="https://img.icons8.com/forma-regular/24/plus-math.png" alt="plus-math"/>
                </button>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-slate-300 w-[90%] p-6 rounded-lg shadow-lg max-w-sm">
                            <div className='flex items-start justify-between'>
                                <h2 className="text-2xl font-bold mb-4">Add Note</h2>
                                <button onClick={closeModal} className='bg-red-400 p-2 rounded-full'><img width="14" height="14" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign" /></button>
                            </div>

                            {/* form starts here */}
                                <form>
                                    <div className="mb-3">
                                        <label className="block text-black font-medium mb-1" htmlFor="title">
                                            Title
                                        </label>
                                        <input onChange={onchange} type="text" required  id="title" name='title' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter title"  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-black font-medium mb-1" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea onChange={onchange} id="description" required  name='description' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter description"  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-black font-medium mb-1" htmlFor="tag">
                                            Tag
                                        </label>
                                        <input onChange={onchange} type="text" required  id="tag" name='tag' className="w-full px-2 py-1 border border-gray-300 bg-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter tag"  />
                                    </div>
                                    <div className='flex justify-between items-center'>

                                    <button disabled={note.title.length<5 || note.description.length<5} onClick={()=>{handleClick();closeModal()}} type="text" className="w-fit bg-blue-400  py-1.5 px-3 border border-1 border-blue-600 rounded-md hover:bg-blue-600 transition-colors">
                                        Add
                                    </button>
                                    <span>minimum length is 5</span>
                                    </div>
                                </form>
                            {/* form ends here */}

                            {/* <button onClick={() => {handleClick();}} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                                Save
                            </button> */}
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Addnote
