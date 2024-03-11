import { useState } from "react";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
function RegisterAccount() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState(1);
    const [role, setRole] = useState(1);

    //Các biến lỗi
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [fullnameError, setFullnameError] = useState<string>("");
    const [addressError, setAddressError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");

    //Biến thông báo
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        //clear all error
        setUsernameError("");
        setPasswordError("");
        setEmailError("");
        setFullnameError("");
        setAddressError("");
        setPhoneError("");
        setMessage("");

        //Chặn click liên tục
        e.preventDefault();
        //Kiểm tra điều kiện và gắn kết quả vào biến
        const isUsernameValid = !await checkUsernameexists(username);
        const isPasswordValid = await checkPassword(password);
        const isEmailValid = !await checkEmailexists(email);
        const isFullnameValid = checkFullname(fullname);
        const isAddressValid = checkAddress(address);
        const isPhoneValid = checkPhone(phone);

        //Kiểm tra điều kiện
        if (isUsernameValid && isPasswordValid && isEmailValid && isFullnameValid && isAddressValid && isPhoneValid) {
            //Gửi dữ liệu lên server
            const url = "https://api.ani-testlab.edu.vn/account/register";

            //convert gender to char

            const data = {
                username: username,
                password: password,
                email: email,
                fullName: fullname,
                address: address,
                phone: phone,
                gender: gender.toString(),
            }
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if(response.ok){
                    setMessage("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                }else{
                    console.log(response.json());
                    setMessage("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setMessage("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }

    //Kiểm tra username tồn tại
    const checkUsernameexists = async (username: string) => {
        const url = `https://api.ani-testlab.edu.vn/user/search/existsByUsername?username=${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra");
            }
            const data = await response.text();
            if (data === "true") {
                setUsernameError("Username đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của username
        setUsername(e.target.value);

        //Kiểm tra username
        setUsernameError("");
        //check exist
        checkUsernameexists(e.target.value);
    }


    //Kiểm tra password
    const checkEmailexists = async (email: string) => {
        const url = `https://api.ani-testlab.edu.vn/user/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra");
            }
            const data = await response.text();
            if (data === "true") {
                setEmailError("Email đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của mail
        setEmail(e.target.value);

        //Kiểm tra mail
        setEmailError("");
        //check exist
        checkEmailexists(e.target.value);
    }

    //Kiểm tra password
    const checkPassword = async (password: string) => {

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự đặc biệt");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của password
        setPassword(e.target.value);

        //Kiểm tra password
        setPasswordError("");
        checkPassword(e.target.value);
    }

    const checkFullname = (fullname: string) => {
        if (fullname.length === 0) {
            setFullnameError("Họ tên không được để trống");
            return false;
        } else {
            setFullnameError("");
            return true;
        }
    }

    const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của fullname
        setFullname(e.target.value);

        //Kiểm tra fullname
        setFullnameError("");
        checkFullname(e.target.value);
    }

    const checkAddress = (address: string) => {
        if (address.length === 0) {
            setAddressError("Địa chỉ không được để trống");
            return false;
        } else {
            setAddressError("");
            return true;
        }
    }

    const handleAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của address
        setAddress(e.target.value);

        //Kiểm tra address
        setAddressError("");
        checkAddress(e.target.value);
    }

    const checkPhone = (phone: string) => {

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            setPhoneError("Số điện thoại không hợp lệ");
            return false;
        } else {
            setPhoneError("");
            return true;
        }
    }

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị của phone
        setPhone(e.target.value);

        //Kiểm tra phone
        setPhoneError("");
        checkPhone(e.target.value);
    }

    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(parseInt(e.target.value));
    }

    const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(parseInt(e.target.value));
    }

    return (
        <Container className="border border-primary rounded-5 mt-5 bg-dark rounded" fluid="md" style={{width: '650px'}}>
            <h1 className="mt-5 text-center text-light">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <Form onClick={handleSubmit} className="form">
                    <div className="form-row align-items-center">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label justify-content-start text-light">Tên đăng nhập:</label>
                        <input type="text" id="username" className="form-control" value={username} onChange={handleUsername} />
                        <div style={{ color: "red" }}>{usernameError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">Mật khẩu:</label>
                        <input type="password" id="password" className="form-control" value={password} onChange={handlePassword} />
                        <div style={{ color: "red" }}>{passwordError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">Email</label>
                        <input type="text" id="email" className="form-control" value={email} onChange={handleEmail} />
                        <div style={{ color: "red" }}>{emailError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label text-light">Họ tên: </label>
                        <input type="text" id="fullname" className="form-control" value={fullname} onChange={handleFullName} />
                        <div style={{ color: "red" }}>{fullnameError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label text-light">Địa chỉ:</label>
                        <input type="text" id="address" className="form-control" value={address} onChange={handleAdress} />
                        <div style={{ color: "red" }}>{addressError}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label text-light">Điện thoại:</label>
                        <input type="text" id="phone" className="form-control" value={phone} onChange={handlePhone} />
                        <div style={{ color: "red" }}>{phoneError}</div>
                    </div>
                    <div className="mb-3">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="gender" className="form-label text-light">
                                    Giới tính:
                                </label>
                                <select className="form-select form-control" value={gender} onChange={handleGender}>
                                    <option value={1}>Nam</option>
                                    <option value={0}>Nữ</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="role" className="form-label text-light">
                                    Bạn là:
                                </label>
                                <select className="form-select form-control" value={role} onChange={handleRole}>
                                    <option value={1}>Học sinh</option>
                                    <option value={0}>Phụ huynh</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                        <div style={{ color: "green" }}>
                            {message}
                        </div>
                    </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default RegisterAccount;