"use client";

import * as React from "react";

import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputSelectProps {
  data?: { id: string; name: string }[];
  field: ControllerRenderProps;
  title: string;
  placeholder: string;
  placeholderSearch: string;
  placeholderSearchNotFound: string;
  isLoading?: boolean;
  onSearch?: (value: string) => void;
  width?: string;
}

export function InputSelect({
  data,
  field,
  title,
  placeholder,

  width = "w-full",
}: InputSelectProps) {
  return (
    <FormItem>
      <FormItem>
        <FormLabel>{title}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {data?.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <FormMessage />
      </FormItem>
    </FormItem>
  );
}
