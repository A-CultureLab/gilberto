import { gql } from "@apollo/client";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const UPLOAD_IMAGE = gql`
    mutation uploadImage ($image: Upload!, $path: String) {
        uploadImage(image: $image, path:$path)
    }
`
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const UPLOAD_IMAGES = gql`
    mutation uploadImages ($images: [Upload!]!, $path: String) {
        uploadImages(images: $images, path:$path)
    }
`
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const USER_CERTIFICATION_INFO = gql`
    query userCertificationInfo ($imp_uid: String!) {
        userCertificationInfo(imp_uid: $imp_uid) {
            uniqueKey
            name
            gender
            birth
        }
    }
`

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const IS_UPDATE_REQUIRE = gql`
    query isUpdateRequire ($version:String!) {
        isUpdateRequire(version: $version)
    }
`
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------------------------------------------//