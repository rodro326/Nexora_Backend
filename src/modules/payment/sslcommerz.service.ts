import SSLCommerzPayment from "sslcommerz-lts";
import sslcommerzConfig from "../../config/sslcommerz";

const sslcommerz = new SSLCommerzPayment(
  sslcommerzConfig.storeId,
  sslcommerzConfig.storePassword,
  sslcommerzConfig.isLive
);
const initiatePayment = async (payload: {
  totalAmount: number;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}) => {
  const data = {
    total_amount: payload.totalAmount,
    currency: "BDT",
    tran_id: payload.transactionId,

    success_url:
      "http://localhost:5001/api/payments/sslcommerz/success",

    fail_url:
      "http://localhost:5001/api/payments/sslcommerz/fail",

    cancel_url:
      "http://localhost:5001/api/payments/sslcommerz/cancel",

    ipn_url:
      "http://localhost:5001/api/payments/sslcommerz/ipn",

    shipping_method: "NO",
    product_name: "Nexora Electronics",
    product_category: "Electronics",
    product_profile: "general",

    cus_name: payload.customerName,
    cus_email: payload.customerEmail,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: payload.customerPhone,

    ship_name: payload.customerName,
    ship_add1: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await sslcommerz.init(data);

console.log("SSLCommerz init response:", response);

return response;
};

const validatePayment = async (valId: string) => {
  const response = await sslcommerz.validate({
    val_id: valId,
  });

  return response;
};


export {
  sslcommerz,
  initiatePayment,
  validatePayment,
};