import React from 'react'
import {FiUser} from 'react-icons/fi'

function Avatar({username}) {
    return <div className="aspect-square h-full rounded-full text-lg bg-gray-700 text-white flex items-center justify-center hover:cursor-pointer">
      {username ? username.charAt(0).toUpperCase() : <FiUser color='#fff' size={"26px"}/>}
    </div>;
  }

export default Avatar