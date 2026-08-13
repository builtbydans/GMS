import type { ApiFetch } from "@/lib/api-types";
import type { CreateCustomerDto, CustomerData } from "@/types/customer.types";

export function createCustomerService(apiFetch: ApiFetch) {
  const createCustomer = async (customerData: CreateCustomerDto) => {
    const response = await apiFetch("/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    return response.json();
  };

  const getCustomers = async () => {
    const response = await apiFetch("/customers", {
      method: "GET",
    });

    if (!response.ok) {
      const body = await response.text();

      throw new Error(`Failed to fetch customers: ${response.status}\n${body}`);
    }

    const result = await response.json();
    return result.data;
  };

  const getCustomerById = async (id: string): Promise<CustomerData> => {
    const response = await apiFetch(`/customers/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer");
    }

    const result = await response.json();

    return result.data;
  };

  const getCustomerVehicleById = async (
    id: string,
  ): Promise<CustomerData> => {
    const response = await apiFetch(`/customers/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer");
    }

    const result = await response.json();

    return result.data;
  };

  const editCustomerById = async (
    id: string,
    customerData: CreateCustomerDto,
  ) => {
    const response = await apiFetch(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    return response.json();
  };

  return {
    createCustomer,
    getCustomers,
    getCustomerById,
    getCustomerVehicleById,
    editCustomerById,
  };
}
