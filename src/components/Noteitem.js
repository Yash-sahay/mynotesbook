import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import { motion,AnimatePresence, useAnimation } from "framer-motion";



const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const controls = useAnimation()

    function handleDragEnd(event, info) {
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset < -200 || velocity < -700) {
            controls.start({ x: "-100%", transition: { duration: 0.2 } })
            deleteNote(note._id)
        } else {
            controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } })
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
        <motion.div 
        variants={props.variants}
        drag="x"
        dragDirectionLock
        dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        whileTap={{ scale: 0.8, cursor: "grabbing" }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileHover={{ scale: 1, cursor: "grab" }} 
        onDragEnd={handleDragEnd}
        exit={{x: 50, opacity: 0}}
        className="mx-4 mb-4">
            <div style={{background: 'rgb(51 51 69)', borderRadius: '15px'}} className="card my-3 shadow">
                <div className="card-body">
                    <div className="d-flex">
                        <div className="col px-2 fw-bold d-flex align-items-center">
                        <h4 style={{color: 'rgb(0 0 0)'}} className="fw-bold">{note.title}</h4>
                        </div>
                        <div className="col pb-4 d-flex flex-row justify-content-end">
                        <div style={{ width: '35px', height: '35px', backgroundColor: 'rgb(247 234 234 / 15%)' , color: 'rgb(248 71 71)'}} className="mx-2 rounded-circle d-flex align-items-center justify-content-center">
                        <i className="far fa-trash-alt mx-2 fw-bold" onClick={()=>{deleteNote(note._id)}}></i>
                        </div>
                        <div style={{ width: '35px', height: '35px', backgroundColor: 'rgb(247 234 234 / 15%)', color: 'rgb(255 255 255 / 61%)'}} className="rounded-circle d-flex align-items-center justify-content-center">
                            <i className="far fa-edit mx-2 fw-bold" onClick={()=>{updateNote(note)}}></i>
                        </div>
                        </div>
                    </div>
                    <p style={{background: 'rgb(62 62 87)',  color: '#050505', fontWeight: 600 , borderRadius: '15px'}} className="card-text py-3 px-3">{note.description}</p>
                    <div className="d-flex align-items-center">
                    <div style={{width: 'fit-content', color: 'rgb(104 104 142)'}} className='fw-bold'>Tag : &nbsp;</div>
                    <div style={{width: 'fit-content', color: 'rgb(190 190 190)', background: '#3d3d4d'}} className="rounded-pill d-flex align-items-center justify-content-center py-1 px-2 my-2">{!note.tag ? 'General': note.tag}</div>
                    </div>
                </div>
            </div>
        </motion.div>
        </AnimatePresence>
    )
}

export default Noteitem
