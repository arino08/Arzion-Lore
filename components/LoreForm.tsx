"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createContent } from "@/lib/actions";

const LoreForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [Content, setContent] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        Content,
      };

      await formSchema.parseAsync(formValues);

      const result = await createContent(formData, Content);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Lore created successfully!",
          variant: "default",
        });

        router.push("/");
        router.refresh();
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="lore-form">
      <div>
        <label htmlFor="title" className="lore-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="lore-form_input"
          required
          placeholder="Lore Title"
        />
        {errors.title && <p className="lore-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="lore-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="lore-form_textarea"
          required
          placeholder="Lore Description"
        />
        {errors.description && (
          <p className="lore-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="lore-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="lore-form_input"
          required
          placeholder="Lore Category"
        />
        {errors.category && (
          <p className="lore-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="lore-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="lore-form_input"
          required
          placeholder="Lore Image URL"
        />
        {errors.link && <p className="lore-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="Content" className="lore-form_label">
          Content
        </label>
        <MDEditor
          value={Content}
          onChange={(value) => setContent(value as string)}
          id="Content"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Write your lore content here...",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.Content && <p className="lore-form_error">{errors.Content}</p>}
      </div>

      <Button
        type="submit"
        className="lore-form_btn text-white-100"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Lore"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default LoreForm;