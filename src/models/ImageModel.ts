class ImageModel {
    Id: number;
    Name?: string;
    isIcon?: boolean;
    URL?: string;
    ImageData?: string;
    
    constructor(Id: number, Name?: string, isIcon?: boolean, URL?: string, ImageData?: string) {
        this.Id = Id;
        this.Name = Name;
        this.isIcon = isIcon;
        this.URL = URL;
        this.ImageData = ImageData;
    }
}
export default ImageModel;