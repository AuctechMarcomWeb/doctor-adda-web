import { useEffect, useRef } from "react";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.log("Error loading Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorPay = ({ orderId, currency, amount, setUpdateStatus, onPaymentSuccess }) => {
  const rzp1 = useRef(null);

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      console.log("Failed to load Razorpay script");
      return;
    }

    const options = {
     key: 'rzp_test_wHiuJBhFZCkHSf', // Your Razorpay key
       amount,
      currency,
      name: "QuickBid Systems Pvt. Ltd",
      order_id: orderId,
      handler: function (response) {
        console.log("Payment success:", response);
        if (onPaymentSuccess) {
          onPaymentSuccess(response);
        }
        setUpdateStatus(true); // move to next step
      },
      modal: {
        confirm_close: true,
        ondismiss: function () {
          console.log("Payment cancelled");
        },
      },
    };

    rzp1.current = new window.Razorpay(options);
    rzp1.current.open();
  };

  useEffect(() => {
    if (orderId) displayRazorpay(); // only open when orderId is set
  }, [orderId]);

  return null;
};

export default RenderRazorPay;
