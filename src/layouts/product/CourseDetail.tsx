import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../api/CourseAPI";
import CourseModel from "../../models/CourseModel";
import { Button, Tab, Tabs } from "react-bootstrap";
import CourseImage from "./components/CourseImage";
import RatingProduct from "./components/RatingProduct";
import defineNumber from "../utils/defineNumber";
import renderRating from "../utils/RenderRating";

const CourseDetail: React.FC = () => {
    //Lấy courseId từ URL
    const { courseId } = useParams();
    console.log("courseId", courseId);

    let courseIdNumber: number = 0;

    try {
        courseIdNumber = parseInt(courseId!);
        if (Number.isNaN(courseIdNumber)) {
            courseIdNumber = 0;
        }
    } catch (error) {
        courseIdNumber = 0;
        console.log("Lỗi khi parse courseId sang số", error);
    }

    //Init state
    const [course, setCourse] = useState<CourseModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState<string>("introduction");

    useEffect(() => {

        //Title cho trang
        document.title = "Chi tiết khóa học";

        getCourseById(courseIdNumber)
            .then((data) => {
                setCourse(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }, [courseIdNumber]);
    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SyncLoader color="#36d7b7" size={20} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Lỗi:</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (course === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Thông báo:</strong>
                    <span className="block sm:inline">Không tìm thấy khóa học</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-md-5">
                    <div className="inner">
                        <div className="video-place">
                            <CourseImage courseId={courseIdNumber} />
                        </div>
                        <div className="course-info p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="price">
                                    <strong>Giá: {defineNumber(course.price)}</strong>
                                </span>
                                <div>
                                    <Button variant="success" className="btn-join me-2">
                                        Tham gia khóa học
                                    </Button>
                                    <Button variant="outline-danger" className="btn-cart">
                                        <i className="fas fa-shopping-cart me-2"></i>
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="producttab">
                        <div className="tabsslider">
                            <Tabs
                                defaultActiveKey={activeTab}
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="introduction" title="Giới thiệu">
                                    <div className="tabcontent h-100">
                                        <h3>Giới thiệu khóa học</h3>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: course.description! }}
                                        ></div>
                                    </div>
                                </Tab>
                                <Tab eventKey="curriculum" title="Nội dung">
                                    <div className="tabcontent">
                                        <h3>Nội dung khóa học</h3>
                                        {Array.from({ length: 5 }, (_, chapterIndex) => (
                                            <div className="chapter-container">
                                                <div className="chapter-header bg-primary text-white py-2 px-3 rounded-top">
                                                    <h5 className="mb-0">Chương {chapterIndex + 1}</h5>
                                                </div>
                                                <div className="chapter-content bg-light rounded-bottom p-3">
                                                    {Array.from({ length: 4 }, (_, lessonIndex) => (
                                                        <div className="row border p-2 mb-2 rounded-3 m-auto align-items-center">
                                                            <div className="col-8 d-flex align-items-center">
                                                                <span className="lesson-title">Bài học {chapterIndex * 4 + lessonIndex + 1}</span>
                                                            </div>
                                                            <div className="col-4 d-flex justify-content-end">
                                                                <Link to={`/register/${course.courseId}`} className="btn btn-primary">
                                                                    Đăng ký
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab>
                                <Tab eventKey="teacher" title="Giảng viên">
                                    <div className="tabcontent">
                                        <h3>Giảng viên</h3>
                                    </div>
                                </Tab>
                                <Tab eventKey="review" title="Đánh giá">
                                    <div className="tabcontent">
                                        <div className="row mt-4 mb-4">
                                            <div className="col-12">
                                                <h3>Đánh giá {renderRating(course.averageRating?course.averageRating:0)}</h3>
                                            </div>
                                            <RatingProduct courseId={courseIdNumber} />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
