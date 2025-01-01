import React from 'react'
import SearchForm from '../../components/SearchForm';
import LoreCard, { LoreTypeCard } from '@/components/LoreCard';
import { client } from '@/sanity/lib/client';
import { LORE_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';

export default async function Home  ({searchParams} : {
  searchParams: Promise<{ query?: string}>
}) {
  const query = (await searchParams). query;

  const params = {search: query || null};

  const session = await auth();

  const {data: posts} = await sanityFetch({ query: LORE_QUERY, params });


  return (
    <>
    <section className='black_container'>

    <h1 className='heading'> A Realm for Dreamers and Storytellers.</h1>

    <p className='sub-heading !max-w-3xl'>
    Share your imagination, unveil your truths, and connect through words. <br />
    {/* Dive into a world where imagination meets reality, and every voice finds its place. */}
    </p>

    <SearchForm query = {query}/>

    </section>

    <section className='section_container'>
      <p className='text-30-semibold'>
        {query ? `Search results for "${query}"` : "Latest Lore"}
      </p>

      <ul className='mt-7 card_grid'>
        {posts?.length > 0 ?(
          posts.map((post: LoreTypeCard) => (
            <LoreCard key={post?._id} post={post} />
          ))
        ) : (
          <p className='no-results'>No Lore Found</p>
        )}

      </ul>

    </section>

    <SanityLive />

    
    </>
  );
}
