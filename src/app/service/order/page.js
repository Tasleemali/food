"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Skeleton loader components
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const SkeletonOrder = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <SkeletonBox className="h-6 w-32" />
    <SkeletonBox className="h-4 w-24 mt-2" />
    <div className="mt-4 space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonBox className="h-16 w-16 rounded-lg" />
        <div>
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-4 w-24 mt-2" />
        </div>
      </div>
    </div>
    <SkeletonBox className="h-10 w-32 mt-4" />
  </div>
);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch userId from localStorage or decode JWT
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setUserId(payload.userId); // Ensure your JWT includes `userId`
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  console.log("Orders Data:", orders);

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch("/api/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order cancelled successfully!");
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        <div className="grid gap-6">
          {[...Array(3)].map((_, index) => (
            <SkeletonOrder key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Order ID: {order.orderId}</h2>
              <p>{order.status}</p>
              <p className="text-gray-500">Total: ₹{order.totalAmount}</p>
              <div className="mt-4 space-y-4">
                {order.products.map((product) => (
                  <div key={product._id} className="flex items-center space-x-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                      
                    />
                    <div>
                      <h3 className="text-md font-medium">{product.name}</h3>
                      <p className="text-gray-600">Qty: {product.qty}</p>
                      <p className="text-gray-600">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {order.status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order.orderId)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
