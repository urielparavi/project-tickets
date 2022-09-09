import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { getPresent, closePresent } from '../features/presents/presentSlice';
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';


const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

// #root => it look our root in index HTML
Modal.setAppElement('#root');

function Present() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { present, isLoading, isSuccess, isError, message } = useSelector((state) => state.presents);

  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { presentId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getPresent(presentId));
    dispatch(getNotes(presentId));
    // eslint-disable-next-line
  }, [isError, message, presentId]);

  // Close present
  const onPresentClose = () => {
    dispatch(closePresent(presentId));
    toast.success('PresentClosed');
    navigate('/presents');
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, presentId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong!</h3>
  }

  return (
    <div className='present-page'>
      <header className="present-header">
        <BackButton url='/presents' />
        <div className="present-sm">
          <h2>
            Present ID: {present._id}
            <span className={`status status-${present.status}`}>
              {present.status}
            </span>
          </h2>
        </div>
        <h3>Date Submitted: {new Date(present.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {present.product}</h3>
        <hr />
        <div className="present-desc">
          <h3>Description of Issue</h3>
          <p>{present.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {present.status !== 'closed' && (
        <button onClick={openModal} className="btn btn--sm">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        {<h2>Add Note</h2>}
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {present.status !== 'closed' && (
        <button onClick={onPresentClose} className='btn btn-block btn-purple'>Close Present</button>
      )}
    </div>
  )
}

export default Present
