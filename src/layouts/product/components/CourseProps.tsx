import React, { useEffect, useState } from "react";
import CourseModel from "../../../models/CourseModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImages } from "../../../api/ImageAPI";
import { SyncLoader } from "react-spinners";

interface CoursePropsInterface {
    course: CourseModel;
}

const CourseProps: React.FC<CoursePropsInterface> = ( props ) => {

    const course_id = props.course.courseId;

    const [images, setImages] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
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
        // return (
        //     <div className="container">
        //         <div className="row mt-4">
        //             <div className="col-12">
        //                 <h2>Loading...</h2>
        //             </div>
        //         </div>
        //     </div>
        // );
        <SyncLoader className="carouselcss" color="#36d7b7" />
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
        <div className="col-md-3 mt-2">
            <div className="card">
                {images[0] && images[0].imageData && <img
                    src={`${images[0].imageData}`}
                    className="card-img-top"
                    alt={props.course.courseName}
                    style={{ height: '200px' }}
                />
                }
                <div className="card-body">
                    <h5 className="card-title">{props.course.courseName}</h5>
                    <p className="card-text">{props.course.description}</p>
                    <div className="price">
                        <span className="price">
                            <strong>{props.course.price}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseProps;