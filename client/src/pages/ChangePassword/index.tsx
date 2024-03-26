import _, { set } from "lodash";
import fakerData from "../../utils/faker";
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
import { changePassword } from "../../services/authService";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";



function Main() {
  const navigate = useNavigate();
  const notificationRef = useRef<NotificationElement>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning" | "info">("success");
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const handleChangePassword = async () => {
    if (_.isEmpty(oldPassword) || _.isEmpty(newPassword) || _.isEmpty(confirmNewPassword)) {
      setNotification("Old Password, New Password and Confirm New Password are required.");
      setType("error");
      notificationRef.current?.showToast();
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setNotification("New Password and Confirm New Password do not match.");
      setType("error");
      notificationRef.current?.showToast();
      return;
    }
    setLoading(true);
    try {
      // simulate a request
      const res = await changePassword({ oldPassword, newPassword });
      console.log(res);
      // simulate a response
      setNotification("Password has been changed successfully.");
      setType("success");
      notificationRef.current?.showToast();
      setTimeout(() => {
        setNotification(null);
        setType("success");
        notificationRef.current?.hideToast();
      },
      3000);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error(error);
      setNotification(error.response.data.message);
      setType("error");
      notificationRef.current?.showToast();
      setTimeout(() => {
        setNotification(null);
        setType("success");
        notificationRef.current?.hideToast();
      }
      , 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Change Password</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
       
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Change Password */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">Change Password</h2>
            </div>
            <div className="p-5">
              <div>
                <FormLabel htmlFor="change-password-form-1">
                  Old Password
                </FormLabel>
                <FormInput
                  id="change-password-form-1"
                  type="password"
                  placeholder="input old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <FormLabel htmlFor="change-password-form-2">
                  New Password
                </FormLabel>
                <FormInput
                  id="change-password-form-2"
                  type="password"
                  placeholder="input new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <FormLabel htmlFor="change-password-form-3">
                  Confirm New Password
                </FormLabel>
                <FormInput
                  id="change-password-form-3"
                  type="password"
                  placeholder="confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                type="button"
                className="mt-4"
                onClick={handleChangePassword}
              >
                {loading ? "Loading..." : "Change Password"}
              </Button>
            </div>
          </div>
          {/* END: Change Password */}
          <Notification 
            getRef={(el) => {
              notificationRef.current = el;
            }}
            className="flex"
          >
            <Lucide
              icon="CheckCircle"
              className={`w-6 h-6 text-${type === "success" ? "green" : "red"}-500`}
            />
            <div className="ml-4 mr-4">
              <div className="font-medium">{_.startCase(type)}</div>
              <div className="mt-1 text-slate-500">{notification}</div>
            </div>
          </Notification>
        </div>
      </div>
    </>
  );
}

export default Main;
