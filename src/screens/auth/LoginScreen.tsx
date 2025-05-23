import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { bgImgUrl } from "@/utils/images"
import { login } from "@/store/auth/slice"
import { useNavigate } from "react-router"
import { useAppDispatch } from "@/hooks"
import { loginUser } from "@/services"
import { ROUTES } from "@/constants"

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: formData.username ? "" : "Username is required",
            password: formData.password ? "" : "Password is required",
        };
        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            try {
                setLoading(true);
                const response = await loginUser(formData.username, formData.password);
                dispatch(login(response));
                navigate(ROUTES.HOME);
            } catch (error) {
                setApiError(error as string);
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{
                backgroundImage: `url(/images/background/${bgImgUrl}.jpg)`,
            }}
            className={cn("min-h-screen w-screen flex items-center justify-center",
                "bg-cover bg-center bg-no-repeat"
            )}>
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">F9</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Focus 9 ERP</h1>
                    <p className="text-gray-600 mt-1">Login to your account</p>
                    <div className="flex flex-col items-start gap-1 text-sm -mb-8 py-2">
                        <h2 className="text-black font-normal text-xs uppercase tracking-wider">Demo Credentials</h2>
                        <div className="flex gap-4 bg-gray-50/50 px-3 py-2 rounded-md">
                            <span className="text-gray-600">
                                <span className="font-medium">Username:</span>
                                <code className="ml-1.5 font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">admin</code>
                            </span>
                            <span className="text-gray-600">
                                <span className="font-medium">Password:</span>
                                <code className="ml-1.5 font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">admin</code>
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your username"
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                Password
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="rememberMe"
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">© {new Date().getFullYear()} Focus 9 ERP. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
