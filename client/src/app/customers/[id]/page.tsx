import Link from "next/link";

import { getCustomerById } from "@/services/customer.service";
import { getVehiclesByCustomerId } from "@/services/vehicle.service";

import { CustomerVehiclesSection } from "@/components/customers/CustomerVehiclesSection";

import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CustomerPage = async ({ params }: Props) => {
  const { id } = await params;

  const [customer, vehicles] = await Promise.all([
    getCustomerById(id),
    getVehiclesByCustomerId(id),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <Button asChild variant="outline">
        <Link href="/customers">Back to Customers</Link>
      </Button>

      <div className="mt-6 rounded-lg border p-6">
        <h1 className="text-3xl font-bold">
          {customer.first_name} {customer.last_name}
        </h1>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Email:</strong> {customer.email}
          </p>

          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
        </div>
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <CustomerVehiclesSection customerId={id} vehicles={vehicles} />
        </div>
      </section>
    </main>
  );
};

export default CustomerPage;
