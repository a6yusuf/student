import React from 'react'
import Layout from './../components/Layout';
import  Axios from 'axios';

export default function Enroll() {

    const [successful, setSuccessful] = React.useState(false)
    const [notified, setNotified] = React.useState(false)
    const [finger, setFinger] = React.useState(false)
    const [card, setCard] = React.useState(true)
    const [expectFin, setExpectFin] = React.useState(false)
    const [data, setData] = React.useState({})
    const [status, setStatus] = React.useState('no')
    const [succ, setSucc] = React.useState(0)

    const handleData = e => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const notify = () => {
        Axios.get('http://127.0.0.1:8000/api/notify')
        .then(res => {
            console.log(res.data)
            setExpectFin(true)
            setCard(false)
        })
    }

    const submit = (e) => {
        e.preventDefault()
        // console.log('data: ', data)
        Axios.post('http://127.0.0.1:8000/api/submit', data)
        .then(res => {
            // console.log("Res", res.data)
            setStatus(prev => prev = res.data.status.status)
            setSucc(prev => prev = res.data.success)
            setSuccessful(true)
        })
    }

    React.useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/enroll')
        .then(res => {
            // console.log(res.data)
            setStatus(prev => prev = res.data.status.status)
            setSucc(prev => prev = res.data.success)
        })
    }, [])
    return (
        <Layout>
             <div className="p-10" style={{minHeight: "100%"}}>
             <section className="w-full justify-center items-center">
                <div className="flex justify-center items-center flex-col">
               {successful && <div className="bg-green-500 w-11/12 p-2 m-2 mb-5 text-white text-lg text-center">
                    Student enrolled successfully
                </div>}
                {finger && <div className="bg-green-500 w-11/12 p-2 m-2 mb-5 text-white text-lg text-center">
                    Fingerprint and card added successfully
                </div>}
                {/* {finger && <div className="bg-red-500 w-11/12 p-2 m-2 mb-5 text-white text-lg text-center">
                    Fingerprint and card could not be saved
                </div>} */}
                {/* @endif
                @if ($success == 4 && $status->status != 'ok') */}
                {expectFin && status !== 'ok' && <div className="bg-blue-400 w-11/12 p-2 m-2 mb-5 text-white text-lg text-center">
                    Expecting fingerprint...
                </div>}
                {/* @endif
                @if ($success == 0) */}
                    {card && succ === 0 && status !== 'ok' && <div className="w-7/12 shadow-lg p-5 mx-20 mb-4 bg-gray-100 rounded text-center">
                        <h1 className="whitespace-no-wrap cursor-pointer hover:bg-purple-700 bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        // href="{{route('notify')}}"
                        onClick={notify}>
                        Add Fingerprint and card
                        </h1>
                    </div>}
                {/* @endif
                    @if ( $status->status == 'ok' && $success == 4) */}

                    { status === 'ok'  && <form onSubmit={submit} className="w-7/12 shadow-lg p-5 mx-20 mb-4 bg-gray-100 rounded">
                        {/* @csrf */}
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Name"
                            name="name"
                            id="name"
                            onChange={handleData}
                            required
                            // style="transition: all .15s ease;"
                        />
                        </div>

                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="matric_num"
                        >
                            Matric Number
                        </label>
                        <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Matric Number"
                            name="matric_num"
                            id="matric_num"
                            required
                            onChange={handleData}
                            // style="transition: all .15s ease;"
                        />
                        </div>
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="level"
                        >
                            Level
                        </label>
                        <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Level"
                            name="level"
                            id="level"
                            onChange={handleData}
                            required
                            // style="transition: all .15s ease;"
                        />
                        </div>

                        <div className="text-center mt-6">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                            // style="transition: all .15s ease;"
                        >
                            Submit
                        </button>
                        </div>
                    </form>}
                    {/* @endif */}
                </div>
            </section>
            </div>
        </Layout>
    )
}
