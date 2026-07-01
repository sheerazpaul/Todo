import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useRegister } from "../../hooks/useAuth";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

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
          <UserPlus size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-500 mt-1">
          Start organizing your work for free
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
        className="space-y-4"
      >
        <Input
          id="reg-username"
          label="Username"
          type="text"
          placeholder="Choose a username"
          autoComplete="username"
          error={errors.username?.message}
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />

        <Input
          id="reg-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />

        <Input
          id="reg-password"
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />

        <Input
          id="reg-confirm"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) => val === password || "Passwords do not match",
          })}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={registerMutation.isPending}
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
