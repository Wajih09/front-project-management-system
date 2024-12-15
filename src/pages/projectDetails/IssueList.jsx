import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import CreateIsueForm from "./CreateIsueForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "@/redux/issue/Action"
import { useParams } from "react-router-dom"
import { store } from "@/redux/Store"

const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    //IssueList -> ProjectDetails where path="/project/:id" so in reality CreateIsueForm is in component where path="/project/:id" so we can reteive id by useParams
    const {id} = useParams();
    const {issue} = useSelector(store=>store);
    useEffect(()=>{
        dispatch(fetchIssues(id))
    },[id]);
    if (!issue.issues) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {/* {[1,1,1].map((item)=><IssueCard key={item} />)} 2h42min removed*/}
                            {/* {issue.issues?.map((item)=><IssueCard key={item.id} item={item} projectId={id}/>)} */}
                            {Array.isArray(issue.issues) && issue.issues.filter(issue => issue.status == status).map((item) =>
                                item ? <IssueCard key={item.id} item={item} projectId={id} status={item.status}/> : null
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button variant="outline" className="w-full flex items-center gap-2">
                                <PlusIcon />
                                Create Issue
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Issue</DialogTitle>
                            </DialogHeader>
                            <CreateIsueForm status={status}/>
                        </DialogContent>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    )
}

export default IssueList