export async function POST(req) {
    await authDB();
  
    try {
      const { orderId, status } = await req.json();
  
      if (!["Pending", "Paid", "Cancelled", "Failed"].includes(status)) {
        return NextResponse.json({ success: false, message: "Invalid status!" }, { status: 400 });
      }
  
      const order = await Order.findOne({ orderId });
      if (!order) {
        return NextResponse.json({ success: false, message: "Order not found!" }, { status: 404 });
      }
  
      order.status = status;
      if (status === "Cancelled") {
        order.products = []; // Remove products if cancelled
      }
  
      await order.save();
      return NextResponse.json({ success: true, message: "Order updated successfully!" });
    } catch (error) {
      console.error("❌ Error updating order:", error);
      return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
  }
  