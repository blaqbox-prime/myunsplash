import {useState, useEffect, createContext} from 'react';
import * as _ from 'lodash';
import {useDebouncedEffect} from '../Hooks/useDebounceEffect'
export const PhotosContext = createContext();


export default function PhotosProvider({children}){
    //vars
    const [photos, setPhotos] = useState([]);
    const [Searchlabel, setSearchLabel] = useState('');
    const [error, setError] = useState([]);
    const [isLoading, setLoading] = useState(false);

    //effects
    useEffect(() => {
      
      getAllPhotos()  
    
    }, []);

    useDebouncedEffect(() => {

        if(!Searchlabel){
            getAllPhotos();
            return setSearchLabel('');
        } else {
            SearchByLabel();
        }

        // console.log("debounce call")

    },300,[Searchlabel])
    

    //methods
    const getAllPhotos = () => {
        setLoading(true);
        setError(false);
        fetch("http://localhost:8080/api/photos/sorted")
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setPhotos(data)
        })
        .catch(err => {
            console.log(err);
            setError(err);
            setPhotos([]);
        }).finally(() => {
            setLoading(false);
        })
    }

    const SearchByLabel = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/photos/${_.kebabCase(Searchlabel.toLowerCase())}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.length > 0 ? setPhotos(data) : setPhotos([]);
        })
        .catch(err => {
            console.log(err);
            setPhotos([]);
        }).finally(() => {
            setLoading(false)
        })
    }

    const addPhoto = (newImage) => {
        const newList = [newImage,...photos];
        setPhotos(newList);
    }



    const value = {
        photos,
        getAllPhotos,
        addPhoto,
        SearchByLabel,
        Searchlabel,
        setSearchLabel,
        isLoading,
        error
    }
    return (
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    );
}