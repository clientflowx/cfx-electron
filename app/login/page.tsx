import React from 'react';

const SignInForm: React.FC = () => {
    return (
        <section className="bg-gray-50 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 w-full lg:w-2/3 xl:w-1/3 sm:w-2/3">
                <div className="w-full bg-white rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">UID</label>
                                <input type="password" name="password" id="password" placeholder="Enter your id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <button
                                type="submit"
                                className={`mt-4  border border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2 text-center mr-2 bg-[#38A0DB] text-white `}>
                                Sign in
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
}

export default SignInForm;
