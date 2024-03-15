"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://cfx-mono-production-5ec7.up.railway.app/api/internal/auth",
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

  // Repeated styles
  const inputStyles =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
  const buttonStyles =
    "mt-4 border border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2 text-center mr-2 bg-[#38A0DB] text-white";

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
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  PIN
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="Enter your PIN number"
                  required
                />
              </div>
              <button type="submit" className={buttonStyles}>
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-6 h-6 me-3 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Log in"
                )}
              </button>
              <div
                className={`${isLoginError ? "" : "hidden"
                  } text-red-500 text-sm font-bold`}
              >
                {loginErrorMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;