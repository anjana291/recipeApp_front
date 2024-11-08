import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { getAllRecipeAPI } from '../services/allAPI'
import { BiSearchAlt2 } from 'react-icons/bi'

function Recipes() {
    const [allRecipes, setAllRecipes] = useState([])
    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        getAllRecipes()
    }, [searchKey])

    const getAllRecipes = async () => {
        const result = await getAllRecipeAPI(searchKey)
        setAllRecipes(result.data)
    }

    return (
        <>
            <Header />
            <div className="h-20"></div>
            <div className="flex justify-center items-center pb-5">
                <input type="text" placeholder="Search" className="input input-bordered h-12 w-40 md:w-1/3 focus:outline-none"  onChange={(e)=>setSearchKey(e.target.value)}/>
                <span className='text-xl -ml-8'><BiSearchAlt2 /></span>
            </div>
            <div className='container mt-16 mx-auto px-5 mb-20'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto justify-items-center">
                    
                    {allRecipes?.map((item)=>(
                        <Card key={item._id} recipess={item}/>
                    ))}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Recipes