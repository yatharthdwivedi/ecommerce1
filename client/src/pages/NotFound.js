import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const NotFound = () => {
  return (
    <Layout>
      <div className='pnf'>
        <h1 className='pnf_title'>404</h1>
        <h2 className='pnf_heading'>Page Not Found</h2>
        <Link to='/' className='pnf_btn'>Go Back</Link>
      </div>
    </Layout>
  )
}

export default NotFound