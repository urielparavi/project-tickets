import React from 'react'
import { Link } from 'react-router-dom'

function PresentItem({ present }) {
  return (
    <div className='present'>
      <div>{new Date(present.createdAt).toLocaleString('en-US')}</div>
      <div>{present.product}</div>
      <div className={`status status-${present.status}`}>
        {present.status}
      </div>
      <Link to={`/present/${present._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default PresentItem