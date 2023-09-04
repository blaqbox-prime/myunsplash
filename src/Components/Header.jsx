import React, { useContext, useState } from 'react'
import {MdSearch} from 'react-icons/md'
import { PhotosContext } from '../Context/PhotosProvider';
import AddPhotoModal from './AddPhotoModal';
import Cookies from "js-cookie";
import Avatar from './Avatar';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctx = useContext(PhotosContext);

  return (
    <header id="page-header" data-testid="header" className='flex my-6 w-full justify-between' >
        <div className="left flex ">
        <img src="my_unsplash_logo.svg" alt="logo" data-testid="header-logo"/>
        <div className="searchbar ml-4 border rounded-xl flex items-center" id="searchbar" data-testid="searchbar">
            <MdSearch className='ml-2 text-gray-400'/>
            <input type="text" className='block outline-none ml-2' name="searchbox" id="searchbox" data-testid="searchbox" placeholder='Search by name'
              value={ctx.searchLabel} onChange={(e) => ctx.setSearchLabel(e.target.value)}
            />
        </div>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button className='bg-green-500 rounded-xl text-white font-bold' id="addPhoto" data-testid="btn-addPhoto" onClick={()=>{setIsModalOpen(true)}}>Add a photo</button>
            <Avatar username={Cookies.get("username")} />
        </div>

        <AddPhotoModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}/>
    </header>
  )
}

export default Header


