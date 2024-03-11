// components/LoginPage.js
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  useEffect(() => {
    Aos.init({ once: true });
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

    fetch('http://localhost:8888/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest)
    }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Đăng nhập không thành công');
    }).then(data => {
      const { jwt } = data;
      // Save token to local storage or cookie
      localStorage.setItem('token', jwt);
      // Redirect to home page
      setMessage('Đăng nhập thành công');
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
                <Col sm={{ span: 3, offset: 4 }}>
                  <Form.Check type="checkbox" label="Ghi nhớ" data-aos="fade-down-right" />
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