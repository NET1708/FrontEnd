import React, { useEffect } from "react";
import { getTop3Courses } from "../../../api/CourseAPI";
import CourseModel from "../../../models/CourseModel";

const Carousel: React.FC = () => {

    const [top3Courses, setTop3Courses] = React.useState<CourseModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        getTop3Courses().then(
            (data) => {
                setTop3Courses(data);
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
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12">
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </div>
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
                    {/* <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={'./../../../images/courses/1.png'} className="float-end" style={{width:'300px'}} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={'./../../../images/courses/2.png'} className="float-end" style={{width:'300px'}} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={'./../../../images/courses/3.png'} className="float-end" style={{width:'300px'}} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div> */}
                    {
                        top3Courses.map((course, index) => (
                            <div key={course.courseId} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="10000">
                                <div className="row align-items-center">
                                    <div className="col-5 text-center">
                                        <img src={'./../../../images/courses/2.png'} className="float-end" style={{width:'300px'}} />
                                    </div>
                                    <div className="col-7">
                                        <h5>{course.course_Name}</h5>
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
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