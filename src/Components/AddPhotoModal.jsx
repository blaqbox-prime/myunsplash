import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {ThreeDots} from "react-loader-spinner";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useForm} from 'react-hook-form';
import { imageUrlPattern } from '../Utils/helpers';
import { useContext } from 'react';
import { PhotosContext } from '../Context/PhotosProvider';
import { ErrorMessage } from '@hookform/error-message';
import * as _ from 'lodash';
import Cookies from "js-cookie";



function AddPhotoModal({isOpen, onClose}) {

   const {register, handleSubmit,reset, setValue, getValues, formState} = useForm();
    const [loading,setLoading] = useState(false); 
    const [submitting,setSubmitting] = useState(false);
    const cancelButtonRef = useRef(null)
    const [uploadfrompc, setUploadFrompc] = useState(false);
    const ctx = useContext(PhotosContext);
    const {addPhoto} = ctx;


    const onSubmit = async (data) => {
      
      if (!imageUrlPattern.test(data.url)){
        console.log(formState.errors.url)
        toast.error("Invalid image url");
        return;
      }

    const {url, label} = data;

    if (!url || !label)
      return toast.warn("All fields must be filled", {
        position: 'top-center',
        hideProgressBar: 'true',
        theme: "colored",
      });


    setSubmitting(true);

    const username = Cookies.get("username");
    const res = await fetch(`http://localhost:8080/api/users/${username}/add-photo`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        label: _.kebabCase(_.toLower(label)),
        url: url,
        date_added: new Date().toISOString(),
      })
    });

    setSubmitting(false);

    if (res.status !== 200){
      return toast.info("Failed to add photo");}

    reset();  
    onClose()
    
    res.json().then((newImage) => addPhoto(newImage))

    return toast.success("Photo added successfully");

  }

    const onImageSelect = async (e) => {

      setUploadFrompc(false);

      const input = e.target;  
      if(input.files.length < 1) return console.error("Nothing was selected");
      const image = input.files[0];  
      console.log(input.files[0]);

      setLoading(true);
      
      const body = new FormData();
      body.set('key','48217b5b43d4335de93c49d7da2004d5');
      body.append("image",image);

      const res = await fetch(`https://api.imgbb.com/1/upload`,{
        method: "POST",
        body: body
      });

      
      if(res.status != 200) return toast.warn("Failed to upload photo to cloud");
      
     res.json().then((data) => {
      console.log(data.data.url);
      setValue("url",data.data.url,{shouldTouch: true, shouldDirty: true}); 
      console.log(getValues());
      setLoading(false);
     })


    }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { onClose();}} data-testid="add-photo-modal">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative dialog-panel transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-6">
                        Add a new photo
                      </Dialog.Title>
                      
                           <div className="flex flex-col mb-6">
                           <label htmlFor="label" className='block mb-1 text-gray-900'>Label</label>
                           <ErrorMessage errors={formState.errors} name="label" render={({message}) => <p className='text-sm text-red-600'>{message}</p>} />
                           <input type="text" name="label-input" id="label-input" placeholder='Title of your image'
                           {...register("label", {required: "This is required"})}
                           className='form-input border border-gray-30 rounded-xl px-4 outline-none block'
                           />
                           
                           </div>

                           <div className="flex flex-col mb-4" >
                           <label htmlFor="PhotoUrl" className='block mb-1 text-gray-900'>Photo Link</label>
                           <ErrorMessage errors={formState.errors} name="url" render={({message}) => <p className='text-sm text-red-600'>{message}</p>} />
                           <input type="text" name="url-input" id="url-input" 
                           disabled={false} 
                           placeholder={"link to uploaded image"}
                            {...register("url", {required: "This is required"})}
                            className='form-input border border-gray-300 rounded-xl px-4 outline-none block'
                            />
                            <p className='text-xs text-[#4fa94d] mt-2'>Link to uploaded file will display here.</p>
                           </div>

                           <hr className='mb-4'/>

                           <div className="flex flex-col">
                           <label htmlFor="image-input" className='block mb-2 text-green-700 cursor-pointer hover:underline'
                           onClick={() => {setUploadFrompc(!uploadfrompc)}}
                           >Upload from computer?</label>

                           {uploadfrompc && <input type="file" name="image-input" id="image-input" placeholder='Uplaod Image'
                            accept='.jpg, .png, .gif, .webp, .jpeg'
                            onChange={(e) => {onImageSelect(e)}}
                            className=''
                            />}

                          
                              <ThreeDots 
                              height="50" 
                              width="50" 
                              radius="9"
                              color="#4fa94d" 
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={loading}
                               />
                            

                           </div>
                        
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center content-center shadow-md rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    { submitting ? <ThreeDots 
                              height="25" 
                              width="25" 
                              radius="5"
                              color="#ffffff" 
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={submitting}
                               /> :"Submit"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center outline-none px-4 py-2 text-base font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {onClose();setUploadFrompc(false);}}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        
      </Dialog>
    </Transition.Root>
  )
}

export default AddPhotoModal


