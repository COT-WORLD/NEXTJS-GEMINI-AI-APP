import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

import React from 'react'
import { Button } from "./ui/button"
import { X } from "lucide-react"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { useToast } from "@/hooks/use-toast"
import { Message } from "@/model/User"
 import moment from 'moment'

type MessageCardProps={
  message: Message,
  onMessageDelete: (messageId: string) => void
}

const MessageCard =({ message, onMessageDelete}: MessageCardProps) =>{
  
  const {toast} = useToast()
  const handleDeleteConfirm = async () => {
   const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
   
   toast({
    title:response.data.message
   })
   const messageId = String(message._id);
   onMessageDelete(messageId)
  }
  
    return (
      <div>
        <Card className="flex flex-col justify-center">
          <CardHeader className="inline-grid grid-cols-5 gap-3">
            <CardTitle className="text-lg col-span-4">{message.content}</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive"><X className="w-5 h-5" /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete and remove your message from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            <CardDescription>{moment(message.createdAt).fromNow()}</CardDescription>
          </CardHeader>
        </Card>

      </div>
    )
  }
  
  export default MessageCard
  