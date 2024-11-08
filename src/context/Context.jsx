import React, { createContext, useState } from 'react'

export const editContext = createContext()

function Context({ children }) {
    const [editResponse, setEditResponse] = useState({ })
    return (
        <>
            <editContext.Provider value={{editResponse,setEditResponse}}>
                {children}
            </editContext.Provider>
        </>
    )
}

export default Context