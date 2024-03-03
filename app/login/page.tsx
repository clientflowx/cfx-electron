"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface FormData {
    email: string;
    password: string;
}

const SignInForm: React.FC = () => {

    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cfx-mono-production-5ec7.up.railway.app/api/internal/auth', {
                secretCode: formData.password,
                email: formData.email,
            });

            console.log(response.data);  // this is the response with the object containing JWT token
            const adminToken = response.data.token;

            const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); //expiration time for 30 days
            document.cookie = `token=${adminToken}; expires=${expirationDate.toUTCString()}; path=/; secure; SameSite=Strict`; //save the token in the cookie

            //redirect the valid admin user to the dashboard
            router.push('/dashboard');

            //reset the login form
            setFormData({
                email: '',
                password: '',
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            // alert message functionality can be implemented
        }
        setFormData({
            email: '',
            password: '',
        })
    };

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
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
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
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">PIN</label>
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
                            <button
                                type="submit"
                                className={buttonStyles}
                            >
                                Log in
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Repeated styles
const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
const buttonStyles = "mt-4 border border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2 text-center mr-2 bg-[#38A0DB] text-white";

export default SignInForm;
