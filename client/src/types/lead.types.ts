export interface CreateLeadDto {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  registration: string;
  make: string;
  model: string;

  message: string;
}

export interface LeadSummaryDto {
  id: string;
  job_number: string;
  description: string;
  status: string;
  created_at: string;
  job_type: string | null;
  quoted_cost: number | null;

  vehicles: {
    registration: string;
    make: string;
    model: string;

    customers: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
  };
}

export interface QuoteLeadDto {
  job_type: string;
  quoted_cost: number;
}
