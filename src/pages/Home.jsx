import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Card from '../components/Card'
import RecentRecipe from '../components/RecentRecipe'
import Steps from './Steps'

function Home() {
    return (
        <>
            <Header />
            <div className="h-20"></div>
            <Main />
            <Steps />
            <Footer />
        </>
    )
}

export default Home