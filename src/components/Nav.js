import React from 'react'
import { useHistory } from 'react-router'
import Cookie from 'js-cookie';

export default function Nav() {
    const history = useHistory()

    const toggleNavbar = (collapseID) => {
        document.getElementById(collapseID).classList.toggle("hidden");
        document.getElementById(collapseID).classList.toggle("block");
      }

      const handleLogout = () => {
        Cookie.remove("token");
        localStorage.setItem("auth", JSON.stringify({loggedIn: false, user: ''}));
        history.push("/signin");
      }
    
    return (
        <nav className="bg-purple-600 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <h1 className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            // style={{fontFamily: 'Lato'}}
            >Student Attendance</h1>
            <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={()=> toggleNavbar('example-collapse-navbar')}
            >
            <i className="text-gray-200 fas fa-bars"></i>
            </button>
        </div>
        <div
            className="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none hidden"
            id="example-collapse-navbar"
        >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center justify-center">
                <h1 className="lg:text-white cursor-pointer lg:hover:text-gray-900 hover:bg-gray-300 text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                onClick={() => history.push('/home')}><span className="inline-block ml-2" 
                // style={{fontFamily: 'Lato',}}
                >Home</span></h1>
            </li>
            <li className="flex items-center justify-center">
                <h1
                className="lg:text-white cursor-pointer lg:hover:text-gray-900 hover:bg-gray-300 text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                onClick={() => history.push('/enroll')}
                ><span className="inline-block ml-2">Enroll</span></h1>
            </li>
            <li className="flex items-center justify-center">
                <h1
                className="lg:text-white cursor-pointer lg:hover:text-gray-900 hover:bg-gray-300 text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                onClick={() => history.push('/attendance')}
                ><span className="inline-block ml-2">Attendance</span></h1>
            </li>
            <li className="flex items-center justify-center">
                <h1
                className="lg:text-white cursor-pointer lg:hover:text-gray-900 hover:bg-gray-300 text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                onClick={handleLogout}
                ><span className="inline-block ml-2">Logout</span></h1>
            </li>
            
            </ul>
        </div>
    </div>
</nav>

    )
}
