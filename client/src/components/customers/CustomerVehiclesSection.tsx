"use client";

import { useState } from "react";

import { VehicleData } from "@/types/vehicle.types";

import { Button } from "@/components/ui/button";
import { CreateVehicleForm } from "@/components/vehicles/CreateVehicleForm";

type CustomerVehiclesSectionProps = {
  customerId: string;
  vehicles: VehicleData[];
};

export const CustomerVehiclesSection = ({
  customerId,
  vehicles,
}: CustomerVehiclesSectionProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Vehicles</h2>

        <Button variant="outline" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Vehicle"}
        </Button>
      </div>

      {showForm && (
        <div className="mt-4 rounded-lg border p-4">
          <CreateVehicleForm customerId={customerId} />
        </div>
      )}

      {vehicles.length === 0 ? (
        <div className="mt-4 rounded-lg border p-6">No vehicles found.</div>
      ) : (
        <div className="mt-4 space-y-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="rounded-lg border p-4">
              <div className="font-semibold">{vehicle.registration}</div>

              <div className="text-sm text-slate-500">
                {vehicle.make} {vehicle.model}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
