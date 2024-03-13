import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

function ActivateAccount() {

    const { email } = useParams();
    const { code } = useParams();
    const [is_active, setIsActive] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const carouselcss = {
        // center screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    //Title cho trang
    document.title = "Kích hoạt tài khoản";

    const Activate = async() => {
        
        try {
            const url: string = `http://localhost:8888/account/activate?email=${email}&code=${code}`;
            const response = await fetch(url,  {method: "GET"} );
            console.log("Response: ", response);
            if(response.ok){
                setIsActive(true);
                setLoading(false);
            }else{
                const data = await response.json();
                setMessage(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt: " , error);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);        

        console.log("Email: ", email);
        console.log("Code: ", code);
        
        if (email && code) {
            Activate();
        }
    }, []);

    if (loading) {
        return (
            <SyncLoader className="carouselcss" style={carouselcss} color="#36d7b7" />
        );
    }

    return (
        <div className="container mt-5 justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Kích hoạt tài khoản</h5>
                            {is_active ? (
                                <div>
                                    <p className="text-success text-center">Tài khoản của bạn đã được kích hoạt thành công</p>
                                    <p className="text-center">
                                        <a href="/login" className="btn btn-primary">Đăng nhập</a>
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-danger text-center">{message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ActivateAccount;