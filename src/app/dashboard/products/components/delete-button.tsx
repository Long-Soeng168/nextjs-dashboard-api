'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

const DeleteButton = () => {
    return (
        <TooltipProvider delayDuration={0}>
        <Tooltip >
          <TooltipTrigger asChild>
            <Button variant='ghost' className='text-destructive' size='icon' onClick={() => console.log('clicked')}>
              <Trash2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

export default DeleteButton
