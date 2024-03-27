"use client";
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import SmallLoader from "@/svg/SmallLoader";
import { apiUrl } from "@/config";

interface FormData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [OTPChecking, setOTPChecking] = useState<boolean>(false);
  const [OTPValue, setOTPValue] = useState<number[]>(new Array(4).fill(null));
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/internal/auth`,
        {
          secretCode: formData.password,
          email: formData.email,
        }
      );

      localStorage?.setItem("loginUserDetails", JSON.stringify(response));

      // console.log(response.data);  // this is the response with the object containing JWT token
      const adminToken = response.data.token;
      const userRole = response?.data?.userData?.role;

      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); //expiration time for 30 days
      if (process.browser) {
        document.cookie = `token=${adminToken}; expires=${expirationDate.toUTCString()}; path=/; secure; SameSite=Strict`; //save the token in the cookie
        document.cookie = `role=${userRole}; expires=${expirationDate.toUTCString()}; path=/; secure; SameSite=Strict`;
      }

      //redirect the valid admin user to the dashboard
      console.log(response);
      setIsLoginError(false);
      setLoading(false);
      router.push("/dashboard");

      //reset the login form
      setFormData({
        email: "",
        password: "",
      });

    } catch (error: unknown) {
      setLoading(false);
      console.error("Error submitting form:", error);
      setIsLoginError(true);
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (error.isAxiosError && error.response && error.response.data) {
          // Assert the type of response data
          const responseData = error.response.data as { msg: string };
          const errorMessage = responseData.msg;
          setLoginErrorMessage(errorMessage);
        } else {
          // Handle other types of errors
          setLoginErrorMessage("An error occurred. Please try again later.");
        }
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const handleOTPFormSubmit: React.MouseEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api`,
      )

    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      setIsLoginError(true);
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (error.isAxiosError && error.response && error.response.data) {
          // Assert the type of response data
          const responseData = error.response.data as { msg: string };
          const errorMessage = responseData.msg;
          setLoginErrorMessage(errorMessage);
        } else {
          // Handle other types of errors
          setLoginErrorMessage("An error occurred. Please try again later.");
        }
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleOTPCheckClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.preventDefault();
    setOTPChecking(true);
  }

  const handleOTPInputChange: (e: React.ChangeEvent<HTMLInputElement>, arrayIndex: number) => void = (e, arrayIndex) => {
    e.preventDefault();
    const updatedOTPValue: number[] = [...OTPValue];
    const inputFieldValue: string = e.target?.value;
    updatedOTPValue[arrayIndex] = parseInt(inputFieldValue);
    setOTPValue(updatedOTPValue);

    if (arrayIndex >= 0 && inputFieldValue === "") {
      otpRefs.current[arrayIndex - 1]?.focus();
    }
    else if (arrayIndex !== 3) {
      otpRefs.current[arrayIndex + 1]?.focus();
    }
  }

  return (
    <section className="bg-gray-50 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 w-full lg:w-2/3 xl:w-1/3 sm:w-2/3">
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="Enter your email"
                  required
                  disabled={OTPChecking}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputStyles} w-full`}
                    placeholder="Enter your password"
                    required
                    disabled={OTPChecking}
                  />
                  <button
                    type="button"
                    className="absolute right-0 mr-2 text-xs font-semibold text-gray-500 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button className={`${buttonStyles} ${OTPChecking ? "hidden" : ""}`} type="submit" onClick={handleOTPCheckClick}>Next</button>
              <div
                className={`${isLoginError ? "" : "hidden"
                  } text-red-500 text-sm font-bold`}
              >
                {loginErrorMessage}
              </div>
            </form>

            {/* OTP component */}
            {OTPChecking &&
              <form className="flex flex-col items-center justify-between gap-4" onSubmit={handleOTPFormSubmit}>
                <div className="text-xs text-center font-semibold text-gray-600">
                  Enter the 4 digit OTP sent to <span className="text-blue-500"> {formData.email}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  {OTPValue.map((data, index) => (
                    <div key={index} className="flex-shrink-0">
                      <input
                        type="text"
                        className={`${inputStyles} w-10 h-10 aspect-square rounded-lg text-center`}
                        maxLength={1}
                        onChange={(e) => handleOTPInputChange(e, index)}
                        ref={(ref) => (otpRefs.current[index] = ref)}
                        required
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className={`${buttonStyles} ${OTPChecking ? "" : "hidden"}`}>
                  {loading ? <SmallLoader /> : "Submit"}
                </button>
                <div
                  className={`${isLoginError ? "" : "hidden"
                    } text-red-500 text-sm font-bold`}
                >
                  {loginErrorMessage}
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

// Repeated styles
const inputStyles =
  "bg-gray-50 border border-gray-300 text-gray-900 disabled:opacity-30 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
const buttonStyles =
  "mt-4 border border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2 text-center bg-[#38A0DB] text-white";


export default SignInForm;