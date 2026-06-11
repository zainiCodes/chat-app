import { useEffect } from "react"

import { Button } from "@chat-app/ui/components/button"
import { Label } from "@chat-app/ui/components/label"
import { Input } from "@chat-app/ui/components/input"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@chat-app/ui/components/dialog"

import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Edit2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUser from "@/hooks/useUser"
import { toast } from "sonner"

const profileSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    username: z.string().min(3, "Username is too short"),
    email: z.email("invalid Email"),
    bio: z.string(),
    image: z.file().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function EditProfileDialog() {
    const qc = useQueryClient()
    const { data, isLoading } = useUser()

    const user = data?.user

    const form = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            bio: "",
        } as ProfileForm,

        onSubmit: async ({ value }) => {
            const formData = new FormData()
            formData.append("name", value.name)
            formData.append("username", value.username)
            formData.append("bio", value.bio)
            formData.append("email", value.email)
            if (value.image) {
                formData.append("image", value.image)
            }
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1])
            }
            mutate(formData)
        },

        validators: {
            onChange: profileSchema,
        },
    })

    useEffect(() => {
        if (user) {
            form.setFieldValue("name", user.name)
            form.setFieldValue("username", user.username)
            form.setFieldValue("email", user.email)
            form.setFieldValue("bio", user.bio || "")
        }
    }, [user])
    const { mutate, isPending } = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch("http://localhost:3000/api/setUser", {
                method: "POST",
                credentials: "include",
                body: formData,
            })

            if (!response.ok) {
                const data: { message: string } = await response.json()
                throw new Error(data.message)
            }

            return response.json()
        },
        onSuccess: (data) => {
            toast.success(data.message)
            qc.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    return (
        <Dialog>

            <DialogTrigger>
                <div className="flex gap-2 cursor-pointer hover:bg-accent px-2">
                    <Edit2 className="text-primary w-4 h-4" />
                    <h4 className="text-primary text-sm">
                        Edit Profile
                    </h4>

                </div>

            </DialogTrigger>


            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                    className="space-y-5 mt-4"
                >

                    <form.Field name="name">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Name</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder="Enter your name"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="username">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Username</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder="Enter your Username"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Email</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder="Enter your Email"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="bio">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Bio</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder="Enter your Bio"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    {/* Image */}
                    <form.Field name="image">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Upload profile picture
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return
                                        const maxSize = 5 * 1024 * 1024

                                        if (file.size > maxSize) {
                                            toast.error("Image must be smaller than 5MB")
                                            e.currentTarget.value = ""
                                            return
                                        }
                                        field.handleChange(file)
                                    }}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                    {/* Submit */}
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog >
    )
}