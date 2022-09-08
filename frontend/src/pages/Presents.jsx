import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPresents, reset } from '../features/presents/presentSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import PresentItem from '../components/PresentItem';

function Presents() {
  const { presents, isLoading, isSuccess } = useSelector((state) => state.presents);

  const dispatch = useDispatch();

  // To clear the state on unmount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getPresents());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Presents</h1>
      <div className="presnets">
        <div className="present-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {presents.map((present) => (
          <PresentItem key={present._id} present={present} />
        ))}
      </div>
    </>
  )
}

export default Presents;