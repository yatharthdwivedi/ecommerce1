import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {

    const [auth,setAuth] = useAuth()

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("")

 useEffect(()=>{
    const {name,email,address,phone} = auth?.user
    setName(name)
    setPhone(phone)
    setAddress(address)
    setEmail(email)
 },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/auth/profile`,
        { name, email, password, phone, address }
      );

     if(data?.error) {
        toast.error(data?.error)
     }
     else {
        setAuth({...auth, user: data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile Updated')
     }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>User Profile</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              disabled
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Phone no"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile