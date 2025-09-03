import React, { useEffect } from "react";

const PricingAndShippingPolicy = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg font-sans text-gray-800 py-42 ">
      <section className="mb-10">
        <h2 className="text-3xl  font-bold text-gray-900 mb-4  inline-block pb-1">
          Product Pricing
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We strive to offer competitive and transparent pricing on all our products. The prices listed on our website are in <span className="font-semibold">USD</span> and include all applicable taxes unless otherwise stated. Prices are subject to change without prior notice due to market conditions, promotions, or other factors.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>All prices are final at the time of purchase.</li>
          <li>Discounts, coupons, or promotional offers will be clearly indicated and applied at checkout.</li>
          <li>Shipping fees, if applicable, are calculated separately and added to the total order amount.</li>
          <li>For bulk or wholesale orders, please contact our sales team for special pricing.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl  font-bold text-gray-900 mb-4  inline-block pb-1">
          Shipping / Delivery Policy
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We are committed to delivering your orders promptly and safely. Please review our shipping and delivery policy below:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>
            <span className="font-semibold">Processing Time:</span> Orders are typically processed within 1-3 business days after payment confirmation.
          </li>
          <li>
            <span className="font-semibold">Shipping Methods:</span> We offer various shipping options including standard, expedited, and express delivery. Shipping costs and estimated delivery times will be displayed at checkout.
          </li>
          <li>
            <span className="font-semibold">Delivery Time:</span> Delivery times vary depending on your location and the shipping method selected. Standard shipping usually takes 5-7 business days, while expedited options may take 2-3 business days.
          </li>
          <li>
            <span className="font-semibold">Tracking:</span> Once your order is shipped, you will receive a tracking number via email to monitor your shipment.
          </li>
          <li>
            <span className="font-semibold">Shipping Restrictions:</span> We currently ship to select countries. Some products may have shipping restrictions due to size, weight, or regulations.
          </li>
          <li>
            <span className="font-semibold">Lost or Damaged Items:</span> If your order is lost or arrives damaged, please contact our customer support within 7 days of delivery for assistance.
          </li>
          <li>
            <span className="font-semibold">Returns and Exchanges:</span> For information on returns or exchanges, please refer to our Return Policy page.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PricingAndShippingPolicy;