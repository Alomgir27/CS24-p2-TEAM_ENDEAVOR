import _ from "lodash";
import { useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import TomSelect from "../../base-components/TomSelect";
import { Menu } from "../../base-components/Headless";

//do basic imports
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { updateUser } from "../../services/userService";
import { RootState } from "../../stores/store";
import { IUser } from "../../types";
import { useRef } from "react";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";
import { getUser } from "../../services/userService";
import { useParams } from "react-router";
import { getRoles } from "../../services/roleService";
import { IRole } from "../../types";





function Main() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | "warning" | "info">(
        "success"
    );
    const notificationRef = useRef<NotificationElement>(null);
    const { userId } = useParams();
    const [roles, setRoles] = useState<IRole[]>([]);
    const thisUser = useSelector((state: RootState) => state.auth.user);
    

    const handleUpdateProfile = async () => {
        if (_.isEmpty(username) || _.isEmpty(email) || _.isEmpty(role) || _.isEmpty(password)) {
        setNotification("Username, Email, Role and Password are required.");
        setType("error");
        notificationRef.current?.showToast();
        return;
        }
        if (password !== confirmNewPassword) {
            setNotification("Password and Confirm Password do not match.");
            setType("error");
            notificationRef.current?.showToast();
            return;
        }
        setLoading(true);
        try {
        // simulate a request
        const res = await updateUser({ userId: user._id, username, email, password, role });
        console.log(res);
        // simulate a response
        setNotification("Profile has been updated successfully.");
        setType("success");
        notificationRef.current?.showToast();
        setLoading(false);
        setTimeout(() => {
            setNotification(null);
            notificationRef.current?.hideToast();
            navigate("/users");
        }
        , 3000);
        } catch (error) {
        console.error(error);
        setNotification(error.response.data.message);
        setType("error");
        notificationRef.current?.showToast();
        setLoading(false);
        }
    };

    useEffect(() => {
        getUser(userId as string).then((res) => {
        setUser(res.data?.user);
        setUsername(res.data.user?.username);
        setEmail(res.data.user?.email);
        setRole(res.data.user?.role);
        console.log(res.data);
        });
    }, [userId]);

    useEffect(() => {
        const fetchRoles = async () => {
        try {
            const res = await getRoles();
            const { roles } = res.data;
            setRoles(roles);
            console.log(roles);
        } catch (error) {
            console.error(error);
        }
        };
        fetchRoles();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Update User Information</h1>
        <div className="flex flex-col space-y-4 w-full max-w-md">
            <FormLabel>Username</FormLabel>
            <FormInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel>Email</FormLabel>
            <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            />
                <FormLabel>Role</FormLabel>
                {thisUser.role === "System Admin" ? (
                    <FormSelect
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role._id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                        <option value="Unassigned">Unassigned</option>
                    </FormSelect>
                ) : (
                    <FormInput
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled
                    />
                )}
            <FormLabel>Password</FormLabel>
            <FormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <Button
                        onClick={() => navigate("/users")}
                        variant="danger"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        variant="primary"
                        elevated
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
        </div>
        <Notification getRef={(el) => {
            notificationRef.current = el;
        }
        } className="mt-4" type={type}>
            {notification}
        </Notification>
        </div>
    );

}

export default Main;
