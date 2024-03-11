import React, { useEffect, useState } from "react";
import ImageModel from "../../../models/ImageModel";
import { getAllImages } from "../../../api/ImageAPI";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CourseImage {
    courseId: number;
}

const CourseImage: React.FC<CourseImage> = ( props ) => {

    const course_id:number = props.courseId;

    const [images, setImages] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState<ImageModel | null>(null);

    const changeImage = (image: ImageModel) => {
        setCurrentImage(image);
    }

    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    useEffect(() => {
        getAllImages(course_id).then(
            (data) => {
                setImages(data);
                if (data.length > 0) {
                    setCurrentImage(data[0]);
                }
                setLoading(false);
            }
        ).catch(
            (error) => {
                setLoading(false);
                setError(error.message);
            }
        );
    }, [] //only call 1 time
    )

    if (loading) {
        <SyncLoader className="carouselcss" style={carouselcss} color="#36d7b7" />
    }

    if (error) {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12">
                        <h2>Error: {error}</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-12">
                <Carousel autoPlay={true} showThumbs={false} showStatus={false} infiniteLoop={true}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <Link to={`/course/${course_id}`}>
                                <img
                                    src={`${image.imageData}`}
                                    alt={image.imageName}
                                    style={{ height: '200px' }}
                                />
                            </Link>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default CourseImage;