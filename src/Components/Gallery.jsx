import React, { useContext} from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { PhotosContext } from '../Context/PhotosProvider';
import NoPhotosFound from './NoPhotosFound';
import Photo from './Photo'
import { InfinitySpin } from 'react-loader-spinner';

function Gallery() {

  const {photos, error, isLoading} = useContext(PhotosContext);
  // const [gallaryPhotos, setGalleryPhotos] = useState(false);
    
  return isLoading ? <div className='flex mt-36 justify-center'>
  <InfinitySpin 
  width='600'
  color="#4fa94d"
/>
  </div> : error ? <NoPhotosFound /> : (
    <div data-testid="gallery">
         <ResponsiveMasonry 
                data-testid="responsive-masonry"
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry data-testid="masonry-grid" gutter='24px'>
                  {
                    photos.map(photo => <Photo key={photo._id} label={photo.label} url={photo.url}/>)
                  }
                </Masonry>
            </ResponsiveMasonry>
    </div>
  )
}

export default Gallery