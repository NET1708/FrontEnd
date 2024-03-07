class ImageModel {
    imageId: number;
    imageName?: string;
    isIcon?: boolean;
    url?: string;
    imageData?: string;

    constructor(imageId: number, imageName?: string, isIcon?: boolean, url?: string, imageData?: string) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.isIcon = isIcon;
        this.url = url;
        this.imageData = imageData;
    }
}
export default ImageModel;