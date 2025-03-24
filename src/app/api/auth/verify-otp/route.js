import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });

        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_ID)
            .verificationChecks.create({ to: email, code: otp });

        if (verificationCheck.status === "approved") {
            return NextResponse.json({ message: "OTP verified! Proceed to reset password." });
        } else {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
