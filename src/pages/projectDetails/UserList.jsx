import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { avatarFullName } from "@/lib/utils";
import { assignedUserToIssue } from "@/redux/issue/Action";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({issueDetails}) => {
    const { project } = useSelector(store => store);
    const dispatch = useDispatch();
    const handleAssignUserToIssue = (userId) => {
        dispatch(assignedUserToIssue({issueId:issueDetails.id, userId}))
    }
    return (
        <>
            <div className="space-y-2">
                <div className="border rounded-md">
                    <p className="px-3 py-2">{issueDetails.assignee?.fullName || "Unassigned"}</p>
                </div>
                {/* {[1,1,1,1].map((item)=><div key={item} className="py-2 group 3h01min */}
                {project.projectDetails?.team.map((item)=><div onClick={() => handleAssignUserToIssue(item.id)}
                key={item} className="py-2 group 
                hover:bg-slate-200 cursor-pointer flex items-center space-x-4
                rounded-md border px-4">
                    <Avatar>
                        <AvatarFallback>{avatarFullName(item.fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        {/* font-medium by default in the className of <p> */}
                        <p className="text-sm leading-none">{item.fullName}</p>
                        <p className="text-sm text-muted-foreground">@{item.fullName.replace(/\s+/g, '').toLowerCase()}</p>

                    </div>
                </div>)}
            </div>
        </>
    )
}

export default UserList