import { ReactNativeFile } from 'apollo-upload-client';

const generateImageToRNFile = (uri: string, fileName: string): ReactNativeFile => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    return new ReactNativeFile({
        uri,
        type: `image/${fileType}`,
        name: `${fileName}.${fileType}`
    })
}

export default generateImageToRNFile