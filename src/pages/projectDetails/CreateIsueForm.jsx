import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createIssue } from "@/redux/issue/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CreateIsueForm = ({status}) => {
    //CreateIsueForm -> IssueList -> ProjectDetails where path="/project/:id" so in reality CreateIsueForm is in component where path="/project/:id" so we can reteive id by useParams
    const {id} = useParams();
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            issueName: "",
            description: ""
        }
    })
    const onSubmit = (data) => {
        data.projectId = id;
        dispatch(createIssue({title:data.issueName, description:data.description, projectId: id, status}));
        console.log("Create Issue = ", data);
    }
  return (
    <div>
        <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="issueName"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Issue name ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <FormField control={form.control}
                        name="description"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                            <Textarea {...field}
                                    type="textarea"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Issue description ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                                Create Issue
                        </Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
  )
}

export default CreateIsueForm