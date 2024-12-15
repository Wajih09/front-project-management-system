import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectById } from '@/redux/project/Action'
import { useParams } from 'react-router-dom'
import { avatarFullName } from '@/lib/utils'

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); //2h25min equiv to this.activatedRoute.data in NouveauCltFrsComponent angular
  const { project } = useSelector(store => store);
  const handleProjectInvitation = () => { }
  useEffect(() => { //equiv watch in vuejs i guess
    dispatch(fetchProjectById(id))
  }, [id]); //2h26min whenever id change, we will dipatch with new id
  return (
    <>
      <div className='mt-5 lg:px-10'>
        <div className='gap-5 lg:flex justify-between pb-4'>
          <ScrollArea className='h-screen lg:w-[69%] pr-2'>
            <div className='text-gray-600 pb-10 w-full'>
              {/* <h1 className='text-lg font-semibold pb-5'>Create Ecommerce Website Using React</h1> 2h26min removed*/}
              <h1 className='text-lg font-semibold pb-5'>{project.projectDetails?.name}</h1>
              <div className='space-y-5 pb-10 text-sm'>
                <p className='w-full md:max-w-lg lg:max-w-xl'>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, nam maxime!</p> */}
                  {project.projectDetails?.description}</p>
                <div className='flex'>
                  <p className='w-36'>Project Lead :</p>
                  {/* <p>Wajih</p> */}
                  <p>{project.projectDetails?.owner.fullName}</p>
                </div>
                <div className='flex'>
                  <p className='w-36'>Members :</p>
                  <div className='flex items-center gap-2'>
                    {/* {[1,1,1,1].map((item) => <Avatar className='cursor-pointer' key={item}> */}
                    {project.projectDetails?.team.map((item) => <Avatar className='cursor-pointer border border-gray-300' key={item}>
                      <AvatarFallback>{avatarFullName(item.fullName)}</AvatarFallback>
                    </Avatar>)}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button size='sm' variant='outline' className='ml-2 ' onClick={handleProjectInvitation}>
                          <span>Invite</span>
                          <PlusIcon className='w-3 h-3' />
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Invite User</DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='flex'>
                  <p className='w-36'>Category :</p>
                  {/* <p>Full-Stack</p> 2h29min removed*/}
                  <p>{project.projectDetails?.category}</p>
                </div>
                <div className='flex'>
                  <p className='w-36'>Status :</p>
                  <Badge>In Progress</Badge>
                </div>
              </div>
              <section>
                <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>
                <div className='flex md:flex gap-3 justify-between py-5'>
                  <IssueList status="pending" title="Todo List" />
                  <IssueList status="inProgress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className='lg:w-[30%] rounded-md right-5 top-10'>
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails