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




function Main() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const notificationRef = useRef<NotificationElement>(null);
  const [roles] = useState(["System Admin", "Admin", "User"]);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (_.isEmpty(username) || _.isEmpty(email) || _.isEmpty(role)) {
      setNotification("Username, Email and Role are required.");
      setType("error");
      notificationRef.current?.showToast();
      return;
    }
    setLoading(true);
    try {
      // simulate a request
      const res = await updateUser({ userId: user._id, username, email, role });
      console.log(res);
      // simulate a response
      setNotification("Profile has been updated successfully.");
      setType("success");
      notificationRef.current?.showToast();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setNotification(error.response.data.message);
      setType("error");
      notificationRef.current?.showToast();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Update Profile</h1>
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
        <FormSelect
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </FormSelect>
        <Button
          onClick={handleUpdateProfile}
          disabled={loading}
          variant="primary"
          elevated
        >
          Update Profile
        </Button>
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
