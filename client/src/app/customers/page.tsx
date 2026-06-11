import { CreateCustomerForm } from "@/components/customers/CreateCustomerForm";

export default function CustomersPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Customer</h1>

      <CreateCustomerForm />
    </main>
  );
}
