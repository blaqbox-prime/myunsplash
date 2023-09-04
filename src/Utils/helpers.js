// export const urlPatternRegex = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);
// export const urlPlaceholder = 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8b2NlYW58ZW58MHx8fHwxNjc1OTUwNTUy&ixlib=rb-4.0.3&q=80';
export const imageUrlPattern = new RegExp(/\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i);
export function ImageToBase64(image) {

    if(!image) return null;
  
    let base64string;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const srcData = fileReader.result;
      base64string = srcData;
    };
    
    fileReader.readAsDataURL(image);
    
    return base64string;
  }

export const baseUrl = 'http://localhost:8080/api';