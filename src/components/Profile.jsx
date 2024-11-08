import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { MdEmail } from 'react-icons/md'
import { BsYoutube } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa6'
import Card from './Card'
import { BiCaretLeft, BiCaretRight, BiTrash } from 'react-icons/bi'
import EditRecipe from './EditRecipe'
import { Link, useParams } from 'react-router-dom'
import { deleteUserRecipesAPI, getUserRecipesAPI, updateProfileAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { baseUrl } from '../services/baseURL'
import { editContext } from '../context/Context'

function Profile() {
  const { editResponse } = useContext(editContext)
  const [edit, setEdit] = useState(false)
  const [userRecipes, setUserRecipes] = useState([])
  const [loggedInUser, setLoggedInUser] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    about: "",
    instagram: "",
    youtube: "",
    profilepic: "",
  })
  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  const [updateStatus, setUpdateStatus] = useState(false)
  const { id } = useParams()

  const handleEditButton = () => {
    setEdit(true)
  }

  const handleCloseButton = () => {
    setEdit(false)
    setUserDetails({
      username: "",
      email: "",
      password: "",
      about: "",
      instagram: "",
      youtube: "",
      profilepic: "",
    })
    setPreview("")
  }

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password, about: user.about, instagram: user.instagram, youtube: user.youtube, uploadrecipe: user.uploadrecipe
      })
      setExistingImage(user.profilepic)
      setLoggedInUser(user._id)
    }
  }, [updateStatus])

  useEffect(() => {
    getUserRecipes()
  }, [editResponse])

  useEffect(() => {
    if (userDetails.profilepic) {
      setPreview(URL.createObjectURL(userDetails.profilepic))
      console.log(preview);
    }
    else {
      setPreview("")
    }
  }, [userDetails.profilepic])

  const getUserRecipes = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      let reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserRecipesAPI(reqHeader)
      setUserRecipes(result.data);
    }
  }

  const deleteRecipe = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      console.log(token);
      let reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteUserRecipesAPI(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        getUserRecipes()
      }
      else {
        toast.error('Something went wrong')
      }
    }
  }

  // console.log(userDetails);
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { id,
      username,
      email,
      password,
      about,
      instagram,
      youtube, profilepic } = userDetails
    if (!instagram || !youtube || !about) {
      toast.warning('Please fill the form')
    }
    else {
      const reqBody = new FormData()

      reqBody.append("username", username)
      reqBody.append("password", password)
      reqBody.append("email", email)
      reqBody.append("about", about)
      reqBody.append("instagram", instagram)
      reqBody.append("youtube", youtube)
      preview ? reqBody.append("profilepic", profilepic) : reqBody.append("profilepic", existingImage)

      const token = sessionStorage.getItem("token")

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdateStatus(!updateStatus)
          setEdit(false)
        }
        else {
          console.log(result);
          toast.error('Something went wrong')
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdateStatus(!updateStatus)
          setEdit(false)
        }
        else {
          console.log(result);
          toast.error('Something went wrong')
        }
      }
    }
  }

  return (
    <>
      <Header />
      <div className="h-20"></div>
      <div className='w-11/12 md:w-7/12 mx-auto rounded-md mt-5 pt-2 pb-16 mb-20 shadow-slate-950 shadow'>
        <div className='flex justify-center mt-5'>

          {existingImage == "" ?
            <img src="https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640" alt="Profile" className='h-32 w-32 md:h-44 md:w-44 object-cover rounded-full' />
            :
            <img src={preview ? preview : `${baseUrl}/uploads/${existingImage}`} alt="" className='h-32 w-32 md:h-44 md:w-44 object-cover rounded-full' />
          }
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-semibold text-2xl'>{userDetails.username}</h1>
          <div className='mt-1 flex text-2xl gap-2 cursor-pointer'>
            <Link to={`${userDetails.youtube}`}><BsYoutube className='text-emerald-700' /></Link>
            <Link to={`mailto:${userDetails.email}`}><MdEmail className='text-emerald-700' /></Link>
            <Link to={`${userDetails.instagram}`}><FaInstagram className='text-emerald-700' /></Link>
          </div>
          <div>
            <p className='text-center mt-5 text-xl font-semibold'>About Me</p>
            <p className='px-10 mt-5 text-justify'>{userDetails.about}</p>
          </div>


          {loggedInUser === id && <div>
            <div className='flex items-center justify-between px-6 md:px-0'>
              <p className='text-center mt-5 text-xl font-semibold'>My Recipes</p>
              <Link to={`/upload-recipe/${id}`}><button className='btn bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white mt-8'>Upload Recipe</button></Link>
            </div>
            <div className="overflow-x-auto mt-9 max-h-52">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Recipe</th>
                    <th>Cuisine</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userRecipes?.length > 0 ?
                    userRecipes?.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.title}</td>
                        <td>{item.cuisine}</td>
                        <td>
                          <EditRecipe recipeProp={item} />
                          <button className='btn btn-sm ms-1 bg-red-600 text-white hover:bg-red-600' onClick={() => deleteRecipe(item._id)}><BiTrash /></button>
                        </td>
                      </tr>
                    ))
                    :
                    <tr> <td>No Recipes added yet</td></tr>
                  }
                </tbody>
              </table>
            </div>
            <div className='flex justify-center'>
              <button className='btn bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white mt-8' onClick={handleEditButton}>Edit profile</button>
            </div>
          </div>
          }

        </div>
      </div>


      {edit &&
        <div className='w-11/12 md:w-7/12 mx-auto rounded-md mt-5 pt-2 pb-16 mb-20 shadow-slate-950 shadow'>
          <div className='flex justify-center mt-5'>

            <label htmlFor='image'>
              <input
                id='image'
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setUserDetails({ ...userDetails, profilepic: e.target.files[0] })}
              />

              {existingImage == "" ?
                <img src="https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640" alt="Profile" className='h-32 w-32 md:h-44 md:w-44 object-cover rounded-full' />
                :
                <img src={preview ? preview : `${baseUrl}/uploads/${existingImage}`} alt="" className='h-32 w-32 md:h-44 md:w-44 object-cover rounded-full' />
              }
            </label>


          </div>
          <div className='flex flex-col items-center space-y-4 mt-3'>
            <h1 className='font-semibold text-2xl'>{userDetails.username}</h1>

            <input type="text" placeholder="Email" className="input input-bordered w-11/12 md:w-8/12 lg:w-6/12 max-w-xs focus:outline-none" value={userDetails.email} readOnly />
            <input type="text" placeholder="Instagram" className="input input-bordered w-11/12 md:w-8/12 lg:w-6/12 max-w-xs focus:outline-none" value={userDetails.instagram} onChange={(e) => setUserDetails({ ...userDetails, instagram: e.target.value })} />
            <input type="text" placeholder="Youtube" className="input input-bordered w-11/12 md:w-8/12 lg:w-6/12 max-w-xs focus:outline-none" value={userDetails.youtube} onChange={(e) => setUserDetails({ ...userDetails, youtube: e.target.value })} />
          </div>
          <div>
            <div className='mt-8'>
              <p className='text-center mt-5 text-lg md:text-xl font-semibold'>About Me</p>
              <div className='flex justify-center mt-4'>
                <textarea name="" placeholder="Write about yourself" className="input input-bordered h-20 w-11/12 md:w-8/12 lg:w-6/12 max-w-xs focus:outline-none" value={userDetails.about} onChange={(e) => setUserDetails({ ...userDetails, about: e.target.value })}></textarea>
              </div>
            </div>

          </div>
          <div>
          </div>
          <div className='flex justify-end mt-10 me-8'>
            <button className='btn btn-outline me-5' onClick={handleCloseButton}>Cancel</button>
            <button className='btn bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white' onClick={handleUpdate}>Save Changes</button>
          </div>
        </div>}
      <Footer />
    </>
  )
}

export default Profile