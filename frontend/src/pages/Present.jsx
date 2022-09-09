import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getPresent, reset, closePresent } from '../features/presents/presentSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';

function Present() {
  const { present, isLoading, isSuccess, isError, message } = useSelector((state) => state.presents);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { presentId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getPresent(presentId));
    // eslint-disable-next-line
  }, [isError, message, presentId]);

  // Close present
  const onPresentClose = () => {
    dispatch(closePresent(presentId));
    toast.success('PresentClosed');
    navigate('/presents');
  };

  if (isLoading) {
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
            Ticket ID: {present._id}
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
      </header>
      {present.status !== 'closed' && (
        <button onClick={onPresentClose} className='btn btn-block btn-purple'>Close Present</button>
      )}
    </div>
  )
}

export default Present
