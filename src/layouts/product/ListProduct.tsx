import React, { useEffect, useState } from "react";
import CourseModel from "../../models/CourseModel";
import CourseProps from "./components/CourseProps";
import { getAllCourses } from "../../api/CourseAPI";
import { Pagination } from "../utils/Pagination";


const ListProduct: React.FC = () => {
    
    const [listProduct, setListProduct] = useState<CourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalCoursePerPage, setTotalCoursePerPage] = useState<number>(0);

    useEffect(() => {
        getAllCourses(currentPage-1).then(
            (data) => {
                setListProduct(data.result);
                setTotalPages(data.totalPage);
                setLoading(false);
            }
        ).catch(
            (error) => {
                setLoading(false);
                setError(error);
            }
        );
    }, [currentPage]);

    const paginate = (currentPage: number) => setCurrentPage(currentPage);

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
            <div className="row mt-4">
                <div className="col-12 d-flex justify-content-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </div>
            </div>
        </div>
    );
}

export default ListProduct;