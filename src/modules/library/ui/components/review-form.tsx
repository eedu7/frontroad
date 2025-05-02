"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
}

const formSchema = z.object({
    productId: z.string(),
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    description: z.string().min(1, { message: "Description is required" }),
});

export const ReviewForm = ({ productId, initialData }: Props) => {
    const [isPreview, setIsPreview] = React.useState(!!initialData);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <p className="font-medium">{isPreview ? "Your rating" : "Liked it? Give it a rating"}</p>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Want to leave a written review?"
                                    disabled={isPreview}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isPreview && (
                    <Button
                        type="submit"
                        variant="elevated"
                        disabled={false}
                        size="lg"
                        className="hover:text-primary w-fit bg-black text-white hover:bg-pink-400"
                    >
                        {initialData ? "Update review" : "Post review"}
                    </Button>
                )}
                {isPreview && (
                    <Button
                        type="button"
                        variant="elevated"
                        disabled={false}
                        size="lg"
                        onClick={() => setIsPreview(false)}
                        className="w-fit"
                    >
                        Edit
                    </Button>
                )}
            </form>
        </Form>
    );
};
