import * as React from "react";

import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";
import { MenuItem } from "../models/menu.model"; // Adjust path as needed

const getDepth = (node: MenuItem, targetId: string, depth = 0): number => {
  if (node.id === targetId) return depth; // Found target, return depth

  if (!node.children) return -1; // No children, stop searching

  for (const child of node.children) {
    const foundDepth = getDepth(child, targetId, depth + 1);
    if (foundDepth !== -1) return foundDepth;
  }

  return -1; // Not found
};

export interface AddMenuFormProps {
  node: MenuItem; // The root menu object with children
  parent: MenuItem | null; // The parent node (if adding a sub-item)
  onSuccess: (response: MenuItem) => void;
  onErrors: (errors: unknown) => void;
  onLoading: (e: unknown) => void;
}

export default function AddMenuForm({
  node,
  parent,
  onSuccess,
  onErrors,
  onLoading,
}: AddMenuFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    rootId: "",
    rootName: "",
    name: "",
    deep: node ? getDepth(node, parent?.id ?? "") + 1 : 0, // Calculate depth
  });

  const resetForm = () => {
    setFormData({
      rootId: "",
      rootName: "",
      name: "",
      deep: 0
    })
  }


  React.useEffect(() => {
    setFormData({
      ...formData, 
      rootName: parent?.name || "",
      rootId: parent?.id || "",
      deep: node ? getDepth(node, parent?.id ?? "") + 1 : 0,
    })
  }, [parent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLoading(true);

    const payload = {
      name: formData.name,
      parentId: formData.rootId,
    }

    try {
      const response = await fetch("/api/menus", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to save");

      const data = await response.json();
      resetForm();
      onSuccess(data);
    } catch (error) {
      onErrors(error);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  console.log(node, parent, formData);

  return (
    <Form onSubmit={handleSubmit} className={'w-2/3'}>
      <Field.Root name="rootName" className="flex flex-col items-start gap-1">
        <Field.Label className="text-sm font-medium text-gray-900">
          Root Id
        </Field.Label>
        <Field.Control
          type="text"
          name="rootName"
          value={formData.rootId}
          onChange={handleChange}
          required
          placeholder="Enter root name"
          disabled
          className={"flex h-[52px] min-w-36 w-full items-center justify-between gap-3 rounded-md px-[16px] py-[14px] text-base text-gray-900 select-none bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 "}
        />
      </Field.Root>
      
      <Field.Root name="rootName" className="flex flex-col items-start gap-1">
        <Field.Label className="text-sm font-medium text-gray-900">
          Root Name
        </Field.Label>
        <Field.Control
          type="text"
          name="rootName"
          value={formData.rootName}
          onChange={handleChange}
          required
          placeholder="Enter root name"
          disabled
          className={"flex h-[52px] min-w-36 w-full items-center justify-between gap-3 rounded-md px-[16px] py-[14px] text-base text-gray-900 select-none bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 "}
        />
      </Field.Root>

      <Field.Root name="name" className="flex flex-col items-start gap-1 mt-4">
        <Field.Label className="text-sm font-medium text-gray-900">Name</Field.Label>
        <Field.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter menu name"
          className={'flex h-[52px] min-w-36 w-full items-center justify-between gap-3 rounded-md px-[16px] py-[14px] text-base text-gray-900 select-none bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 '}
        />
      </Field.Root>

      <Field.Root name="deep" className="flex flex-col items-start gap-1 mt-4">
        <Field.Label className="text-sm font-medium text-gray-900">Depth</Field.Label>
        <Field.Control
          type="number"
          name="deep"
          value={formData.deep}
          disabled
          className={'flex h-[52px] min-w-36 w-full items-center justify-between gap-3 rounded-md px-[16px] py-[14px] text-base text-gray-900 select-none bg-gray-100 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 '}
        />
      </Field.Root>

      <button disabled={loading} type="submit" className="mt-4 x-[32px] py-[12px] rounded-[48px] bg-[#253BFF] text-white w-full">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}
