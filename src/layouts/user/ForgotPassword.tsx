// components/ForgotPassword.js

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { RiMailLine } from 'react-icons/ri';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = `https://api.ani-testlab.edu.vn/account/forgot-password?email=${email}`;
            const response = await fetch(url, { method: "POST" });

            if (response.ok) {
                setMessage("Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.");
                window.location.href = '/login';
            } else {
                const data = await response.json();
                setMessage(data.message);
            }
            setLoading(false);
        } catch (error) {
            console.log("Lỗi khi gửi OTP: ", error);
            setMessage("Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại sau.");
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="border rounded p-4 mt-5">
                <h1 className="text-left mb-4">Quên mật khẩu</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
                    </Button>
                    {message && <p className="text-danger mt-2">{message}</p>}
                </Form>
            </div>
        </Container>
    );
};

export default ForgotPassword;
