import { motion } from 'framer-motion';
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from "../context/notes/noteContext"


const Login = () => {
    const context = useContext(noteContext);
    const { setalert } = context;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""}) 


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            setalert({msg: 'Logged In', alert: true, color: 'success'});

            setTimeout(() => {
                setalert({msg: 'Logged In', alert: false});
            }, 2000);
            localStorage.setItem('token', json.authtoken); 
            navigate("/");

        }
        else{
            setalert({msg: 'Invalid User', alert: true, color: 'warning'});

            setTimeout(() => {
                setalert({msg: 'Invalid User', alert: false});
            }, 2000);
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <motion.div
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 100}}
        >
            <form  onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="h1 text-light">Log In</div>
                <div className="col-12 mb-3">
                    <label htmlFor="email" className="form-label text-light">Email address</label>
                    <input type="email" className="feedback-input" value={credentials.email} onChange={onChange} id="email" name="email" placeholder='eg@mail.com' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input type="password" className="feedback-input" value={credentials.password} onChange={onChange} name="password" placeholder="password" />
                </div>

                <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </motion.div>
    )
}

export default Login
