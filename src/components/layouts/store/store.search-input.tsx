"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const filterSelectionSchema = z.object({
  search: z.string(),
});

export function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof filterSelectionSchema>>({
    resolver: zodResolver(filterSelectionSchema),
    defaultValues: { search: "" },
  });

  function onSubmit({ search }: z.infer<typeof filterSelectionSchema>) {
    console.log(search);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative p-4 rounded-full flex-1"
      >
        <Search
          className={cn(
            isFocused ? "scale-0" : "scale-100",
            "absolute left-8 top-6 h-6 w-4 text-muted-foreground transition-all duration-500",
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tìm kiếm sản phẩm"
                  className={cn(
                    isFocused ? "pl-6" : "pl-10",
                    "rounded-full transition-all duration-500 border-gray-200 dark:border-gray-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500/20 dark:focus:ring-teal-400/20",
                  )}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="absolute right-4 top-4 hover:text-teal-600 dark:hover:text-teal-400" type="submit" variant="link">
          <Search
            className={cn(
              "h-4 w-4 text-muted-foreground transition-all duration-200",
              isFocused ? "opacity-1 scale-1" : "opacity-0 scale-0",
            )}
          />
        </Button>
      </form>
    </Form>
  );
}