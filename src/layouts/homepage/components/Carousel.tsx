import React, { useEffect } from "react";
import { getTop3Courses } from "../../../api/CourseAPI";
import CourseModel from "../../../models/CourseModel";
import CarouselItem from "./CarouselItem";
import { SyncLoader } from "react-spinners";

const Carousel: React.FC = () => {

    const [top3Courses, setTop3Courses] = React.useState<CourseModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    useEffect(() => {
        getTop3Courses().then(
            (data) => {
                setTop3Courses(data.result);
                setLoading(false);
            }).catch(
                (error) => {
                    setError(error);
                    setLoading(false);
                }
            );
            }, []  // Empty array as second argument means only run once at mount
        )

        if (loading) {
            return (
                <SyncLoader className="carouselcss" color="#36d7b7" />
            );
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
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    {
                        top3Courses.map((course, index) => {
                            return (
                                <div
                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                    data-bs-interval="10000"
                                    key={course.courseId}
                                >
                                <CarouselItem course={course} />
                            </div>
                                );
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;