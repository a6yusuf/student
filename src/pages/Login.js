import React, {useState, useEffect, useRef} from "react";
import {useHistory} from 'react-router-dom' ;
import Axios from 'axios';
import Cookie from 'js-cookie';

export default function Login() {

  const inputEl = useRef(null);
  const [errors, setErrors] = useState({result: ''});
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({email: '', password: ''});


  const baseUrl = 'http://127.0.0.1:8000';
  // const baseUrl = 'http://127.0.0.1:8000';

  useEffect(() => {
    inputEl.current.focus();
  }, [])

  let history = useHistory();


  const handleData = e => {
    setData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
      setLoad(true);
      Axios.post(`${baseUrl}/api/auth/login`, data)
      .then(res => {
        setLoad(false);
        Cookie.set("token", res.data.access_token);
        localStorage.setItem("auth", JSON.stringify({loggedIn: true, user: res.data.user}));
        history.push("/home");
      })
      .catch(err => {
        setLoad(false);
        setErrors(err.response.data.error)
    });
  }
  

  return (
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-purple-600"
          ></div>
          <div className=" mx-auto px-4 h-full" style={{width: '100%', height: '100%'}}>
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3 flex justify-center">
                      <h1 className="text-4xl font-bold p-2">Student Attendance</h1>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-black text-center mb-3 font-bold">
                      <h3>Admin Sign in</h3>
                    </div>
                    <div className="text-red-500 text-center mb-3 font-bold">
                      <h3>{errors.result}</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          ref={inputEl}
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Username"
                          name="email"
                          id="email"
                          required
                          style={{ transition: "all .15s ease" }}
                          onChange={handleData}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          name="password"
                          id="password"
                          required
                          style={{ transition: "all .15s ease" }}
                          onChange={handleData}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                            Sign In {load && '...Please wait'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-blue-900"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                  <a
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    className="text-blue-900"
                  >
                    <small>Create new account</small>
                  </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}