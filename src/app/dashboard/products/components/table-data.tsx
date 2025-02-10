import React from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import ViewButton from "./view-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import ImagesButton from "./images-button";
import VideosButton from "./videos-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableData = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="whitespace-nowrap">
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead className="text-left">Action</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Short Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Updated By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">01</TableCell>
          <TableCell>
            <span className="flex items-center justify-start h-full">
              <ViewButton />
              <DeleteButton />
              <EditButton />
              <ImagesButton />
              <VideosButton />
            </span>
          </TableCell>
          <TableCell>
            {true ? (
              <Image
                src={`/icons/pc.png`}
                width={100}
                height={100}
                alt=""
                className="w-10 aspect-square object-contain"
              />
            ) : (
              <ImageIcon />
            )}
          </TableCell>
          <TableCell>00001</TableCell>
          <TableCell>
            <span className="line-clamp-3">TUF Gaming F16 (2024)</span>
          </TableCell>
          <TableCell className="text-destructive whitespace-nowrap">
            123 $
          </TableCell>
          <TableCell>ASUS</TableCell>
          <TableCell>កុំព្យូទ័រ</TableCell>
          <TableCell>
            <span className="line-clamp-3">
              ASUS TUF Gaming A16 Advantage Edition (2023) 16" ASUS TUF Gaming
              A16 Advantage Edition (2023) See more Learn more Compare
            </span>
          </TableCell>
          <TableCell>18-DEC-2025</TableCell>
          <TableCell>Long Soeng</TableCell>
          <TableCell>18-DEC-2025</TableCell>
          <TableCell>N/A</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableData;
