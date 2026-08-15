/**
 * createOrder
 * Temporary frontend-only order submission. Simulates network latency
 * and returns a locally-generated order confirmation — nothing is sent
 * anywhere yet, and no order is actually persisted.
 *
 * Replace the body of this function once Express + MySQL is ready:
 *
 *   export async function createOrder(orderData) {
 *     const res = await fetch("/api/orders", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(orderData),
 *     });
 *     if (!res.ok) throw new Error("Failed to place order");
 *     return res.json(); // { id, total, ... } from the server
 *   }
 *
 * The caller (checkout page) already treats this as async and already
 * handles thrown errors, so swapping the implementation above is the
 * only change required — no component needs to change.
 */
export async function createOrder(orderData) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    id: generateTemporaryOrderId(),
    placedAt: new Date().toISOString(),
    total: orderData.total,
    itemCount: orderData.items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

// Temporary, frontend-only order ID. Once the backend is connected,
// the real order ID comes from MySQL and this helper is deleted.
function generateTemporaryOrderId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GM-${Date.now().toString().slice(-6)}${random}`;
}