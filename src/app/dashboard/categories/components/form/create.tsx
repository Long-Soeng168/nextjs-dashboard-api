"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { BASE_BACKEND_API_URL } from "@/config/env";
import { revalidateCategories } from "@/lib/revalidate";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { ErrorResponseType } from "@/types/error-respone-type";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  title_kh: z.string().min(1, "Khmer title is required").max(255),
  code: z.string().min(1, "Code is required").max(255),
  order_index: z.coerce.number().min(0).max(255).optional(),
  parent_code: z.string().min(0).optional(),
  image: z.any().optional(),
});

export default function CreateCategoryForm() {
  const categories = [
    { title: "English", code: "a" },
    { title: "French", code: "aa" },
    { title: "German", code: "de" },
    { title: "Spanish", code: "es" },
  ] as const;

  const { toast } = useToast();
  const [files, setFiles] = useState<File[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      title_kh: "",
      code: "",
      order_index: 1,
      parent_code: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("title_kh", values.title_kh);
    formData.append("code", values.code);
    if (values.order_index !== undefined) {
      formData.append("order_index", values.order_index.toString());
    }
    if (values.parent_code) {
      formData.append("parent_code", values.parent_code);
    }
    if (files && files.length > 0) {
      formData.append("image", files[0]); // Append the first file
    }

    try {
      const response = await fetch(`${BASE_BACKEND_API_URL}categories`, {
        method: "POST",
        body: formData,
      });
      // const result = await response.json();
      // console.log(result);

      if (!response.ok) {
        const errorData: ErrorResponseType = await response.json();
        console.log(errorData);

        const firstError = Object.values(errorData.errors)[0][0];
        toast({
          title: `${errorData.message || "Something went wrong"}`,
          description: `${firstError}`,
          variant: "destructive",
        });
        return;
        // throw new Error(firstError || "Failed to create category");
      }

      toast({
        title: "Create Successfully.",
        variant: "success",
      });
      form.reset();
      setFiles(null);
      revalidateCategories("/dashboard/categories");
    } catch (err) {
      toast({
        title: `${err || "Something went wrong"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Computer" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title_kh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Khmer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: កុំព្យូទ័រ"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: DK" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="order_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Index</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 1" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="parent_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (language) => language.code === field.value
                              )?.title
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value={``}
                              onSelect={() => {
                                form.setValue("parent_code", "");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  "" === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {`N/A`}
                            </CommandItem>
                            {categories.map((language) => (
                              <CommandItem
                                value={language.title}
                                key={language.code}
                                onSelect={() => {
                                  form.setValue("parent_code", language.code);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={{
                    maxFiles: 100,
                    maxSize: 1024 * 1024 * 2, // 2MB
                    multiple: false,
                    accept: {
                      "image/jpeg": [".jpeg", ".jpg"],
                      "image/png": [".png"],
                      "image/gif": [".gif"],
                    },
                  }}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (Max 2MB)
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent className="flex items-center flex-row gap-2">
                    {files?.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="size-20 border p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${
                          file.name
                        }`}
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          height={80}
                          width={80}
                          className="size-20 p-0"
                        />
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>
                Recommended: 1x1 or (512x512px) and Max 2MB
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
