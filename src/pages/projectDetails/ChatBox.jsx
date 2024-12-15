import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { avatarFullName } from "@/lib/utils"
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/redux/chat/Action"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const ChatBox = () => {
  const [message, setMessage] = useState("");
  const {auth, chat} = useSelector((store) => store);
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatByProject(id));
    console.log("auth =", auth);
    console.log("chatfetchChatByProject =", chat);
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id));
      console.log("Fetching messages for chat ID =", chat.chat.id);
    }
  }, [dispatch, chat.chat?.id]);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      dispatch(sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message
      }));
      setMessage(""); // Reset the message input to its default value
      console.log("message = ", message);
    }
  }
  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className='h-[32rem] w-full p-5 flex gap-3 flex-col'>
  {chat.messages?.map((item, index) => item.sender.id !== auth.user.id ? (
    <div className="flex gap-2 mb-2 justify-start items-end" key={item.id}>
      <Avatar className='border border-gray-300'>
        <AvatarFallback>{avatarFullName(item.sender?.fullName)}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 p-2 border border-gray-300 rounded-ss-2xl rounded-e-xl">
        <p>{item.sender.fullName}</p>
        <p className="text-gray-500">{item.content}</p>
      </div>
    </div>
  ) : (
    <div className="flex gap-2 mb-2 justify-end items-end" key={item.id}>
      <div className="space-y-2 p-2 border border-gray-300 rounded-se-2xl rounded-s-xl">
        <p>{auth.user.fullName}</p>
        <p className="text-gray-500">{item.content}</p>
      </div>
      <Avatar className='border border-gray-300'>
        <AvatarFallback>{avatarFullName(auth.user?.fullName)}</AvatarFallback>
      </Avatar>
    </div>
  ))}
</ScrollArea>

        <div className="relative p-0">
          <Input placeholder="Type message ... "
            className='py-7 border-t text-base outline-none focus:outline-none focus:ring-0 rounded-none border-b-0
            border-x-0' value={message} onChange={handleMessageChange} />
          <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full"
            size="icon" variant="ghost">
            <PaperPlaneIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox