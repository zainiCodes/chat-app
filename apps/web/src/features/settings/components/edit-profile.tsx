import React from "react"

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

const profileSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    username: z.string().min(3, "Username is too short"),
    email: z.string().email("Invalid email"),
    bio: z.string().min(5, "Bio is too short"),
    image: z.any().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function EditProfileDialog() {
    const form = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            bio: "",
            image: null,
        } as ProfileForm,

        onSubmit: async ({ value }) => {
            console.log("Profile Data:", value)
        },
        validators: {
            onChange: profileSchema,
        },
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
                    <div className="space-y-1">
                        <Label>Profile Picture</Label>
                        <form.Field
                            name="image"
                            children={(field) => (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        field.handleChange(e.target.files?.[0] || null)
                                    }
                                />
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}