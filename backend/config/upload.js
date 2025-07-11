import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'




cloudinary.config({
    cloud_name: 'dnmf2mkvl',
    api_key:662281226571323,
    api_secret:"rkOFevA7eCiaQ5EuamUNICz0L1I"
})

const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'trend-image',
        format:()=> 'png',
        public_id: Date.now,
    },

    
});
const productParser=multer({storage:productStorage})




export {productParser}