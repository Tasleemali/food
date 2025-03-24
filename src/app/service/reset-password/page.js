"use client";
import { useState } from "react";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const resetPassword = async () => {
        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4">
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-64" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-2 w-64" />
            <button onClick={resetPassword} className="bg-red-500 text-white px-4 py-2">Reset Password</button>
            {message && <p>{message}</p>}
        </div>
    );
}
