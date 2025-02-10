import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateCategoryForm from './form/create'
import Filter from "./form/filter";

export function FilterButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <Filter />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
