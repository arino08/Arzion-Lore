"use server"

import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { auth } from "@/auth";

export const createContent = async (state: any, form: FormData, Content: string) => {
    const session = await auth();

    if(!session) return {error: "Not Signed in!", status: "ERROR"};

    const {title, description, category, link} = Object.fromEntries(Array.from(form.entries()).filter(([key]) => key !== "Content"));
    const slug = slugify(title as string, {lower : true , strict:  true});

    try {
        
        const lore= {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            Content,
        }

        const result = await writeClient.create({_type: "lore", ...lore});

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS!"
        });

    } catch (error) {
        console.log(error);

        return parseServerActionResponse({error: JSON.stringify(error), status: "ERROR"});

    }


}