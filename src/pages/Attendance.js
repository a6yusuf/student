import React from 'react'
import Layout from './../components/Layout';
import AttendTable from './AttendTable';
import  Axios  from 'axios';

export default function Attendance() {
    const [list, setList] = React.useState(undefined);

    React.useEffect(() => {
        Axios.get('http://v-trackerx.herokuapp.com/api/attendance')
            .then(res => {
                console.log(res.data)
                setList(prev=> prev = res.data.enroll)
            })
    }, [])

    return (
        <Layout>
             <div className="p-10" style={{minHeight: "100%"}}>
                <div className="p-5 m-5 flex justify-center shadow-lg bg-gray-200">
                    <h1 className="font-bold text-3xl p-2">Student Attendance</h1>
                </div>
                {list !== undefined  && list.length !== 0 && <AttendTable data={list} />}
                {(list === undefined || list.length === 0) && 
                    <div className="text-center bg-gray-200 mt-10 p-5 rounded-lg shadow-2xl" >
                    <h3 className="font-semibold m-5 text-lg" style={{paddingTop: 10}}>There is no attendance information</h3>
                </div>}
            </div>
        </Layout>
    )
}
