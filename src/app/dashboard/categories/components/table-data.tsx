import React from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import ViewButton from "./view-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCategories } from "@/service/category-service";
import { Category } from "@/types/category-type";
import { CATEGORY_IMAGE_URL } from "@/config/env";
import moment from "moment";
import MyNoDataIcon from "@/components/my-no-data-icon";
import MyPagination from "@/components/my-pagination";
import MyNoImage from "@/components/my-no-image";

const TableData = async () => {
  const result = await fetchCategories();
  const categories: Category[] = result.data;
  const links = result.links;
  const from = result.from;
  const to = result.to;
  const total = result.total;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="whitespace-nowrap">
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="text-left">Action</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Name Khmer</TableHead>
            <TableHead>Order Index</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Updated By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span className="flex items-center justify-start h-full">
                    <ViewButton />
                    <DeleteButton id={category.id} />
                    <EditButton id={category.id} />
                  </span>
                </TableCell>
                <TableCell>
                  {category.image ? (
                    <Image
                      src={CATEGORY_IMAGE_URL + category.image}
                      width={100}
                      height={100}
                      alt=""
                      className="w-10 aspect-square object-contain"
                    />
                  ) : (
                    <MyNoImage iconWidth="w-10" />
                  )}
                </TableCell>
                <TableCell>{category.code || '--' }</TableCell>
                <TableCell>{category.title || '--' }</TableCell>
                <TableCell>{category.title_kh || '--' }</TableCell>
                <TableCell>{category.order_index || '--' }</TableCell>
                <TableCell>{category.parent_code || '--' }</TableCell>
                <TableCell>
                  {moment(category.created_at).format("D-MMM-YYYY")}
                </TableCell>
                <TableCell>...</TableCell>
                <TableCell>
                  {moment(category.updated_at).format("D-MMM-YYYY")}
                </TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12}>
                <MyNoDataIcon />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <MyPagination links={links} from={from} to={to} total={total} />
    </>
  );
};

export default TableData;
