// src/components/persona-toggle.tsx
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PersonaToggleProps = {
  value: "support" | "sales" | "faq";            // current persona
  onChange: (v: "support" | "sales" | "faq") => void; // callback to parent
};

export function PersonaToggle({ value, onChange }: PersonaToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <Label className="whitespace-nowrap">Persona</Label>
      <Select value={value} onValueChange={(v) => onChange(v as any)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose persona" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="faq">FAQ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
