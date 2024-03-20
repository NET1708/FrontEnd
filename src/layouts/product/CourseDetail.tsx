import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllEnrolledCourses, getCourseById } from "../../api/CourseAPI";
import CourseModel from "../../models/CourseModel";
import { Button, Modal, ProgressBar, Tab, Tabs } from "react-bootstrap";
import CourseImage from "./components/CourseImage";
import RatingProduct from "./components/RatingProduct";
import defineNumber from "../utils/defineNumber";
import renderRating from "../utils/RenderRating";
import { createCartOrder } from "../Cart/CreateCartOrder";
import { useMediaQuery } from "react-responsive";
import generateQRCode from "../utils/generateQRCode";
import { getAllChapter } from "../../api/ChapterAPI";
import ChapterModel from "../../models/ChapterModel";
import { generateOrderCode } from "../utils/generateOrderCode";

const CourseDetail: React.FC = () => {
    //Lấy courseId từ URL
    const { courseId } = useParams();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [addInfo, setAddInfo] = useState('');
    const isDesktop = useMediaQuery({ minWidth: 992 });
    const navigate = useNavigate();
    const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

    const [listEnroll, setListEnroll] = useState<CourseModel[]>([]);
    const [isEnroll, setIsEnroll] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        //check if user is logged in, if not, redirect to login page
        const token = localStorage.getItem("token");
        if (!token) {
            //redirect to login page
            navigate("/login");
            return;
        }
        setShow(true);
    };

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
    const course_amount = course?.price ? course.price : 0;
    const [Info, setInfo] = useState<string>("");

    useEffect(() => {
        //Title cho trang
        document.title = "Chi tiết khóa học";
        getAllEnrolledCourses(localStorage.getItem("token")!)
            .then((data) => {
                setListEnroll(data!);
                setIsEnroll(data!.some((course) => course.courseId === courseIdNumber));
                console.log(isEnroll);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách khóa học đã tham gia:", error);
            });
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

    const orderCode = localStorage.getItem('orderCode');

    const generateQRCodeData = async (course_amount: number, Info: string) => {
        const accountNo = '0948190073';
        const accountName = 'PHAM QUANG QUY PHUONG';
        const acqId = 970422;
        const amount = course_amount;
        const addInfo = Info;

        const qrDataURL = await generateQRCode(accountNo, accountName, acqId, amount, addInfo);
        setImageUrl(qrDataURL);
        setAddInfo(addInfo);
    };

    generateQRCodeData(course_amount, orderCode ? orderCode : '');

    const [chapters, setChapters] = useState<ChapterModel[]>([]);
    useEffect(() => {
        getAllChapter(courseIdNumber)
            .then((data) => {
                setChapters(data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách chương:", error);
            });
    }, [courseIdNumber]);
    useEffect(() => {
        const pollOrderStatus = () => {
            const token = localStorage.getItem("token");
            const interval = setInterval(() => {
                fetch(`https://api.ani-testlab.edu.vn/order/handle-payment?orderID=${orderCode}&courseID=${courseIdNumber}&token=${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.text())
                    .then((data) => {
                        if (data === "success") {
                            clearInterval(interval);
                            setPaymentSuccess(true);
                            setShow(false);
                            const orderCode = generateOrderCode();
                            localStorage.setItem('orderCode', orderCode);
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking order status:", error);
                    });
            }, 1000); // Poll every 5 seconds

            setPollingInterval(interval);
        };

        if (show) {
            pollOrderStatus();
        } else {
            // Clear interval if show is false
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        }

        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [show, orderCode, courseIdNumber]);

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

    const handleJoin = () => {
        //check if user is logged in, if not, redirect to login page
        const token = localStorage.getItem("token");
        if (!token) {
            //redirect to login page
            window.location.href = "/login";
            return;
        }
        const cartDataList = [
            { courseID: courseId },
            // Add more cart data objects as needed
        ];

        createCartOrder(cartDataList)
            .then((response) => {
                console.log("Cart order created:", response);
            })
            .catch((error) => {
                console.error("Error creating cart order:", error);
            });
    };
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
                                    {isEnroll ? (
                                        <ProgressBar now={100} label={`Đã tham gia`} />
                                    ) : (
                                        <>
                                            <Button variant="success" className="btn-join me-2" onClick={handleShow}>
                                                Tham gia khóa học
                                            </Button>
                                            <Modal show={show} onHide={handleClose} centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Tham gia khóa học</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {isDesktop ? (
                                                        <div className="d-flex justify-content-around">
                                                            <div className="qr-code-container">
                                                                <h5 className="text-center">Quét mã VietQR</h5>
                                                                <div className="qr-code-wrapper">
                                                                    <img
                                                                        src={imageUrl}
                                                                        alt="VietQR Code"
                                                                        className="img-fluid"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="transfer-info">
                                                                <h5 className="text-center mb-3">Hoặc chuyển khoản</h5>
                                                                <p className="mb-1">Chủ tài khoản: PHAM QUANG QUY PHUONG</p>
                                                                <p className="mb-1">Số tài khoản: 0948190073</p>
                                                                <p className="mb-1">Ngân hàng: MB BANK</p>
                                                                <p className="mb-1">Nội dung chuyển: {addInfo}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="d-flex flex-column align-items-center">
                                                            <div className="qr-code-container mb-3">
                                                                <h5 className="text-center">Quét mã VietQR</h5>
                                                                <div className="qr-code-wrapper">
                                                                    <img
                                                                        src={imageUrl}
                                                                        alt="VietQR Code"
                                                                        className="img-fluid"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="transfer-info">
                                                                <h5 className="text-center mb-3 mt-4">Hoặc chuyển khoản</h5>
                                                                <p className="mb-1">Chủ tài khoản: PHAM QUANG QUY PHUONG</p>
                                                                <p className="mb-1">Số tài khoản: 0948190073</p>
                                                                <p className="mb-1">Ngân hàng: MB BANK</p>
                                                                <p className="mb-1">Nội dung chuyển: {addInfo}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Đóng
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Button variant="outline-danger" className="btn-cart" onClick={handleJoin}>
                                                <i className="fas fa-shopping-cart me-2"></i>
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {paymentSuccess && (
                    <Modal show={paymentSuccess} onHide={() => setPaymentSuccess(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Thanh toán thành công</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Thanh toán đã được xử lý thành công.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setPaymentSuccess(false)}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
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
                                        <div className="chapter-container">
                                            <div className="chapter-content bg-light rounded-bottom p-3">
                                                {chapters.length === 0 ? (
                                                    <div className="alert alert-warning">
                                                        <strong>Thông báo:</strong> Khóa học chưa có nội dung
                                                    </div>
                                                ) : (
                                                    chapters.map((chapter, index) => {
                                                        return (
                                                            <div className="row border pt-3 pb-2 mb-2 rounded-3 m-auto align-items-center" key={chapter.chapterId}>
                                                                <div className="col-8 d-flex align-items-center">
                                                                    <div className="row">
                                                                        <div className="col-1">
                                                                            <i className="fas fa-play-circle"></i>
                                                                        </div>
                                                                        <div className="col-11">
                                                                            <p className="chapter-name">{chapter.chapterName}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4 d-flex justify-content-end">
                                                                    {
                                                                        isEnroll ? (
                                                                            <Link to={`/course/${course.courseId}/chapter/${chapter.chapterId}`} className="btn btn-primary">
                                                                                Học ngay
                                                                            </Link>
                                                                        ) : (
                                                                            <Button variant="primary" disabled>
                                                                                Học ngay
                                                                            </Button>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="review" title="Đánh giá">
                                    <div className="tabcontent">
                                        <div className="row mt-4 mb-4">
                                            <div className="col-12">
                                                <h3>Đánh giá {renderRating(course.averageRating ? course.averageRating : 0)}</h3>
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
