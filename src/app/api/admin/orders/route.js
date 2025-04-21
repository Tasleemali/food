import { NextResponse } from "next/server";
import { authDB } from "@/database/authDB";
import Order from "@/models/Order";
import User from "@/models/User"; // ✅ Ensure User schema is imported

export async function GET() {
  await authDB();

  try {
    const orders = await Order.find().populate({
      path: "userId",
      select: "email", // ✅ Ensure we only fetch user email
      model: User, // ✅ Explicitly specify the model
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
