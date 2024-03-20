import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function ChangePassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


        //Biến thông báo
        const [message, setMessage] = useState<string>("");

        //Title cho trang
        document.title = "Đổi mật khẩu";

        const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp nhau không
        if (newPassword !== confirmPassword) {
            setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        // Gửi request đổi mật khẩu đến backend
        const url = "http://localhost:8888/account/changePassword";
        const data = {
            email: email,
            newPassword: newPassword
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccessMessage("Đổi mật khẩu thành công!");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Đã xảy ra lỗi khi đổi mật khẩu.");
            }
        } catch (error) {
            setErrorMessage("Đã xảy ra lỗi khi đổi mật khẩu.");
        }
    };

    return (
        <Container className="border border-primary rounded-5 mt-5 bg-dark rounded" fluid="md" style={{ width: '650px' }}>
            <h1 className="mt-5 text-center text-light">Đổi mật khẩu</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-light">Email:</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNewPassword">
                        <Form.Label className="text-light">Mật khẩu mới:</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label className="text-light">Xác nhận mật khẩu mới:</Form.Label>
                        <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Form.Group>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                    {successMessage && <div className="text-success mb-3">{successMessage}</div>}

                    <Button variant="primary" type="submit">
                        Đổi mật khẩu
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default ChangePassword;
