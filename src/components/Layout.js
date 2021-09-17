import React from 'react'
import Nav from './Nav'


export default function Layout(props) {
    return (
        <div className="flex min-h-screen bg-blue-100 flex-col">
            <Nav />
            <div className="bg-blue-100 w-full content-area">
                {props.children}
            </div>
        </div>
    )
}
