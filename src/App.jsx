import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import ViewRecipe from './components/ViewRecipe'
import Profile from './components/Profile'
import UploadRecipe from './components/UploadRecipe'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import PublicProfile from './components/PublicProfile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/recipes' element={<Recipes />} />
        <Route path='/view-recipe/:id' element={<ViewRecipe />} />

        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile-public/:id' element={<PublicProfile />} />
        <Route path='/upload-recipe/:id' element={<UploadRecipe />} />

      </Routes>
      <ToastContainer position="top-center"
        autoClose={5000} theme="dark"
        transition:Bounce />
    </>
  )
}

export default App


// /upload-recipe