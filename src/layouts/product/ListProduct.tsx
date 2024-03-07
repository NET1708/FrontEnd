import React, { useEffect, useState } from "react";
import CourseModel from "../../models/CourseModel";
import CourseProps from "./components/CourseProps";
import { getAllCourses } from "../../api/CourseAPI";


const ListProduct: React.FC = () => {
    
    const [listProduct, setListProduct] = useState<CourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCourses().then(
            (data) => {
                setListProduct(data);
                setLoading(false);
            }
        ).catch(
            (error) => {
                setError(error);
            }
        );
    }, []);

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
        <div className="container">
            <div className="row mt-4">
                {
                    listProduct.map((course) => (
                        <CourseProps key={course.courseId} course={course} />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default ListProduct;