import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Notes = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context
    
    return (
        <>
            <div className=' w-[350px] rounded-xl shadow-md shadow-blue-700 bg-blue-200 border border-1 border-blue-600 p-3 hover:bg-green-200 transition-colors'>
                <div className="headers mb-2 flex items-center justify-between">
                    <h1 className="title font-bold font-serif">{note.title}</h1>
                    <h3 className='mx-3 px-3 font-semibold rounded-md border bg-blue-400 border-black border-1'>{note.tag}</h3>
                </div>
                <hr className='border border-t-blue-600 border-1' />
                {/* <hr className='border border-t-blue-600 border-1' /> */}
                
                <li className="description py-2">
                    {note.description}
                </li>

                <hr className='my-1 border border-t-blue-600 border-1' />
                <div className="Date flex items-center justify-between">
                    <span className='font-mono font-bold'><span>Date: </span>{note.date.slice(0,10)}</span>
                    <span className='flex gap-2 mx-3'>

                        <button onClick={() => {deleteNote(note._id);  }} className='p-2 hover:bg-blue-500 bg-blue-400 rounded-full border border-black border-1'>
                            <img width="18" height="18" src="https://img.icons8.com/forma-thin/24/delete.png" alt="delete" />                        
                        </button>

                        <button onClick={()=>{updateNote(note)}} className='p-2 hover:bg-blue-500 bg-blue-400 rounded-full border border-black border-1'>
                            <img width="18" height="18" src="https://img.icons8.com/ios/30/edit--v1.png" alt="edit--v1" />
                        </button>
                        
                    </span>
                </div>
            </div>
        </>
    )
}

export default Notes;
