import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Za-z]/, "Must contain at least one letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[@$!%*?&]/, "Must contain at least one special character"),
});

type FormData = z.infer<typeof schema>;

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Signup failed");

    const resData = await response.json();
    localStorage.setItem("token", resData.token);
    navigate("/app");
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 w-full"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
