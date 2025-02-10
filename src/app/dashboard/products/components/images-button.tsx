'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { ImagePlusIcon } from 'lucide-react'

const ImagesButton = () => {
    return (
        <TooltipProvider delayDuration={0}>
        <Tooltip >
          <TooltipTrigger asChild>
            <Button variant='ghost' className='text-blue-500' size='icon' onClick={() => console.log('clicked')}>
              <ImagePlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Images</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

export default ImagesButton
