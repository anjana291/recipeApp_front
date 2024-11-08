import React, { useContext, useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import camera from '../assets/camera-icon.png'
import { baseUrl } from '../services/baseURL'
import { toast } from 'react-toastify'
import { editRecipeAPI } from '../services/allAPI'
import { editContext } from '../context/Context'

function EditRecipe({ recipeProp }) {
    const { setEditResponse } = useContext(editContext)
    const [recipeDetails, setRecipeDetails] = useState({
        title: recipeProp.title,
        calories: recipeProp.calories,
        time: recipeProp.time,
        description: recipeProp.description,
        serves: recipeProp.serves,
        cuisine: recipeProp.cuisine,
        ingredients: recipeProp.ingredients,
        instructions: recipeProp.instructions,
        thumbnail: ""
    })
    const [preview, setPreview] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    // console.log(recipeProp);

    const handleCancel = () => {
        setIsModalOpen(false)
        setRecipeDetails({
            title: recipeProp.title,
            calories: recipeProp.calories,
            time: recipeProp.time,
            description: recipeProp.description,
            serves: recipeProp.serves,
            cuisine: recipeProp.cuisine,
            ingredients: recipeProp.ingredients,
            instructions: recipeProp.instructions,
            thumbnail: ""
        })
        setPreview("")
    }

    const handleClose = () =>{
        setIsModalOpen(false)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, calories, time, description, serves, cuisine, ingredients, instructions, thumbnail } = recipeDetails
        if (!title || !calories || !time || !description || !serves || !cuisine || !ingredients || !instructions) {
            toast.warning('Please fill the details')
        }
        else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("calories", calories)
            reqBody.append("time", time)
            reqBody.append("description", description)
            reqBody.append("serves", serves)
            reqBody.append("cuisine", cuisine)
            reqBody.append("ingredients", ingredients)
            reqBody.append("instructions", instructions)
            preview ? reqBody.append("thumbnail", thumbnail) : reqBody.append("thumbnail", recipeProp.thumbnail)

            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editRecipeAPI(recipeProp._id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    handleClose()
                    setEditResponse(result.data)
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
                const result = await editRecipeAPI(recipeProp._id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    handleClose()
                    setEditResponse(result.data)
                }
                else {
                    console.log(result);
                    toast.error('Something went wrong')
                }
            }

        }
        // console.log('Recipe added');
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (recipeDetails.thumbnail) {
            setPreview(URL.createObjectURL(recipeDetails.thumbnail))
        }
    }, [recipeDetails.thumbnail])

    return (
        <>
            <button className='btn btn-sm bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-primary-content' onClick={() => setIsModalOpen(true)}><BiEditAlt /></button>

            {isModalOpen && (
                <dialog id="my_modal_5" className="modal modal-top sm:modal-middle" open>
                    <div className="modal-box w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
                        <div className='w-11/12 md:w-11/12 mx-auto rounded-md p-1 my-10 shadow-slate-950 shadow'>

                            <h1 className='text-center font-bold text-2xl mt-3'>Edit Recipe : Recipe title</h1>
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
                                                <input type="file" id='thumbnail' name='thumbnail' className="input input-bordered w-full hidden" onChange={(e) => { setRecipeDetails({ ...recipeDetails, thumbnail: e.target.files[0] }) }} />
                                                <img src={preview ? preview : `${baseUrl}/uploads/${recipeProp.thumbnail}`} alt="Thumbnail" width={'200px'} className='md:ms-20' />
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
                            <div className='mt-5 flex flex-col justify-center items-center rounded-md'>

                            </div>
                            <div className='flex justify-end mt-5 p-3'>
                                <button className='btn btn-outline' onClick={handleCancel}>Cancel</button>
                                <button className='btn ms-2 bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white' onClick={handleUpdate}>Edit</button>

                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}

export default EditRecipe