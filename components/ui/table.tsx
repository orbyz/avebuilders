import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <thead className="border-b border-app-border" {...props} />;
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody {...props} />;
}

export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className="border-b border-app-border transition-colors hover:bg-app-surface2"
      {...props}
    />
  );
}

export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className="h-10 px-4 text-left font-medium text-app-muted" {...props} />
  );
}

export function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-3" {...props} />;
}
