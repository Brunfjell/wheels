import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../models/store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result?.success) {
        navigate("/dashboard");
      } else {
        setError(result?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[76vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-300">
        <div className="card-body p-6 sm:p-8">
          <div className="text-left mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sign in to your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mx-auto w-80">
            <div className="form-control">
              <label className="label py-2">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-2">
                <span className="label-text font-semibold">Password</span>
              </label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="alert alert-error mt-4 py-2">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mt-4 sm:mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary ${loading ? "loading" : ""}`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="divider my-6 sm:my-8">OR</div>
          
          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <a href="/signup" className="link link-primary">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}