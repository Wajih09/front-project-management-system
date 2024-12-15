import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { avatarFullName } from '@/lib/utils'
import { deleteComment } from '@/redux/comment/Action'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const CommentCard = ({item}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteComment(item.id));
    }
  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>{avatarFullName(item.user?.fullName)}</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p>{item.user?.fullName}</p>
                <p>{item.content}</p>
            </div>
        </div>
        <Button onClick={handleDelete} className="rounded-full" variant="ghost" size="icon">
            <TrashIcon/>
        </Button>
    </div>
  )
}

export default CommentCard