"use server"

import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function createContent(formData: FormData, content: string) {
  try {
    const session = await auth();
    console.log("Session in createContent:", session); // Debug session

    if (!session?.user?.id) {
      console.log("No user ID found in session"); // Debug auth
      throw new Error("Not authenticated");
    }

    // Get author by Google ID or email
    const author = await client.fetch(`
      *[_type == "author" && (id == $id || email == $email)][0]{
        _id,
        name,
        email
      }
    `, { 
      id: session.user.id,
      email: session.user.email 
    });

    console.log("Found author:", author); // Debug author lookup

    if (!author?._id) {
      console.log("No author found"); // Debug author missing
      throw new Error("Author not found");
    }

    const newLore = await writeClient.create({
      _type: "lore",
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: formData.get("link"),
      Content: content,
      author: {
        _type: "reference",
        _ref: author._id
      }
    });

    console.log("Created lore:", newLore); // Debug created lore
    return { status: "SUCCESS", data: newLore };

  } catch (error: unknown) {
    console.error("Error in createContent:", error);
    return { 
      status: "ERROR", 
      message: error instanceof Error ? error.message : "Failed to create lore"
    };
  }
}