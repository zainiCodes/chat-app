import React, { useEffect } from "react"

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
    email: z.string().email("Invalid email"),
    bio: z.string(),
    image: z.string().optional(),
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
            image: "",
        } as ProfileForm,

        onSubmit: async ({ value }) => {
            mutate(value)
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
        mutationFn: async (data: ProfileForm) => {
            const response = await fetch("http://localhost:3000/api/setUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const data: { message: string } = await response.json()
                throw new Error(data.message)
            }

            return response.json()
        },
        onSuccess: () => {
            toast.success("Updated successfully!")
            qc.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const toBase64 = (file: File): Promise<string> => { // this is only for converting image to string
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = () => {
                resolve(reader.result as string)
            }

            reader.onerror = (error) => reject(error)
        })
    }
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

                                        const base64 = await toBase64(file)

                                        field.handleChange(base64)
                                    }}
                                />
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