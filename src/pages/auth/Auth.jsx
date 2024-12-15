import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { Button } from '@/components/ui/button'
import "./Auth.css"

const Auth = () => {
    //state active 10h36min
    const [active, setActive] = useState(true)
    return (
        <div className='loginContainer'>
        <div className='box h-[30rem] w-[25rem]'>
            <div className='minContainer login'>
                <div className='loginBox w-full px-10 space-y-5'>
                    {active ? <Signup /> : <Login />}
                    <div className="flex items-center justify-between text-sm"> {/* Added text-sm class for smaller text */}
                        {active ? (
                            <>
                                <span className="whitespace-nowrap">Already have an account ?</span> {/* Prevent text wrapping */}
                                <Button className="hover:bg-gray-300" variant='ghost' onClick={() => setActive(!active)}>Signin</Button>
                            </>
                        ) : (
                            <>
                                <span className="whitespace-nowrap">Don't have an account ?</span> {/* Prevent text wrapping */}
                                <Button className="hover:bg-gray-300" variant='ghost' onClick={() => setActive(!active)}>Signup</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    )
}

export default Auth