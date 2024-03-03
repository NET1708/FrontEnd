class ImageModel {
    id: number;
    Name?: string;
    isIcon?: boolean;
    URL?: string;
    ImageData?: string;
    
    constructor(id: number, Name?: string, isIcon?: boolean, URL?: string, ImageData?: string) {
        this.id = id;
        this.Name = Name;
        this.isIcon = isIcon;
        this.URL = URL;
        this.ImageData = ImageData;
    }
}
export default ImageModel;