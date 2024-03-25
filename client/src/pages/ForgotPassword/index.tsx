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
import { forgotPassword } from "../../services/authService";



function Main() {
    const navigate = useNavigate();
    const notificationRef = useRef<NotificationElement>(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | "warning" | "info">("success");


   

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            // simulate a request
            const res = await forgotPassword({ email });
            console.log(res);
            // simulate a response
            setNotification("Password reset instructions have been sent to your email.");
            setType("success");
            notificationRef.current?.showToast();
            setEmail("");
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
                    <h1 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h1>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        className="w-full mt-4"
                        onClick={handleForgotPassword}
                        variant="primary"
                        elevated
                        disabled={loading}

                    >
                        Send Reset Instructions
                    </Button>
                    <Button
                        className="w-full mt-4"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </Button>
                </div>
            </div>

           
            <Notification getRef={(el)=> {
                notificationRef.current = el;
                }}
                className="flex"
                >
                <Lucide icon="CheckCircle" className={`w-6 h-6 text-${type === "success" ? "green" : "red"}-500`} />
                <div className="ml-4 mr-4">
                    <div className="font-medium">
                        {_.startCase(type)}
                    </div>
                    <div className="mt-1 text-slate-500">
                        {notification}
                    </div>
                </div>
            </Notification>
           

            
        </>
    );
}

export default Main;