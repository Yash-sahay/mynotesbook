import Notes from './Notes';
import { motion } from "framer-motion";

export const Home = () => {

    return (
            <motion.div 
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 100}}
            >
                <Notes/>
            </motion.div>
    )
}
