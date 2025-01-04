import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const lore = defineType({
    name: "lore",
    title: "Lore",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',

        }),

        defineField({
            name: 'slug',
            type: 'slug',
            options:{
                source: 'title'
            }

        }),
        
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: (Rule: any) => Rule.required(),
          },
        defineField({
            name: 'views',
            type: 'number',

        }),
        defineField({
            name: 'description',
            type: 'text',

        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule: any) => Rule.min(1).max(20).required().error("Please provide a category")

        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule: any) => Rule.required(),
        }),

        defineField({
            name: 'Content',
            type: 'markdown',

        }),

    ]
})