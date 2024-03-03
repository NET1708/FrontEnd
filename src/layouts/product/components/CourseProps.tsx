import React from "react";
import CourseModel from "../../../models/CourseModel";

interface CoursePropsInterface {
    course: CourseModel;
}

const CourseProps: React.FC<CoursePropsInterface> = ( props ) => {
    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    // src={props.course.imageUrl}
                    className="card-img-top"
                    alt={props.course.CourseName}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.course.CourseName}</h5>
                    <p className="card-text">{props.course.Description}</p>
                    <div className="price">
                        <span className="price">
                            <strong>{props.course.Price}</strong>
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