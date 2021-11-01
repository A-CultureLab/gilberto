import { gql } from "@apollo/client";
import { createQueryHook } from "../lib/createApolloHook";
import { instagramIdToProfile, instagramIdToProfileVariables } from "./__generated__/instagramIdToProfile";

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
export const INSTAGRAM_ID_TO_PROFILE = gql`
    query instagramIdToProfile ($instagramId:String!) {
        instagramIdToProfile(instagramId: $instagramId) {
            name
            image        
        }
    }
`
export const useInstagramIdToProfile = createQueryHook<instagramIdToProfile, instagramIdToProfileVariables>(INSTAGRAM_ID_TO_PROFILE)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//