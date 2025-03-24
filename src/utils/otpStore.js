const otpStore = new Map(); // Stores { username: { otp, expiry } }

export function generateOTP(username) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    otpStore.set(username, { otp, expiry });
    return otp;
}

export function verifyOTP(username, otp) {
    const record = otpStore.get(username);
    if (!record) return false;
    if (Date.now() > record.expiry) {
        otpStore.delete(username); // Remove expired OTP
        return false;
    }
    if (record.otp == otp) {
        otpStore.delete(username); // Remove OTP after successful use
        return true;
    }
    return false;
}
