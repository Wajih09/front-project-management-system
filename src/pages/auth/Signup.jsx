import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { register } from '@/redux/auth/Action';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: ""
        }
    })
    const onSubmit = (data) => {
        dispatch(register(data));
        console.log("Signup user = ", data);
    }
    return (
        <div className='space-y-5'>
            <h1>Register</h1>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                        name="fullName"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Full name ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <FormField control={form.control}
                        name="email"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Email ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <FormField control={form.control}
                        name="password"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Password ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <Button type="submit" className="w-full mt-5">
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Signup