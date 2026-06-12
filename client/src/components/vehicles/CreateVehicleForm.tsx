"use client";

import { useState } from "react";
import { CreateVehicleDto, VehicleFormData } from "@/types/vehicle.types";
import { createVehicle } from "@/services/vehicle.service";
import { Button } from "../ui/button";

type CreateVehicleFormProps = {
  customerId: string;
};

export const CreateVehicleForm = ({ customerId }: CreateVehicleFormProps) => {
  const [formData, setFormData] = useState<VehicleFormData>({
    registration: "",
    make: "",
    model: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const vehicleData: CreateVehicleDto = {
        customer_id: customerId,
        ...formData,
      };

      const result = await createVehicle(vehicleData);
      console.log(result);

      alert("Vehicle created!");

      setFormData({
        registration: "",
        make: "",
        model: "",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        name="registration"
        placeholder="Registration"
        value={formData.registration}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <Button
        variant="outline"
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Vehicle"}
      </Button>
    </form>
  );
};
