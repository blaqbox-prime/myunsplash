import React, { useState } from 'react'
import Signin from './Signin'
import Register from './Register';

const Auth = () => {
    const [active, setActive] = useState(0);

    const pages = [
        <Signin isShowing={active == 0} setIsShowing={setActive}/>,
        <Register isShowing={active == 1} setIsShowing={setActive}/>
    ]

  return (
    pages[active]
  )
}

export default Auth