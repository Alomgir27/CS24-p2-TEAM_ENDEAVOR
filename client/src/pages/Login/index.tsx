import logoUrl from "../../assets/images/logo.svg";
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
//do basic imports
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../stores/authSlice";
//services
import { login as loginService } from "../../services/authService";
//types
import { RootState } from "../../stores/store";
import { IUser } from "../../types";
import { set } from "lodash";
//components
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";
import { useRef } from "react";
import _ from "lodash";



function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notificationRef = useRef<NotificationElement>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning" | "info">("success");

  const handleLogin = async () => {
    if(!captcha){
      setNotification("Please complete the captcha");
      setType("error");
      notificationRef.current?.showToast();
      setTimeout(() => {
        setNotification(null);
        notificationRef.current?.hideToast();
      }, 3000);
      return;
    }

    setLoading(true);
    try {
      const res = await loginService({ email, password });
      const { user, token } = res.data;
      console.log(user, token);
      dispatch(login({ user, token }));
      setEmail("");
      setPassword("");
      setError(null);
      setNotification("Login successful. Redirecting...");
      setType("success");
      notificationRef.current?.showToast();
      setNotification(null);
      notificationRef.current?.hideToast();
      navigate("/dashboard");
      // window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setNotification(error.response.data.message);
      setType("error");
      notificationRef.current?.showToast();
      setTimeout(() => {
        setNotification(null);
        notificationRef.current?.hideToast();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const [captcha, setCaptcha] = useState<string>("");

  const onChange = (value: string | null) => {
    setCaptcha(value || "");
  };


  return (
    <>
      <div
        className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="image"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="ml-3 text-lg text-white"> EcoSync </span>
              </a>
              <div className="my-auto">
                <img
                  alt="image"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  A waste management solution for your business
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account. A waste
                  management solution for your business
                </div>
                {error && (
                  <div className="flex items-center mt-4 intro-x text-red-500 dark:text-red-400">
                    <AlertCircle className="w-6 h-6 mr-2" />
                    {error}
                  </div>
                )}
                <div className="mt-8 intro-x">
                  <FormInput
                    type="text"
                    className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required  

                  />
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                  <div className="flex items-center mr-auto">
                    <FormCheck.Input
                      id="remember-me"
                      type="checkbox"
                      className="mr-2 border"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"

                    >
                      Show Password
                    </label>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-theme-1 dark:text-theme-10 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="mt-5">
                  <ReCAPTCHA
                    sitekey="6Ldvq6UpAAAAAHMGEpmVWYS24qFB47uSefGNMS8D"
                    onChange={onChange}
                  />
                </div>

                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <Button
                    variant="primary"
                    className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
            <Notification
              getRef={(el) => {
                notificationRef.current = el;
              }}
              className="flex"
            >
              <AlertCircle
                className={`w-6 h-6 text-${type === "success" ? "green" : "red"}-500`}
              />
              <div className="ml-4 mr-4">
                <div className="font-medium">{_.startCase(type)}</div>
                <div className="mt-1 text-slate-500">{notification}</div>
              </div>
            </Notification>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
