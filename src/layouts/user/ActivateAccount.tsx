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

    const Activate = async() => {
        
        try {
            const url: string = `http://localhost:8888/account/activate?email=${email}&code=${code}`;
            const response = await fetch(url,  {method: "GET"} );
            console.log("Response: ", response);
            if(response.ok){
                setIsActive(true);
                setLoading(false);
            }else{
                setMessage(response.text + "");
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
        <div>
            {is_active ? <h1>Tài khoản của bạn đã được kích hoạt thành công, bạn có thể đăng nhập ngay bây giờ</h1> : <h1>Tài khoản của bạn kích hoạt không thành công, vui lòng thử lại sau {message}</h1>}
        </div>
    );
}
export default ActivateAccount;