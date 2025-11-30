import { useState } from 'react'
import './App.css'
import Homescreen from './pages/homescreen';
import longLogo from "../public/NeuralOdds_logo_long_transparent.png"

function App() {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const [tab, setTab] = useState<Number>(0);

    return (
        <>
            <div id="header" className='w-screen h-24 bg-tertiary position-fixed flex flex-row justify-between items-center'>
                <div id='leftSide' className='flex flex-row h-[calc(100%)] px-6 py-3'>
                    <img src={longLogo} className='mx-auto my-auto h-full w-full'></img>
                </div>
                <div id="rightSide" className='flex flex-row px-6 py-3'>
                    {loggedIn ? null : 
                    <button id='normalBttn' className='px-2 py-1 mx-3.5'>Sign in</button>}
                </div>
            </div>
            <div id='mainBody'>
                {tab == 0 ? <Homescreen />: null}
            </div>
        </>
    )
    }

export default App
