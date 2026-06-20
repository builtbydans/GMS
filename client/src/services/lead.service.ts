import {
  CreateLeadDto,
  LeadSummaryDto,
  QuoteLeadDto,
} from "@/types/lead.types";

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

export const getLeadById = async (id: string): Promise<LeadSummaryDto> => {
  const response = await fetch(`${API_URL}/leads/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lead");
  }

  const result = await response.json();
  return result.data;
};

export const quoteLead = async (id: string, quoteData: QuoteLeadDto) => {
  const response = await fetch(`${API_URL}/leads/${id}/quote`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
};

export const markLeadAsLost = async (id: string) => {
  const response = await fetch(`${API_URL}/leads/${id}/lost`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark lead as lost");
  }

  return response.json();
};

export const bookLead = async (id: string) => {
  const response = await fetch(`${API_URL}/leads/${id}/book`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fail to book lead, please check status");
  }

  return response.json();
};
