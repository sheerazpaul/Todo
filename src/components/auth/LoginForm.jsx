import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useLogin } from "../../hooks/useAuth";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm"
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-soft">
          <LogIn size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign in to your TaskFlow account
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => login.mutate(data))}
        className="space-y-4"
      >
        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          autoComplete="username"
          error={errors.username?.message}
          {...register("username", { required: "Username is required" })}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={login.isPending}
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary-600 font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </motion.div>
  );
}
