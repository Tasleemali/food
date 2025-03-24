import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { authDB } from "@/database/authDB";


export async function POST(req) {
    await authDB();
    
    try {
        const { email, newPassword } = await req.json();
        if (!email || !newPassword) return NextResponse.json({ error: "All fields are required" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        return NextResponse.json({ message: "Password reset successfully!" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
