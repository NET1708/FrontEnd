import React, { useEffect, useState } from "react";
import { getTop3Courses } from "../../../api/CourseAPI";
import CourseModel from "../../../models/CourseModel";
import CarouselItem from "./CarouselItem";
import { SyncLoader } from "react-spinners";
import CategoryModel from "../../../models/CategoryModel";
import { getAllCategories } from "../../../api/CategoryAPI";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Carousel: React.FC = () => {

    const [top3Courses, setTop3Courses] = React.useState<CourseModel[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [listCategory, setListCategory] = useState<CategoryModel[]>([]);
    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setListCategory(await getAllCategories());
                setLoading(false);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu từ API");
            }
        }
        fetchData();
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
        <div className="container rounded-3 justify-content-center align-items-center">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center mt-3 display-6 fw-bold">CHỌN LỘ TRÌNH CỦA BẠN & CÙNG HỌC NHÉ!</h2>
                </div>
            </div>
            {/* Category */}
            <div className="list-category">
                    <ul className="nav nav-pills mx-auto my-2" id="pills-tab" role="tablist">
                        <li className="list-category">
                            <NavLink to="/" className="nav-link" >Tất cả</NavLink>
                            {
                                listCategory.map((category, index) => {
                                    return (
                                        <NavLink key={index} to={`/${category.categoryId}`} className="nav-link">{category.categoryName}</NavLink>
                                    );
                                })
                            }
                        </li>
                    </ul>
                </div>
        </div>
    );
}

export default Carousel;