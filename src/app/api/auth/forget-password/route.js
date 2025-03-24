import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const otpResponse = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_ID)
            .verifications.create({ to: email, channel: "email" });

        return NextResponse.json({ message: "OTP sent successfully!" , otpResponse});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
