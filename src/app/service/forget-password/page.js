"use client";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendOtp = async () => {
        const res = await fetch("/api/auth/forget-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4">
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-64" />
            <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2">Send OTP</button>
            {message && <p>{message}</p>}
        </div>
    );
}
