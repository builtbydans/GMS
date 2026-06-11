export interface CreateInvoiceData {
  job_id: string;
  subtotal: number;
  discount: number;
  vat_rate: number;
  vat: number;
  total: number;
}

export interface UpdateInvoiceData {
  status?: string;
  subtotal?: number;
  discount?: number;
  vat?: number;
  total?: number;
}

export interface CreateInvoiceDto {
  job_id: string;
}

export interface UpdateInvoiceDto {
  status?: string;
  subtotal?: number;
  discount?: number;
}
