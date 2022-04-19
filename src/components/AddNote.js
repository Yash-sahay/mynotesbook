import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { motion, AnimatePresence } from "framer-motion";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const context = useContext(noteContext);
  const { notes, addNote, getNotes, editNote } = context;
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [showAllNotes, setshowAllNotes] = useState(false);
  const [unote, setUnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isModalOpen, setisModalOpen] = useState(false);

  // opan modal //
  const updateNote = (currentNote) => {
    setisModalOpen(true);
    setUnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // close modal
  const handleClick1 = (e) => {
    editNote(unote.id, unote.etitle, unote.edescription, unote.etag);
    setisModalOpen(false);
  };

  const onChange1 = (e) => {
    setUnote({ ...unote, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const showAllNotesToggle = () => {
    if (showAllNotes) {
      setshowAllNotes(false);
    } else {
      setshowAllNotes(true);
    }
  };

  const variants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        ease: 'easeIn',
      }
    }
  }

  const item = {
    hidden: {
        opacity: 0,
        x: 50
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5
        }
    }
}

  return (
    <>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(5px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { duration: 0.4 },
            }}
            className={`modal fade show pt-5`}
            style={{ display: "block" }}
            id="exampleModal"
            tabIndex="-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 100,
                transition: { type: "spring", duration: 0.3 },
              }}
              className="modal-dialog"
            >
              <div className="modal-content bg-dark">
                <div
                  style={{ borderBottom: "2px solid #2f2f2f" }}
                  className="d-flex justify-content-between p-3 "
                >
                  <h5 className="modal-title text-light" id="exampleModalLabel">
                    Edit Note
                  </h5>
                  <button
                    className="btn-close p-2 bg-light"
                    onClick={() => {
                      setisModalOpen(false);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label text-light">
                        Title
                      </label>
                      <input
                        type="text"
                        className="feedback-input"
                        id="etitle"
                        name="etitle"
                        value={unote.etitle}
                        aria-describedby="emailHelp"
                        onChange={onChange1}
                        minLength={5}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="form-label text-light"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        className="feedback-input"
                        id="edescription"
                        name="edescription"
                        value={unote.edescription}
                        onChange={onChange1}
                        minLength={5}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label text-light">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="feedback-input"
                        id="etag"
                        name="etag"
                        value={unote.etag}
                        onChange={onChange1}
                      />
                    </div>
                  </form>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "0.75rem",
                    borderTop: "2px solid #2f2f2f",
                    borderBottomRightRadius: "calc(0.3rem - 1px)",
                    borderBottomLeftRadius: "calc(0.3rem - 1px)",
                  }}
                  className="modal-footer"
                >
                  <button
                    disabled={
                      unote.etitle.length < 5 || unote.edescription.length < 5
                    }
                    onClick={handleClick1}
                    type="submit"
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      <div className="container mt-5">
        <center>
          <h2 className="text-light">Add a Note</h2>
        </center>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-light">
              Title
            </label>
            <input
              type="text"
              className="feedback-input"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label text-light">
              Description
            </label>
            <input
              type="text"
              className="feedback-input"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label text-light">
              Tag
            </label>
            <input
              type="text"
              className="feedback-input"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <motion.div
          initial={{ scale: 1, transition: { duration: 0.01 } }}
          whileHover={{
            scale: 1.03,
            transition: { type: "spring", stiffness: 500, damping: 10 },
          }}
          whileTap={{
            scale: 1,
            transition: { type: "spring", stiffness: 500, damping: 10 },
          }}
          className="div">
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-disable"
            onClick={handleClick}
          >
            Add Note <i class="fa-solid fa-file-circle-plus"></i>
          </button>
          </motion.div>
          <motion.div
            initial={{ scale: 1, transition: { duration: 0.01 } }}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 500, damping: 10 },
            }}
            whileTap={{
              scale: 1,
              transition: { type: "spring", stiffness: 500, damping: 10 },
            }}
            className="col py-3"
          >
            <button onClick={showAllNotesToggle} type="button">
              Show Notes <i class="fa-solid fa-file"></i>
            </button>
          </motion.div>
        </form>
      </div>
      <div>
            <AnimatePresence exitBeforeEnter>
          {showAllNotes && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(4px) brightness(0.8)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
                transition: { duration: 0.6 },
              }}
              style={{
                zIndex: 10,
                top: "57px",
                width: "100vw",
                height: "100vh",
                left: "0",
              }}
              className="col position-fixed d-flex justify-content-end"
            >
              <motion.div
                className="position-relative pb-5"
                initial={{
                  opacity: 0,
                  backdropFilter: "blur(0px)",
                  right: "-50vw",
                }}
                animate={{
                  opacity: 1,
                  backdropFilter: "blur(4px) brightness(0.8)",
                  right: "-0vw",
                }}
                exit={{
                  opacity: 0,
                  backdropFilter: "blur(0px)",
                  right: "-50vw",
                }}
                transition={{ ease: "easeIn" }}
                style={{
                  zIndex: 10,
                  top: "0",
                  width: "50vw",
                  height: "100vh",
                  right: "-50vw",
                  background: "rgb(35 35 47)",
                }}
              >
                <div className="col text-light p-4 d-flex justify-content-between">
                  <h3>Your Notes</h3>
                  <motion.i
                    initial={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.2, opacity: 1 }}
                    whileTap={{ scale: 1 }}
                    onClick={showAllNotesToggle}
                    style={{ color: "rgb(63 63 97)" }}
                    class="fa-solid fa-2x fa-circle-xmark"
                  ></motion.i>
                </div>
                <hr
                  style={{ margin: "0px", color: "#3e3e57", padding: "1px" }}
                ></hr>
                <div
                  style={{ overflowX: "hidden", height: "calc(100% - 50px)" }}
                  className="pb-5"
                >
                  <div className="col p-2">
                    {notes.length === 0 && "No notes to display"}
                  </div>
                  <motion.div 
                  initial="hidden"
                  animate="show"
                  variants={variants}
                  exit="hidden"
                  >
                  {notes
                    .map((note) => {
                      return (
                        <Noteitem
                          variants={item}
                          key={note._id}
                          updateNote={updateNote}
                          note={note}
                        />
                      );
                    })
                    .reverse()}
                    </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
          </AnimatePresence>
      </div>
    </>
  );
};

export default AddNote;
