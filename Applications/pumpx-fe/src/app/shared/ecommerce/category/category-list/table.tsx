"use client";

import { categories } from "@/data/product-categories";
import Table from "@/components/table";
import { useTanStackTable } from "@/components/table/custom/use-TanStack-Table";
import { categoriesColumns } from "./columns";
import TableFooter from "@/components/table/footer";
import TablePagination from "@/components/table/pagination";
import Filters from "./filters";

export type CategoryDataType = (typeof categories)[number];

export default function CategoryTable() {
  const { table, setData } = useTanStackTable<CategoryDataType>({
    tableData: categories,
    columnConfig: categoriesColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: "border border-muted rounded-md",
          rowClassName: "last:border-0",
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
