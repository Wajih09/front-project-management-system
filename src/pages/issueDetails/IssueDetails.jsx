import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom"
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/redux/issue/Action";
import { fetchComments } from "@/redux/comment/Action";
import { avatarFullName } from "@/lib/utils";

const IssueDetails = () => {
    const { projectId, issueId } = useParams();
    const dispatch = useDispatch();
    const { issue, comment } = useSelector(store => store);
    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({ status, id: issueId })); //order is not important here as importance of id: 2h58min
        console.log("status = ", status);
    }
    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId)); //3h18min
        console.log("issueuseEffect = ", issue);
    }, [issueId])
    return (
        <div className="px-20 py-8 text-gray-400">
            {/* projectId = {projectId},     9h38min
        <p>----------------</p>
        issueId = {issueId} */}
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-400">{issue.issueDetails?.title}</h1>
                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400">Description</h2>
                            <p className="text-gray-400 text-sm mt-3">{issue.issueDetails?.description}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value="comments">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="history">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    All make changes to your account here !
                                </TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />
                                    <div className="mt-8 space-y-6">
                                        {/* {[1, 1, 1].map((item) => <CommentCard key={item} />)} 3h18min*/}
                                        {comment.comments.map((item) => <CommentCard item={item} key={item} />)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="history">
                                    History change your password here !
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border rounded-lg">
                        <p className="border-b px-5 py-3">Details</p>
                        <div className="p-5">
                            <div className="space-y-7">
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Assignee</p>
                                    {issue.issueDetails?.assignee ? <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w8 text-xs">
                                            <AvatarFallback>{avatarFullName(issue.issueDetails?.assignee?.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                                    </div> : <p>Unassigned</p>}

                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Labels</p>
                                    <p>None</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Status</p>
                                    <Badge>
                                        {issue.issueDetails?.status}
                                    </Badge>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Release</p>
                                    <p>13-07-2024</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Reporter</p>
                                    {issue.issueDetails?.assignee ? <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w8 text-xs">
                                            <AvatarFallback>{avatarFullName(issue.issueDetails?.assignee?.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                                    </div> : <p>Unassigned</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssueDetails