import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { LORE_BY_ID_QUERY, EDITOR_PICKS_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import MarkdownIt from 'markdown-it';
import Image from 'next/image';
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import LoreCard, { LoreTypeCard } from "@/components/LoreCard";
import markdownit from "markdown-it";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = (await params).id;

    const [post, editorPosts] = await Promise.all([
      client.fetch(LORE_BY_ID_QUERY, { id }),
      client.fetch(PLAYLIST_BY_SLUG_QUERY, {
        slug: "editor-picks-new",
      }),
    ]);

    if (!post) return notFound();

    const parsedContent = post.Content ? md.render(post.Content) : null;
    console.log("Content:", post.Content); // Debug log
    console.log("Parsed Content:", parsedContent); // Debug log

    return (
      <>
        <section className="black_container !min-h-[230px]">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">
            <TextEffect per='char' preset='fade'>{post.title}</TextEffect>
          </h1>
          <p className="sub-heading !max-w-5xl">
            <TextEffect per='char' preset='fade'>{post.description}</TextEffect>
          </p>
        </section>
  
        <section className="section_container">
          <img
            src={post.image}
            alt="thumbnail"
            className="w-full h-auto rounded-xl object-cover max-h-[600px]"
          />
  
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              
      <Link
        href={`/user/${post.author?.id}`} // Changed from _id to id
        className="flex gap-2 items-center mb-3"
      >
        <Image
          src={post.author.image}
          alt="avatar"
          width={64}
          height={64}
          className="rounded-full drop-shadow-lg"
        />
                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                </div>
              </Link>
              <p className="category-tag hover:scale-105 transition-transform">{post.category}</p>
            </div>
  
            <h3 className="text-30-bold">Lore Details</h3>
            {parsedContent ? (
        <article
          className="prose max-w-4xl font-work-sans break-all"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      ) : (
        <p className="no-result">No content available</p>
      )}
          </div>
  
          <hr className="divider my-10" />
  
          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold mb-5">Editor Picks</p>
              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: LoreTypeCard, i: number) => (
                  <LoreCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}
  
          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
};
export default Page;