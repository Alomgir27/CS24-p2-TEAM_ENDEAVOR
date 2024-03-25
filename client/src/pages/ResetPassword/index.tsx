import _ from "lodash";
import Button from "../../base-components/Button";
import { FormInput, FormLabel } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";

//do basic imports
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";
import { useEffect } from "react";
import { resetPassword } from "../../services/authService";
import { useParams } from "react-router";


function Main() {
    const navigate = useNavigate();
    const notificationRef = useRef<NotificationElement>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | "warning" | "info">("success");
    const { token } = useParams();
    
    useEffect(() => {
        if (!token) {
            navigate("/forgot-password");
        }
    }, []);

    const handleResetPassword = async () => {
        if (_.isEmpty(password) || _.isEmpty(confirmPassword)) {
            setNotification("Password and Confirm Password are required.");
            setType("error");
            notificationRef.current?.showToast();
            return;
        }
        if (password !== confirmPassword) {
            setNotification("Password and Confirm Password do not match.");
            setType("error");
            notificationRef.current?.showToast();
            return;
        }
        setLoading(true);
        try {
            // simulate a request
            const res = await resetPassword({ token: token!, password });
            console.log(res);
            // simulate a response
            setNotification("Password has been reset successfully.");
            setType("success");
            notificationRef.current?.showToast();
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            console.error(error);
            setNotification(error.response.data.message);
            setType("error");
            notificationRef.current?.showToast();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h1>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        className="mt-4"
                        onClick={handleResetPassword}
                        variant="primary"
                        elevated
                        disabled={loading}
                    >
                        Reset Password
                    </Button>
                    <Notification getRef={(ref) => notificationRef.current = ref} className="mt-4" type={type}>
                        {notification}
                    </Notification>
                </div>
            </div>
        </>
    );
}

export default Main;