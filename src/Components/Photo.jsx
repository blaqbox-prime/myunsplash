import React, { useState } from 'react'
import { Transition } from '@headlessui/react'


function Photo({id, label, url}) {

    const [isShowing,setShowing] = useState(false)

    setTimeout(() => {
        setShowing(true);
    },800);

  return (
    <Transition
     show={isShowing}
     enter="transform transition duration-[500ms] delay-[200ms]"
     enterFrom="opacity-0 scale-50"
     enterTo="opacity-100 scale-100"
     leave="transform duration-[500ms] transition ease-in-out"
     leaveFrom="opacity-100 scale-100 "
     leaveTo="opacity-0 scale-95 "
    >

    <div className='photo-container rounded-xl hover:cursor-pointer relative' data-testid="photo-container" >
        <button className='delete-photo absolute top-4 right-4 text-red-600 border border-red-600 z-10' >
            delete
        </button>
        <p className="photo-label absolute bottom-4 left-4 w-9/12 text-ellipsis text-white z-10">{label || ""}</p>
        <img src={url || ""} alt={label || "image"}
         className='Photo rounded-2xl transition duration-500 object-cover object-center'
         />
    </div>
    </Transition>
  )
}

export default Photo