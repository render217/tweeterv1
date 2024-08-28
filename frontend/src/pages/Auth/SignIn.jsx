/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import SocialLogin from "./components/SocialLogin";
import FormLogo from "./components/FormLogo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSignInUser } from "../../libs/query/queries";

import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
export default function SignIn() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleInputChange = (name) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  // mutation
  const { mutateAsync: signInUser, isPending } = useSignInUser();
  // handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All Fields are required");
      return;
    }
    try {
      const { data } = await signInUser({ email, password });
      // console.log(data);
      toast.success(data.message);
      // eslint-disable-next-line no-unused-vars
      const { followers, following, ...rest } = data.payload.user;
      // handle response

      Cookies.set("tw_token", data.payload.token);
      Cookies.set("tw_user", JSON.stringify(rest));

      setUser(rest);
      setIsAuthenticated(true);

      // navigate to home
      navigate("/home", { replace: true });
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while Signing In"
      );
    }
  };
  return (
    <div className="h-screen w-screen overflow-hidden font-Poppins">
      <div className="flex h-full w-full items-center justify-center  ">
        <div className=" w-full max-w-md rounded-xl bg-white  py-5 shadow-md max-sm:mx-[4%]">
          <FormLogo />
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col gap-4 px-8 pb-3 pt-3">
            <Input
              disabled={isPending}
              value={email}
              onChange={handleInputChange("email")}
              label={"Email"}
              type="email"
            />

            <Input
              disabled={isPending}
              value={password}
              onChange={handleInputChange("password")}
              label={"Password"}
              type="password"
            />
            <div className="my-2">
              <button
                disabled={isPending}
                className={`${
                  isPending
                    ? "cursor-not-allowed bg-clrGunSmoke"
                    : "bg-clrClearBlue hover:bg-clrClearBlue/90"
                } w-full rounded-md  py-2 text-sm text-white `}>
                {isPending ? "Sigining In..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mb-4 flex gap-5 px-8">
            <SocialLogin
              onClick={() => {}}
              label={"Google"}
              logoImg={"/logos/Google.svg"}
            />
            <SocialLogin
              onClick={() => {}}
              label={"Github"}
              logoImg={"/logos/Github.svg"}
            />
          </div>
          <p className="text-center text-xs  text-clrGunSmoke">
            Don't Have an account ?{" "}
            <Link
              className="text-clrClearBlue/70 underline hover:text-clrClearBlue"
              to="/signUp">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
