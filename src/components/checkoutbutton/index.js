"use client"

import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
export default function CheckoutButton({  cartItems, totalAmount ,name ,email ,contact , address }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
const router = useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const handleCheckout = async () => {
  if (!user || !user._id) {
    alert("User not logged in. Please log in first.");
    return;
  }

  setLoading(true);
  
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error("Failed to load Razorpay SDK");
    }

    const orderResponse = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const orderData = await orderResponse.json();
    if (!orderData.success) throw new Error("Order creation failed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: totalAmount * 100,
      currency: "INR",
      name: "foodie",
      description: "Payment for your order",
      order_id: orderData.order.id,
      handler: async function (response) {
        await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: user._id,
            cartItems,
            totalAmount,
            // address: user.address || "", // Provide default address
            name,
            email,
            contact ,
            address
          }),
        });

        alert("Payment successful! Order placed.");
        router.push("/")
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <button onClick={handleCheckout} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
