import React from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
function About() {

    const navigate = useNavigate();

    const handleJoinButton = () => {
        navigate('/register');
      };

    const handlePolicy = () => {
        navigate('/policy');
    };

    return (
        <div>
            {/* Phần Banner */}
            <div className="banner">
                <Container>
                    <Row className="mt-4">
                        <Col md={6}>
                            <h1>Về ANI-TESTLAB</h1>
                            <p>
                                ANI-TESTLAB là nền tảng e-learning hàng đầu, giúp bạn học tập mọi lúc, mọi nơi một cách hiệu quả nhất.
                            </p>
                            <Button variant="outline-success mb-4" onClick={handleJoinButton}>
                                Tham gia ngay
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Image loading="lazy" src='./images/public/banner.jpg' style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.5)', border: '1px solid #ddd' }} />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Phần Tính năng */}
            <div className="features mt-4">
                <Container>
                    <Row>
                        <Col md={4}>
                            <h3>Khóa học đa dạng</h3>
                            <p>Chúng tôi cung cấp hàng nghìn khóa học cho học sinh thpt</p>
                        </Col>
                        <Col md={4}>
                            <h3>Giảng viên chuyên nghiệp</h3>
                            <p>Đội ngũ giảng viên giàu kinh nghiệm, đam mê và tận tâm với nghề.</p>
                        </Col>
                        <Col md={4}>
                            <h3>Học tập linh hoạt</h3>
                            <p>Bạn có thể học bất kỳ lúc nào, bất kỳ nơi đâu với giao diện thân thiện.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Phần Về chúng tôi */}
            <div className="about-us mt-4">
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image loading="lazy" src="./images/public/about-us.jpg" fluid style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.5)', border: '1px solid #ddd', marginBottom: '20px' }} />
                        </Col>
                        <Col md={6}>
                            <h2>Về chúng tôi</h2>
                            <p>
                                ANI-TESTLAB ra đời với mục đích mang đến những cơ hội học tập chất lượng cao cho các bạn học sinh THPT. Chúng tôi cam kết đồng hành cùng bạn trên con đường chinh phục tri thức, phát triển kỹ năng và vươn tới thành công.
                            </p>
                            <Button variant="outline-dark" onClick={handlePolicy}>Tìm hiểu thêm</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default About;