import { motion } from 'framer-motion';
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from "../context/notes/noteContext"


const Signup = () => {
    const context = useContext(noteContext);
    const { setalert } = context;

    const [signupCredentials, setsignupCredentials] = useState({ name: "", phone: "", password: "", email: "" }) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: signupCredentials.name, phone: signupCredentials.phone, password: signupCredentials.password, email: signupCredentials.email})
        });
        const json = await response.json()
        console.log(json.authtoken);
        if (json.authtoken){
            // Save the auth token and redirect
            setalert({msg: 'Signed In', alert: true, color: 'success'});

            setTimeout(() => {
                setalert({msg: 'Signed In', alert: false});
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
        setsignupCredentials({...signupCredentials, [e.target.name]: e.target.value})
    }

    return (
        <motion.div
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 100}}
        >
            <form  onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="h1 text-light">Sign Up</div>
                <div className="col-12 mb-3">
                    <label htmlFor="email" className="form-label text-light">Name</label>
                    <input type="text" className="feedback-input" value={signupCredentials.name} onChange={onChange} name="name" placeholder='name' />
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label text-light">Email</label>
                    <input type="email" className="feedback-input" value={signupCredentials.email} onChange={onChange} name="email" placeholder='eg@mail.com'/>
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label text-light">Phone</label>
                    <input type="text" className="feedback-input" value={signupCredentials.phone} onChange={onChange} name="phone" placeholder='phone'/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input type="password" className="feedback-input" value={signupCredentials.password} onChange={onChange} name="password" placeholder='password'/>
                </div>

                <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </motion.div>
    )
}

export default Signup;
