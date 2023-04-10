import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const Users = () => {
  return (
    <Layout title="Users">
        <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                All Users
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users