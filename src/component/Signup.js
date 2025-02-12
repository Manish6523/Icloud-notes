import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Signup = () => {
    let history = useNavigate();
    const pass = useRef("");
    const cpass = useRef("");

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass.current.value === cpass.current.value) {
            const { name, email, password } = credentials
            const response = await fetch('http://localhost:5000/api/auth/createUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            // console.log(json)
            if (json.success) {
                toast.success('Account created SuccessFully')
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('username', json.user.name);
                history('/')
            } else {
                toast.error('user already Exists')
            }
        }else{
            toast.error("Both password should be Same")
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="container m-auto bg-slate-00 shadow-2xl rounded px-8 pt-6 pb-8 my-14 w-full md:w-[60%] flex flex-col justify-center items-center">
                    <h1 className='font-bold text-xl my-3'>Sign Up</h1>
                    <div className="mb-4 w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input onChange={onchange} className="bg-slate-500 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" type="text" placeholder="Username" name='name' minLength={3} required />
                    </div>
                    <div className="mb-4 w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                            E-mail
                        </label>
                        <input onChange={onchange} className="bg-slate-500 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="E-mail" name='email' required />
                    </div>
                    <div className=" w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input ref={pass} onChange={onchange} className="bg-slate-500 shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" name='password' minLength={5} required />
                        {/* <p className="text-red text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="mb-4 w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="cpassword">
                            Confirm Password
                        </label>
                        <input ref={cpass} onChange={onchange} className="bg-slate-500 shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="cpassword" type="password" placeholder="******************" name='cpassword' minLength={5} required />
                        {/* <p className="text-red text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="w-[70%] flex items-center justify-between">
                        <button className="bg-slate-400 hover:bg-slate-300 hover:text-black transition-colors duration-200 text-white font-bold py-2 px-4 rounded" type="submit">
                            Signup
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/login">
                            Already a User?
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup
