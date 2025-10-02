"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the modes your bot can run in
export type Mode = "support" | "sales" | "booking" | "tech";

export function ModeToggle({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Label className="whitespace-nowrap">Mode</Label>
      <Select value={value} onValueChange={(v) => onChange(v as Mode)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Choose mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="support">Customer Support</SelectItem>
          <SelectItem value="sales">Sales Assistant</SelectItem>
          <SelectItem value="booking">Booking Assistant</SelectItem>
          <SelectItem value="tech">Tech Support</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
