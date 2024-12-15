import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { inviteToProject } from "@/redux/project/Action";

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const InviteUserForm = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const form = useForm({
        defaultValues: {
            email: ""
        }
    })
    const onSubmit = (data) => {
        dispatch(inviteToProject({email:data.email, projectId:id}));
        console.log("Invite member = ", data);
    }
  return (
    <div>
        <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="email"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="User email ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">
                                Invite User
                        </Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
  )
}

 export default InviteUserForm