import React, { useEffect, useState } from "react";
import CourseModel from "../../../models/CourseModel";
import ImageModel from "../../../models/ImageModel";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getAllRatingOfOneCourse } from "../../../api/RatingCourseAPI";
import { RatingCourseModel } from "../../../models/RatingCourseModel";

interface RatingProduct {
    courseId: number;
}

const RatingProduct: React.FC<RatingProduct> = (props) => {

    const course_id: number = props.courseId;

    const [listRatingCourse, setlistRatingCourse] = useState<RatingCourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    useEffect(() => {
        getAllRatingOfOneCourse(course_id).then(
            (data) => {
                setlistRatingCourse(data);
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
            {
                listRatingCourse.map((ratingCourse, index) => {
                    return (
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-start rating-container mb-3">
                                        <div className="rating-header">
                                            <img src="https://via.placeholder.com/50" className="rounded-circle rating-avatar" alt="..." />
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <h5 className="rating-name me-2">Nguyễn Văn A</h5>
                                                    <p className="rating-stars mb-0">{ratingCourse.rate} <i className="fas fa-star"></i></p>
                                                </div>
                                                <p className="rating-comment mb-0">{ratingCourse.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default RatingProduct;