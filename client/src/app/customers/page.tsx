import Link from "next/link";
import { getCustomers } from "@/services/customer.service";

import { CreateCustomerForm } from "@/components/customers/CreateCustomerForm";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { Button } from "@/components/ui/button";

const CustomersPage = async () => {
  const customers = await getCustomers();
  return (
    <main className="p-8">
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">Create Customer</h1>

      <CreateCustomerForm />

      <CustomerTable customers={customers} />
    </main>
  );
};

export default CustomersPage;
