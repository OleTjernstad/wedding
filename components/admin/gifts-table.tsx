"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import type { GiftWithCategory } from "@/lib/types";
import type { Category } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

interface GiftsTableProps {
  gifts: GiftWithCategory[];
  categories: Category[];
}

export function GiftsTable({ gifts, categories }: GiftsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [deleteGiftId, setDeleteGiftId] = useState<string | null>(null);

  const columns: ColumnDef<
    Omit<GiftWithCategory, "category"> & {
      categoryName: string;
    }
  >[] = [
    {
      accessorKey: "name",
      header: "Navn",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "Kategori",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("categoryName")}</Badge>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Antall",
      cell: ({ row }) => row.getValue("quantity"),
    },
    {
      accessorKey: "reservedQuantity",
      header: "Reservert",
      cell: ({ row }) => row.getValue("reservedQuantity"),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const gift = row.original;
        const available = gift.quantity - gift.reservedQuantity;

        if (available === 0) {
          return <Badge className="bg-red-500">Fullt reservert</Badge>;
        } else if (gift.reservedQuantity > 0) {
          return <Badge className="bg-yellow-500">Delvis reservert</Badge>;
        } else {
          return <Badge className="bg-green-500">Tilgjengelig</Badge>;
        }
      },
    },
    {
      accessorKey: "link",
      header: "Lenke",
      cell: ({ row }) => (
        <a
          href={row.getValue("link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("link")}
        </a>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const gift = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Åpne meny</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/gifts/${gift.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Rediger
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setDeleteGiftId(gift.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Slett
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  type TableData = Omit<GiftWithCategory, "category"> & {
    categoryName: string;
  };
  const table = useReactTable<TableData>({
    data: gifts.map((g) => ({ ...g, categoryName: g.category.name })),
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleDeleteGift = async () => {
    if (!deleteGiftId) return;

    try {
      const response = await fetch(`/api/gifts?id=${deleteGiftId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gift");
      }

      toast({
        title: "Gift deleted",
        description: "The gift has been deleted successfully.",
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting gift:", error);
      toast({
        title: "Error",
        description: "Failed to delete gift. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteGiftId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer gaver..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Ingen gaver funnet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Side {table.getState().pagination.pageIndex + 1} av{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Forrige
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Neste
        </Button>
      </div>

      <AlertDialog
        open={!!deleteGiftId}
        onOpenChange={() => setDeleteGiftId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
            <AlertDialogDescription>
              Denne handlingen kan ikke angres. Dette vil permanent slette gaven
              og alle tilknyttede reservasjoner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGift}
              className="bg-red-600 hover:bg-red-700"
            >
              Slett
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
