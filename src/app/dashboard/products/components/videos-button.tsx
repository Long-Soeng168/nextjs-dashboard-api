'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { PlaySquareIcon } from 'lucide-react'

const VideosButton = () => {
    return (
        <TooltipProvider delayDuration={0}>
        <Tooltip >
          <TooltipTrigger asChild>
            <Button variant='ghost' className='text-blue-500' size='icon' onClick={() => console.log('clicked')}>
              <PlaySquareIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Videos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

export default VideosButton
