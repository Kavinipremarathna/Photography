import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverStatus, setServerStatus] = useState("checking");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkServer = async () => {
      try {
        await api.get("/health");
        if (isMounted) setServerStatus("online");
      } catch {
        if (isMounted) setServerStatus("offline");
      }
    };

    checkServer();
    const intervalId = setInterval(checkServer, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = { email: email.trim().toLowerCase(), password };
      const { data } = await api.post("/auth/login", payload);
      login(data);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Cannot connect to server. Please start backend and try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl mb-4 font-bold">Admin Login</h2>
        <p
          className={`text-sm mb-3 ${
            serverStatus === "online"
              ? "text-green-600"
              : serverStatus === "offline"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          Server: {serverStatus}
        </p>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white w-full py-2">
          Login
        </button>
      </form>
    </div>
  );
}
