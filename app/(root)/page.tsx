import { auth } from "@/auth"
import SearchForm from "@/components/SearchForm"
import LoreCard, { LoreTypeCard } from '@/components/LoreCard'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { LORES_QUERY } from '@/sanity/lib/queries'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { TextLoop } from '@/components/ui/text-loop'
import { motion } from 'framer-motion'
import HeadingSubheading from '@/components/HeadingSubheading'




export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ 
    query: LORES_QUERY, 
    params,
    tags: ['lore', 'views'] 
  });

  return (
    <>
      <section className="black_container">
        <HeadingSubheading />
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Latest Lore"}
        </p>

        <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post: LoreTypeCard) => (
            <LoreCard post={post} />
        ))
      ) : (
        <p className="no-results">No Lore Found</p>
      )}
    </ul>
      </section>

      <SanityLive />
    </>
  );
}