"use client";

import { useState } from "react";
import useApi from "@/hooks/useApi";

interface InventoryFormProps {
  initialData?: {
    id?: number;
    name: string;
    quantity: number;
    category: string;
    status: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

interface InventoryResponse {
  id: number;
  name: string;
  quantity: number;
  category: string;
  status: string;
  lastUpdated: string;
}

export default function InventoryForm({ initialData, onSuccess, onCancel }: InventoryFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    quantity: initialData?.quantity || 0,
    category: initialData?.category || "",
    status: initialData?.status || "In Stock",
  });

  const { execute, loading } = useApi<InventoryResponse>(
    initialData?.id ? `/api/inventory/${initialData.id}` : "/api/inventory",
    initialData?.id ? "PUT" : "POST"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await execute(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to save inventory item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData?.id ? "Update" : "Add"} Item
        </button>
      </div>
    </form>
  );
}
