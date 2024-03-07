class ImageModel {
    imageId: number;
    image_Name?: string;
    isIcon?: boolean;
    url?: string;
    imageData?: string;

    constructor(imageId: number, image_Name?: string, isIcon?: boolean, url?: string, imageData?: string) {
        this.imageId = imageId;
        this.image_Name = image_Name;
        this.isIcon = isIcon;
        this.url = url;
        this.imageData = imageData;
    }
}
export default ImageModel;