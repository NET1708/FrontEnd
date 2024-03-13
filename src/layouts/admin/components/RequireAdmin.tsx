import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    user_id: number,
    roles: Array<{ roleId: number; roleName: string }>;
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token');
            console.log("Token: " + token);
            // Trong tình huống chưa đăng nhập
            if (!token) {
                navigate("/login");
                return;
            } else {
                // Giải mã token
                const decodedToken = jwtDecode(token) as JwtPayload;
                // console.log(decodedToken);

                // Lấy thông tin cụ thể
                const roles = decodedToken.roles.map((role) => role.roleName);
                // console.log(roles);
                const isAdmin = roles.includes("ADMIN");
                // Kiểm tra không phải là admin
                if (!isAdmin) {
                    navigate("/403-forbidden");
                    return;
                }
            }
        }, [navigate]);
        return <WrappedComponent {...props} />
    }
    return WithAdminCheck;
}

export default RequireAdmin;