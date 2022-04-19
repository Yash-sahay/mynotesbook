import React, { useState, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import { motion, AnimatePresence } from "framer-motion";

  

const Navbar = () => {


    const context = useContext(noteContext);
    const { getUserData, userDetails, setalert } = context;

    let location = useLocation();
    const navigate = useNavigate();

    const [usertoggle, setusertoggle] = useState(false);


    const logOut = () => {
        localStorage.removeItem('token');
        setalert({msg: 'Logged Out', alert: true, color: 'danger'});

        setTimeout(() => {
            setalert({msg: 'Logged Out', alert: false});
        }, 2000);

        navigate('/login');
        setusertoggle(false);
    }
    const userShow = () => {
        if(usertoggle === false){
            setusertoggle(true);
        }else{
            setusertoggle(false);
        }
        getUserData();
    }

    return (
        <>
        <nav style={{borderBottom: '1px solid rgb(22 22 29)'}} className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-4">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                {localStorage.getItem('token') === null && <div className="d-flex"> 
                    <Link style={{boxShadow: 'none !important', textDecoration: 'none'}} className="fw-bold px-2  text-light mx-1" to="/login" role="button">Login</Link>
                    <Link style={{boxShadow: 'none !important', textDecoration: 'none'}} className="fw-bold px-2  text-light mx-1" to="/signup" role="button">Signup</Link>
                    </div>}
                    {localStorage.getItem('token') && <div className="d-flex"> 
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link fw-bold ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link fw-bold ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <div style={{zIndex: 101}} onClick={userShow} className="mx-3 d-flex align-items-center text-light">
                        <i className="fa-solid fa-circle-user fa-2x"></i>
                    </div>
                    
                    {/* <button onClick={logOut} className="btn btn-danger btn-sm mx-1" role="button">LogOut</button> */}
                    </div>}
                </div>
            </div>
        </nav>
        <AnimatePresence exitBeforeEnter>
            {usertoggle && <motion.div
            initial={{opacity: 0, display: 'none'}}
            animate={{opacity: 1, display: 'flex'}}
            exit={{opacity: 0,color: 'white', transition: {duration: .5}}}
            style={{zIndex: '100', backdropFilter: 'blur(4px) brightness(0.8)', top: 0, width: '100vw', height: '100vh'}} className="user-card-parent position-fixed">
                <div style={{height: '100vh'}} className="container d-flex justify-content-center align-items-center">
                    
                    
                    <motion.div
                    key='user'
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 100, transition: {duration: .16}}}
                    style={{borderRadius: '10px', background: '#2c2c3a' , width: '15rem'}} className="text-light py-3 shadow-lg">
                        <div className="col py-2 d-flex justify-content-center">
                            <div className="h4 text-uppercase">{userDetails.name}</div>
                        </div>
                        <div className="col d-flex justify-content-center py-3">
                            <i className="fa-solid fa-circle-user fa-4x"></i>
                        </div>
                        <div style={{color: 'grey'}} className="col d-flex justify-content-center mb-4">{userDetails.email}</div>
                        <hr style={{margin: '2px',color: "#5a5a5a", padding: "1px"}} className="hr"></hr>
                        <motion.div initial={{background: 'transparent'}} animate={{ background: 'transparent'}} whileHover={{background: 'white', transition: {duration: 5}}}
                         onClick={userShow} className="fw-bold mx-2 btn col d-flex justify-content-center text-primary">Close</motion.div>
                        <hr style={{margin: '2px',color: "#5a5a5a", padding: "1px"}} className="hr"></hr>
                        <motion.div
                        initial={{background: 'transparent', color: 'rgb(220, 53, 69)'}} animate={{ background: 'transparent'}} whileHover={{background: 'rgb(220, 53, 69)', color: 'white', transition: {duration: 5}}}
                        onClick={logOut} className="fw-bold btn col d-flex justify-content-center mt-3 mx-2">Log Out</motion.div>
                    </motion.div>
                </div>
            </motion.div>}
            </AnimatePresence>
            </>
    )
}

export default Navbar
