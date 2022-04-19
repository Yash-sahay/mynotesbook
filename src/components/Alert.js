import React,{useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import noteContext from "../context/notes/noteContext"


export const Alert = () => {

    const context = useContext(noteContext);
    const { alert, setalert } = context;

    const closeAlert = () => {
        setalert({alert: false})
    }

  return (
      <>
    <div style={{ top: '90vh', right: '5vw', zIndex: '10000' }} className="justify-content-end align-items-end position-fixed">
      <div className="div">
        <AnimatePresence exitBeforeEnter>
      {alert.alert && <motion.div
        key='alerts'
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileHover={{ scale: 1, cursor: "grab" }} 
        initial={{opacity: 0, x: 100}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0 , x: 100, transition: {duration: .3}}}
        className={`toast show align-items-center text-white bg-${alert.color} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">{alert.msg}</div>
          <button
            class="btn-close btn-close-white me-2 m-auto"
            onClick={closeAlert}
          ></button>
        </div>
      </motion.div>}
      </AnimatePresence>
      </div>
    </div>
    </>
  );
};
