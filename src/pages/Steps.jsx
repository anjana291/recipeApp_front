import React from 'react'
import { FaEdit, FaSearch, FaUserPlus, FaUtensils } from 'react-icons/fa'

function Steps() {
    return (
        <>
            <div className="mt-12 px-8 md:px-20 text-center mb-16" style={{minHeight:'80vh'}}>
                <h2 className="text-3xl font-bold mb-20">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                   
                    <div className="flex flex-col items-center  border shadow shadow-emerald-900 rounded-xl p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3">
                        <FaUserPlus className="text-green-700 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Sign Up</h3>
                        <p className="text-gray-600 mt-2">Create an account to share your recipes.</p>
                    </div>

                    
                    <div className="flex flex-col items-center  border shadow shadow-emerald-900 rounded-xl p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3">
                        <FaEdit className="text-green-700 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Create a Recipe</h3>
                        <p className="text-gray-600 mt-2">Add your ingredients, instructions, and photos to create a new recipe.</p>
                    </div>

                    
                    <div className="flex flex-col items-center  border shadow shadow-emerald-900 rounded-xl p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3">
                        <FaSearch className="text-green-700 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Search Recipes</h3>
                        <p className="text-gray-600 mt-2">Use our search bar to find recipes by name.</p>
                    </div>

                    
                    <div className="flex flex-col items-center  border shadow shadow-emerald-900 rounded-xl p-5 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3">
                        <FaUtensils className="text-green-700 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Enjoy and Share</h3>
                        <p className="text-gray-600 mt-2">Try new recipes, share with friends, and enjoy delicious meals!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Steps