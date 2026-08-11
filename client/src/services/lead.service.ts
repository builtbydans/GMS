import {
  CreateLeadDto,
  LeadSummaryDto,
  QuoteLeadDto,
} from "@/types/lead.types";
import { apiFetch } from "@/lib/api";

export const createLead = async (leadData: CreateLeadDto) => {
  const response = await apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    throw new Error("Failed to create new lead");
  }

  return response.json();
};

export const getLeads = async () => {
  const response = await apiFetch("/leads", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const result = await response.json();
  return result.data;
};

export const getLeadById = async (id: string): Promise<LeadSummaryDto> => {
  const response = await apiFetch(`/leads/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lead");
  }

  const result = await response.json();
  return result.data;
};

export const quoteLead = async (id: string, quoteData: QuoteLeadDto) => {
  const response = await apiFetch(`/leads/${id}/quote`, {
    method: "PATCH",
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
};

export const markLeadAsLost = async (id: string) => {
  const response = await apiFetch(`/leads/${id}/lost`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to mark lead as lost");
  }

  return response.json();
};

export const acceptQuote = async (id: string) => {
  const response = await apiFetch(`/leads/${id}/accept`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();

    console.log(error);

    throw new Error(error.message);
  }

  return response.json();
};

export const confirmDeposit = async (id: string) => {
  const response = await apiFetch(`/jobs/${id}/confirm-deposit`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to confirm deposit");
  }

  const result = await response.json();

  return result.data;
};
