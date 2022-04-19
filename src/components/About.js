import React from 'react'
import { motion } from "framer-motion";

const About = () => { 


    return (

        <motion.div
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 100}}
        className="text-light"
        >
            This is About page
        </motion.div>

    )
}

export default About
