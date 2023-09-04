import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const FormButton = ({text, isloading}) => {
  return (
    <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              { isloading ? <ThreeDots 
                              height="25" 
                              width="25" 
                              radius="5"
                              color="#ffffff" 
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={isloading}
                               /> : text}
            </button>
  )
}

export default FormButton