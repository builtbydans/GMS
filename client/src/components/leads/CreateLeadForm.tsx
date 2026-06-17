"use client";

import { useState } from "react";
import { createLead } from "@/services/lead.service";
import { CreateLeadDto } from "@/types/lead.types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateLeadForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateLeadDto>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    registration: "",
    make: "",
    model: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createLead(formData);

      toast("Your enquiry has been sent to the GMS Team", {
        position: "top-center",
      });
      router.push(`/`);
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
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="registration"
        placeholder="Vehicle Registration"
        value={formData.registration}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="make"
        placeholder="Vehicle Make"
        value={formData.make}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="model"
        placeholder="Vehicle Model"
        value={formData.model}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="border p-2 w-full rounded resize-none"
      />

      <Button
        variant="outline"
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Send Enquiry"}
      </Button>
    </form>
  );
};

export default CreateLeadForm;
