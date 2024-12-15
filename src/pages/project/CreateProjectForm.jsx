import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { tags } from "../projectList/ProjectList"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { createProject, fetchProjects } from "@/redux/project/Action"

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            tags: ["Spring Boot", "React"]
        }
    })
    const onSubmit = (data) => {
        dispatch(createProject(data));
        dispatch(fetchProjects({})); //i added it by myself
        console.log("Create project data = ", data);
    }
    const handleTagsChange = (newValue)=>{
        const currentTags = form.getValues("tags");
        //const updatedTags = currentTags:    not working good to delete a span when clicking on it
        const updatedTags = currentTags.includes(newValue)? currentTags.filter(tag => tag ==newValue):
        [...currentTags, newValue];
        //setValue you need to provide key, value
        form.setValue("tags", updatedTags);
    }
    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name="name"
                        render={({ field }) => (<FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 px-5 py-5"
                                    placeholder="Project name ..." />
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
                                    placeholder="Project description ..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <FormField control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select defaultValue="fullstack"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                        }}
                                    //className="border w-full border-gray-700 px-5 py-5"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fullstack">Full-Stack</SelectItem>
                                            <SelectItem value="frontend">Front-End</SelectItem>
                                            <SelectItem value="backend">Back-End</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                    />
                    <FormField control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        //you need to provide default value if you put value prop 8h01min but doesn't work --'
                                        // defaultValue="Spring Boot"
                                        // value={field.value}
                                        onValueChange={(value) => {
                                            //field.onChange(value) no more this on 8h10min
                                            handleTagsChange(value)
                                        }}
                                    //className="border w-full border-gray-700 px-5 py-5"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tags" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tags.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <div className="flex gap-1 flex-wrap">
                                    {field.value.map((item) => <div key={item} className="cursor-pointer flex 
                                    rounded-full items-center border gap-2 px-4 py-1"
                                        onClick={() => handleTagsChange(item)}>
                                        <span>{item}</span>
                                        <Cross1Icon className="h-3 w-3" />
                                    </div>)}
                                </div>
                                <FormMessage />
                            </FormItem>)}
                    />
                    <DialogClose>
                        {false ? (<div><p>You can only create 3 projects under free plan !
                            Please upgrade your plan.</p></div>) : (<Button type="submit" className="w-full mt-5">
                                Create Project
                            </Button>)}
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default CreateProjectForm