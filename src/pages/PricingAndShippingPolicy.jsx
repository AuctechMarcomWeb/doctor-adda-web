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
          We strive to offer competitive and transparent pricing on all our
          products. The prices listed on our website are in{" "}
          <span className="font-semibold">USD</span> and include all applicable
          taxes unless otherwise stated. Prices are subject to change without
          prior notice due to market conditions, promotions, or other factors.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>All prices are final at the time of purchase.</li>
          <li>
            Discounts, coupons, or promotional offers will be clearly indicated
            and applied at checkout.
          </li>
          <li>
            Shipping fees, if applicable, are calculated separately and added to
            the total order amount.
          </li>
          <li>
            For bulk or wholesale orders, please contact our sales team for
            special pricing.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl  font-bold text-gray-900 mb-4  inline-block pb-1">
          Shipping / Delivery Policy
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We are committed to delivering your orders promptly and safely. Please
          review our shipping and delivery policy below:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>
            <span className="font-semibold">Processing Time:</span> All orders
            are processed within 1-2 business days (excluding weekends and
            holidays) after receiving full payment. You will receive a
            confirmation email with the tracking information once your order has
            been shipped.
          </li>
          <li>
            <span className="font-semibold">Shipping Rates and Methods:</span>{" "}
            We offer a variety of shipping options, including standard and
            expedited services. Shipping rates are calculated based on the
            weight of your order and the destination. You can view the shipping
            options and rates during the checkout process.
          </li>
          <li>
            <span className="font-semibold">Domestic Shipping:</span> We
            currently offer shipping within the City. Estimated delivery times
            for standard shipping are 1-2 business days.
          </li>
          <li>
            <span className="font-semibold">Order Tracking:</span>{" "}Once your
            order has been shipped, you will receive an email with the tracking
            number and a link to track your package's progress. Please allow up
            to 24 hours for the tracking information to update.
          </li>
          <li>
            <span className="font-semibold">Address Accuracy:</span>{" "}Please
            ensure that your shipping address is accurate and complete. We are
            not responsible for orders shipped to incorrect or incomplete
            addresses provided by the customer. Any additional shipping charges
            incurred due to incorrect addresses will be the customer's
            responsibility.
          </li>
          <li>
            <span className="font-semibold">Lost or Stolen Packages:</span>{" "}We
            are not responsible for lost or stolen packages. If you believe your
            package has been lost or stolen, please contact the shipping carrier
            directly to file a claim. We recommend checking with neighbours or
            your local postal service for assistance.
          </li>
          <li>
            <span className="font-semibold">Returns and Refunds:</span> For
            information on returns and refunds, please refer to our Return
            Policy.
          </li>
          <li>
            <span className="font-semibold">Contact Information:</span> If you
            have any questions about your order or our shipping policy, please
            contact our customer service team at 9005278148.
          </li>
          <li>
            <span className="font-semibold">Changes to Shipping Policy:</span>{" "}
            We reserve the right to update or modify our shipping policy at any
            time without prior notice. Any changes will be reflected on this
            page.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PricingAndShippingPolicy;
