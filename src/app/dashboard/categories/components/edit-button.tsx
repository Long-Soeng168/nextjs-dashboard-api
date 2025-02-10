'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditCategoryForm from './form/edit'

const EditButton = () => {
  return (

    <Dialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip >
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant='ghost' className='text-primary' size='icon' onClick={() => console.log('clicked')}>
                <EditIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='hidden'></DialogTitle>
          <DialogDescription className='hidden'></DialogDescription>
          <EditCategoryForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditButton
