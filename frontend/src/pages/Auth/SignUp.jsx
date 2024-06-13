import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import Input from "./components/Input";
import FormLogo from "./components/FormLogo";
import { useState } from "react";
import { useSignUpUser } from "../../libs/query/queries";
import { toast } from "react-toastify";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { email, password, username } = formData;
  const handleInputChange = (name) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const { mutateAsync: signUpUser, isPending } = useSignUpUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if all fields are not empty
    if (!email || !password || !username) {
      toast.error("All Fields are required");
      return;
    }
    try {
      const { data } = await signUpUser({ email, password, username });
      toast.success(data?.message);
      navigate("/signIn");
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <div className="h-screen w-screen overflow-hidden font-Poppins">
      <div className="flex h-full w-full items-center justify-center  ">
        <div className=" w-full max-w-md rounded-xl bg-white  py-5 shadow-md max-sm:mx-[4%]">
          <FormLogo />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-8 pb-3 pt-3">
            <Input
              label={"Username"}
              type="text"
              value={formData.username}
              onChange={handleInputChange("username")}
            />
            <Input
              label={"Email"}
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
            />
            <Input
              label={"Password"}
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
            />
            <div className="my-2">
              <button
                disabled={isPending}
                className={`${
                  isPending
                    ? "cursor-not-allowed bg-clrGunSmoke"
                    : "bg-clrClearBlue hover:bg-clrClearBlue/90"
                } w-full rounded-md  py-2 text-sm text-white `}>
                {isPending ? "Signing Up..." : "Sign Up"}
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
            Already have an account{" "}
            <Link
              className="text-clrClearBlue/70 underline hover:text-clrClearBlue"
              to="/signIn">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
