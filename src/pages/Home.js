import React from 'react'
import Layout from './../components/Layout';
import Axios from 'axios';
import EnrollTable from './EnrollTable';

export default function Home() {

    const [value, setValue] = React.useState('idle')
    const [list, setList] = React.useState(undefined);
    const [modeloading, setModeloading] = React.useState(false)

    const modes = [
        {mode: 'idle', title: 'Idle'}, 
        {mode: 'time_in', title: 'Time In'}, 
        {mode: 'time_out', title: 'Time Out'},
        {mode: 'enroll', title: 'Enroll'}
    ];
    
    const handleRadio = e => {
        // console.log(e.target.value)
        setModeloading(true)
        setValue(prev => prev = e.target.value)
        Axios.post('http://v-trackerx.herokuapp.com/api/setmode', {mode: e.target.value})
            .then(res => {
                setModeloading(false)
                console.log('mode: ',res.data)
            })
    } 

    React.useEffect(() => {
        Axios.get('http://v-trackerx.herokuapp.com/api/home')
            .then(res => {
                console.log(res.data.enroll)
               setValue(prev=> prev = res.data.mode ? res.data.mode : 'idle')
               setList(prev => prev = res.data.enroll)
            })
    }, [])

    // const handleMode = ()
    return (
        <Layout>
             <div className="p-10" style={{minHeight: "100%"}}>
                <div>
                    <h1 className="text-xl font-bold p-1">
                        Welcome, Admin!
                    </h1>
                    <div className="flex justify-center">
                        <div className="rounded shadow-lg bg-gray-200 p-2 m-2 w-7/12">
                            <h1 className="text-xl font-bold p-1">Switch device mode</h1>
                            <div className="p-2 m-2">
                                {modes.map((mode, index)=> {
                                    return <div className="relative w-full mb-3" key={index}>
                                    <label className="text-gray-700">
                                        <span className="ml-1 text-lg font-bold">{mode.title}</span>
                                        <input type="radio" className="ml-10 text-lg" name="mode" value={mode.mode} checked={value === mode.mode} onChange={handleRadio}/>
                                </label>
                                </div>
                                })}
                             </div>
                             {modeloading && <div className="m-2 flex justify-center">
                                 <h1 className="text-sm font-bold p-2">
                                     Switching mode...
                                 </h1>
                             </div>}
                        </div>
                    </div>
                    {list !== undefined  && list.length !== 0 && <EnrollTable data={list} />}
                    {(list === undefined || list.length === 0) && 
                        <div className="text-center bg-gray-200 mt-10 p-5 rounded-lg shadow-2xl" >
                        <h3 className="font-semibold m-5 text-lg" style={{paddingTop: 10}}>There is no enrollment information</h3>
                    </div>}
                </div>
            </div>
        </Layout>
    )
}
