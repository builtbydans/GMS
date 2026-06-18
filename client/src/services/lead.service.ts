import { CreateLeadDto } from "@/types/lead.types";

const API_URL = "http://localhost:3000";

export const createLead = async (leadData: CreateLeadDto) => {
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    throw new Error("Failed to create new lead");
  }

  return response.json();
};

export const getLeads = async () => {
  const response = await fetch(`${API_URL}/leads`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const result = await response.json();
  return result.data;
};
