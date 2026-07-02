import { CreateCustomerDto, CustomerData } from "@/types/customer.types";
import { API_URL } from "@/config/api";

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

export const getCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  const result = await response.json();
  return result.data;
};

export const getCustomerById = async (id: string): Promise<CustomerData> => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  const result = await response.json();

  return result.data;
};

export const getCustomerVehicleById = async (
  id: string,
): Promise<CustomerData> => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  const result = await response.json();

  return result.data;
};

export const editCustomerById = async (
  id: string,
  customerData: CreateCustomerDto,
) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
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
