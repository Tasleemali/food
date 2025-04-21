"use client"
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const markAsDelivered = async (orderId) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: "Delivered" }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Order marked as Delivered!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Delivered" } : order
          )
        );
      } else {
        alert("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">Order ID: {order.orderId}</h3>
            <p>Status: <span className="font-semibold">{order.status}</span></p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              disabled={order.status === "Delivered"}
              onClick={() => markAsDelivered(order._id)}
            >
              {order.status === "Delivered" ? "Delivered" : "Mark as Delivered"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

