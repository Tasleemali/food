"use client";
import { useState } from "react";

export default function VerifyOtp() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const verifyOtp = async () => {
        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4">
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-64" />
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2 w-64" />
            <button onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2">Verify OTP</button>
            {message && <p>{message}</p>}
        </div>
    );
}
