import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login successful!");

  navigate("/dashboard");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b12]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11111b] p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Twitch Promotions Dashboard
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
  type="email"
  placeholder="admin@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
/>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
  type="password"
  placeholder="********"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
/>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-black hover:bg-yellow-400"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}