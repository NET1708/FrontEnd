// components/LoginPage.js
import Aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { generateOrderCode } from '../utils/generateOrderCode';
interface JwtPayload {
  isActive: boolean;
}
const LoginPage = () => {

  useEffect(() => {
    Aos.init({ once: true });
    document.title = "Đăng nhập";
  }
  );

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = () => {
    const loginRequest = {
      username: username,
      password: password
    };

    //title for page

    fetch('https://api.ani-testlab.edu.vn/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest)
    }
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setMessage('Đăng nhập không thành công, vui lòng kiểm tra lại thông tin');
      }
    }).then(data => {
      const { jwt } = data;
      const orderCode = generateOrderCode();
      localStorage.setItem('orderCode', orderCode);
      // Save token to local storage or cookie
      localStorage.setItem('token', jwt);
      //decode jwt
      const decodedToken = jwtDecode(jwt) as JwtPayload;
      //check isActive
      if (decodedToken.isActive) {
        //redirect to home page
        window.location.href = '/';
      } else {
        setMessage('Tài khoản của bạn chưa được kích hoạt, vui lòng kiểm tra email để kích hoạt tài khoản');
      }

      console.log(data);
    }
    ).catch(error => {
      setMessage('Đăng nhập không thành công, vui lòng kiểm tra lại thông tin');
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="border rounded p-4 mt-5">
            <h1 className="text-left mb-4" data-aos='fade-down'>Đăng nhập</h1>
            <Form>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm="3" data-aos='fade-right'>
                  Tên đăng nhập
                </Form.Label>
                <Col sm="9">
                  <Form.Control className='form-control mb-3'
                    type="email"
                    placeholder="Enter email"
                    data-aos='fade-left'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="3" data-aos="fade-up-right">
                  Mật khẩu
                </Form.Label>
                <Col sm="9">
                  <Form.Control className='form-control mb-3'
                    type="password"
                    placeholder="Password"
                    data-aos="fade-up-left"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicCheckbox">
                {/* Ghi nhớ checkbox */}
                <Col sm={{ span: 3, offset: 4 }}>
                  <Form.Check type="checkbox" label="Ghi nhớ" data-aos="fade-down-right" />
                </Col>               
              </Form.Group>
              {/* đường link để forgot password */}
              <Form.Group as={Row}>
                <Col>
                  <Link to="/forgot-password" data-aos="zoom-in-up" style={{textDecoration: 'none', justifyContent: 'end'}}>Quên mật khẩu ?</Link>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Button variant="primary" type="button"
                    className="mr-2 mt-3 mb-3"
                    data-aos="fade-down-left"
                    onClick={handleSubmit}>
                    <RiUserLine /> <RiLockPasswordLine /> Đăng nhập
                  </Button>
                  {message && <p className="text-danger">{message}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button variant="info" className="mr-2 mx-3 mt-3 mb-3" data-aos="zoom-in-right">
                    Đăng nhập với Facebook
                  </Button>
                  <Button variant="success" className='mr-2 mx-3 mt-3 mb-3' data-aos="zoom-in-left">
                    Đăng nhập với Email
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Link to="/register" data-aos="zoom-in-up" style={{textDecoration: 'none', justifyContent: 'end'}}>Đăng ký tài khoản mới</Link>
                </Col>
              </Form.Group>

            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
