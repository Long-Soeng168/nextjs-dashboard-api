"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const AddNewButton = () => {
  return (
    <Link href={`/dashboard/products/create`}>
      <Button>
        <Plus />
        Add New
      </Button>
    </Link>
  );
};

export default AddNewButton;
