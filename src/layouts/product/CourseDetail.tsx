import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../api/CourseAPI";
import CourseModel from "../../models/CourseModel";
import { Tab, Tabs } from "react-bootstrap";
import CourseImage from "./components/CourseImage";

const CourseDetail: React.FC = () => {
  //Lấy courseId từ URL
  const { courseId } = useParams();

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
    <SyncLoader className="carouselcss" style={carouselcss} color="#36d7b7" />;
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

  if (course === null) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2>Không tìm thấy khóa học</h2>
          </div>
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
            <div className="course-info">
              <div className="row mt-2 mb-4" role="group">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <span className="price">
                    <strong>Giá: {course.price}</strong>
                  </span>
                </div>
                <div className="col-6">
                  <Link
                    to={`/register/${course.courseId}`}
                    className="btn btn-primary btn-block"
                  >
                    Đăng ký
                  </Link>
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
                    {
                      //tao 20 bai hoc
                      Array.from({ length: 20 }, (_, i) => (
                        <div className="row border p-3 mb-3 rounded-3">
                          <div className="col-8 d-flex justify-content-start align-items-center">
                            <h4>Chương 1: {course.courseName}</h4>
                          </div>
                          <div className="col-4 d-flex justify-content-end align-items-center">
                            <Link
                              to={`/register/${course.courseId}`}
                              className="btn btn-primary btn-block"
                            >
                              Đăng ký
                            </Link>
                          </div>
                        </div>
                      ))
                    }
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
                            <h3>Đánh giá</h3>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <img src="https://via.placeholder.com/50" className="rounded-circle" alt="..." />
                                            <div>
                                                <h5>Nguyễn Văn A</h5>
                                                <p>5 sao</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Thời gian: 10/10/2021</p>
                                        </div>
                                    </div>
                                    <p>Khóa học rất hay, tôi đã học được rất nhiều điều từ khóa học này</p>
                                </div>
                            </div>
                        </div>
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
