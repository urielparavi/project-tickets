import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below..</p>
      </section>

      <Link to='/new-present' className='btn btn-reverse btn-block btn-present'>
        <FaQuestionCircle /> Create New Present
      </Link>

      <Link to='/presents' className='btn btn-block btn--hover'>
        <FaTicketAlt /> View My Presents
      </Link>
    </>
  )
}

export default Home
