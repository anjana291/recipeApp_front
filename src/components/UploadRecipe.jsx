import React, { useEffect, useState } from 'react';
import { BiCaretLeftSquare } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import camera from '../assets/camera-icon.png'
import { toast } from 'react-toastify';
import { uploadRecipeAPI } from '../services/allAPI';

function UploadRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({
    title: "",
    calories: "",
    time: "",
    description: "",
    serves: "",
    cuisine: "",
    ingredients: "",
    instructions: "",
    thumbnail: ""
  })
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [key, setKey] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    else {
      setToken("")
    }
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    const { title, calories, time, description, serves, cuisine, ingredients, instructions, thumbnail } = recipeDetails

    if (!title || !calories || !time || !description || !serves || !cuisine || !ingredients || !instructions || !thumbnail) {
      toast.warning('Please fill all the fields')
    }
    else {
      try {
        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("calories", calories)
        reqBody.append("time", time)
        reqBody.append("description", description)
        reqBody.append("serves", serves)
        reqBody.append("cuisine", cuisine)
        reqBody.append("ingredients", ingredients)
        reqBody.append("instructions", instructions)
        reqBody.append("thumbnail", thumbnail)

        if (token) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
          const result = await uploadRecipeAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleCancel()
            toast.success('Recipe added successfully')
          }
          else{
            toast.warning(result.response.data)
            handleCancel()
        }
        }

      } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
      }
    }
  }

  const handleCancel = () => {
    setRecipeDetails({
      title: "",
      calories: "",
      time: "",
      description: "",
      serves: "",
      cuisine: "",
      ingredients: "",
      instructions: "",
      thumbnail: ""
    })
    setPreview("")
    setKey(!key)
  }

  useEffect(() => {
    if (recipeDetails.thumbnail) {
      setPreview(URL.createObjectURL(recipeDetails.thumbnail))
    }
  }, [recipeDetails.thumbnail])


  return (
    <>
      <div className='w-11/12 md:w-8/12 mx-auto rounded-md p-5 my-10 shadow-slate-950 shadow'>
        <Link to={`/profile/${id}`}>
          <div className='flex justify-start mt-2'>
            <span className='text-2xl'><BiCaretLeftSquare /></span>
            <span className='ms-1 font-semibold text-center'>Back to Profile</span>
          </div>
        </Link>
        <h1 className='text-center font-bold text-2xl mt-3'>Upload Recipe</h1>
        <form className='mt-5 flex flex-col justify-center items-center rounded-md'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4'>
            <div className=''>
              <div className='my-3'>
                <input type="text" placeholder="Recipe Title" className="input input-bordered w-full focus:outline-none" value={recipeDetails.title} onChange={(e) => { setRecipeDetails({ ...recipeDetails, title: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <input type="text" placeholder="Calories" className="input input-bordered w-full focus:outline-none" value={recipeDetails.calories} onChange={(e) => { setRecipeDetails({ ...recipeDetails, calories: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <input type="text" placeholder="Preparation Time" className="input input-bordered w-full focus:outline-none" value={recipeDetails.time} onChange={(e) => { setRecipeDetails({ ...recipeDetails, time: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <label htmlFor="thumbnail">
                  <input type="file" id='thumbnail' name='thumbnail' className="input input-bordered w-full hidden" key={key} onChange={(e) => { setRecipeDetails({ ...recipeDetails, thumbnail: e.target.files[0] }) }} />
                  <img src={preview ? preview : `${camera}`} alt="Thumbnail" width={'200px'} className='md:ms-20' />
                </label>
              </div>
            </div>
            <div className=''>
              <div className='my-3'>
                <input type="text" placeholder="Description" className="input input-bordered w-full focus:outline-none" value={recipeDetails.description} onChange={(e) => { setRecipeDetails({ ...recipeDetails, description: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <input type="text" placeholder="Number of People Served" className="input input-bordered w-full focus:outline-none" value={recipeDetails.serves} onChange={(e) => { setRecipeDetails({ ...recipeDetails, serves: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <input type="text" placeholder="Cuisine" className="input input-bordered w-full focus:outline-none" value={recipeDetails.cuisine} onChange={(e) => { setRecipeDetails({ ...recipeDetails, cuisine: e.target.value }) }} />
              </div>
              <div className='my-3'>
                <textarea placeholder='Ingredients' className="input input-bordered w-full focus:outline-none h-20" value={recipeDetails.ingredients} onChange={(e) => { setRecipeDetails({ ...recipeDetails, ingredients: e.target.value }) }}></textarea>
              </div>
              <div className='my-3'>
                <textarea placeholder='Instructions' className="input input-bordered w-full focus:outline-none h-20" value={recipeDetails.instructions} onChange={(e) => { setRecipeDetails({ ...recipeDetails, instructions: e.target.value }) }}></textarea>
              </div>
            </div>
          </div>
        </form>

        <div className='flex justify-end mt-5'>
          <button className='btn btn-outline' onClick={handleCancel}>Cancel</button>
          <button className='btn ms-2 bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white' onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </>
  )
}

export default UploadRecipe
