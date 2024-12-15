import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { createComment } from '@/redux/comment/Action';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

//issueId as props and not params !! 9h52min
const CreateCommentForm = ({ issueId }) => {
    const dispatch = useDispatch(); 
    const form = useForm({
        defaultValues: {
            content: ""
        }
    })
    const onSubmit = (data) => {
        dispatch(createComment({content:data.content, issueId})) //provide commentData using object distruction (vérifiying of body data in postman) 3h14min
        form.reset({ content: "" });
        console.log("Create comment = ", data);
    }
    return (
        <div>
            <Form {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="content"
                        // if <FormItem className="flex gap-2"> doesn't work properly (components are not properly inline then move the className to new internal div <div className="flex gap-2">    ******************   9h57min
                        render={({ field }) => (<FormItem>
                            <div className="flex gap-2">
                                <div>
                                    <Avatar>
                                        <AvatarFallback>WS</AvatarFallback>
                                    </Avatar>
                                </div>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="w-[20rem]"
                                        placeholder="Add comment ..." />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>)}
                    />
                    {/* <Button type="submit" className="w-full mt-5"> className="w-full mt-5" make it not inline 9h55min */}
                    <Button type="submit">
                        Save Comment
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCommentForm