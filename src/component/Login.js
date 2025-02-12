import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';

const Login = () => {
    let history = useNavigate();
    

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json)

        if(json.success){
            toast.success('LoggedIn SuccessFully')
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.user.name);
            history('/')
        }else{
            toast.error('Invalid Credentials')
        }

    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <div className="container m-auto bg-slate-00 shadow-xl rounded px-8 pt-6 pb-8 my-14 w-full md:w-[60%] flex flex-col justify-center items-center">
                    <h1 className='font-bold text-xl my-3'>Log In</h1>

                    <div className="mb-4 w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                            E-mail
                        </label>
                        <input value={credentials.email} onChange={onchange} className="bg-slate-500 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" name='email' type="text" placeholder="E-mail" />
                    </div>
                    <div className="mb-6 w-[70%]">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input value={credentials.password} onChange={onchange} className="bg-slate-500 shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" name='password' type="password" placeholder="******************" />
                        <p className="text-red text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="w-[70%] flex items-center justify-between">
                        <button className="bg-slate-400 hover:bg-slate-300 hover:text-black transition-colors duration-200 text-white font-bold py-2 px-4 rounded hover:border-black" type="submit">
                            Login
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/signup">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login
