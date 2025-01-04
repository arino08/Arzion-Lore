import React from 'react'
import SearchForm from '../../components/SearchForm';
import LoreCard, { LoreTypeCard } from '@/components/LoreCard';
import { client } from '@/sanity/lib/client';
import { LORE_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { TextLoop } from '@/components/ui/text-loop';
import { motion } from 'framer-motion';
import Head from 'next/head';
import HeadingSubheading from '@/components/HeadingSubheading';

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
    {/* <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
    <h1 className="heading">
        A Realm for {' '}
        <TextLoop interval={2}>
          <span>Storytellers</span>
          <span>Creators</span>
          <span>Thinkers</span>
          <span>Writers</span>
          <span>Dreamers</span>
        </TextLoop>
        .
      </h1>
      </motion.h1>

    <p className='sub-heading !max-w-3xl'>
    Share your imagination, unveil your truths, and connect through words. <br />
    {/* Dive into a world where imagination meets reality, and every voice finds its place. */}
    {/*</p> */}
    <HeadingSubheading />

    <SearchForm query = {query}/>

    </section>

    <section className='section_container'>
      <p className='text-30-semibold'>
        {query ? `Search results for "${query}"` : "Latest Lore"}
      </p>

      <ul className='mt-7 card_grid'>
        {posts?.length > 0 ?(
          posts.map((post: LoreTypeCard) => (
            <AnimatedGroup
      className=''
      variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        },
        item: {
          hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: -60,
            rotateX: 90,
          },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            rotateX: 0,
            transition: {
              type: 'spring',
              bounce: 0.3,
              duration: 1,
            },
          },
        },
      }}
    >
            <LoreCard key={post?._id} post={post} />
            </AnimatedGroup>
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
