import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const Policy = () => {
  return (
    <div className="sales-policies">
      <Container>
        <Row>
          <Col md={12}>
            <h2 className="text-center mt-4 mb-4">Chính sách bán hàng</h2>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Đăng ký khóa học</Accordion.Header>
                <Accordion.Body>
                    <div className='accordion-content'>
                        <p>
                            Để đăng ký khóa học, bạn cần thực hiện các bước sau:
                        </p>
                        <ul className='list-unstyled'>
                            <li>Đăng nhập hoặc đăng ký tài khoản nếu bạn chưa có tài khoản.</li>
                            <li>Chọn khóa học mà bạn muốn đăng ký.</li>
                            <li>Chọn phương thức thanh toán và hoàn tất đăng ký.</li>
                        </ul>
                    </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Thanh toán</Accordion.Header>
                <Accordion.Body>
                  <div className="accordion-content">
                    <p>
                      Chúng tôi chấp nhận thanh toán qua các phương thức sau:
                    </p>
                    <ul className='list-unstyled'>
                      <li>Thanh toán trực tiếp tại văn phòng của chúng tôi.</li>
                      <li>Thanh toán qua chuyển khoản ngân hàng.</li>
                      <li>Thanh toán qua thẻ tín dụng.</li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Hoàn trả và hoàn tiền</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Chúng tôi hiểu rằng đôi khi bạn có thể không hài lòng với khóa học mà bạn đã đăng ký. Vì vậy, chúng tôi áp dụng chính sách hoàn trả và hoàn tiền sau:
                  </p>
                  <ul className='list-unstyled'>
                    <li>Bạn có thể yêu cầu hoàn trả và hoàn tiền trong vòng 14 ngày kể từ ngày đăng ký khóa học.</li>
                    <li>Chúng tôi sẽ hoàn trả 100% phí khóa học cho các yêu cầu hợp lệ.</li>
                    <li>Để yêu cầu hoàn trả, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Bảo mật và quyền riêng tư</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng. Dữ liệu của bạn sẽ được xử lý một cách an toàn và chỉ được sử dụng cho mục đích cung cấp dịch vụ của chúng tôi.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Policy;