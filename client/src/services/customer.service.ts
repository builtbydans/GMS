import { CreateCustomerDto } from "@/types/customer.types";

const API_URL = "http://localhost:3000";

export const createCustomer = async (customerData: CreateCustomerDto) => {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
};
