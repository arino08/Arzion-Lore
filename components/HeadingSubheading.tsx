"use client";
import { TextLoop } from '@/components/ui/text-loop';
import { TextEffect } from '@/components/ui/text-effect';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const wordVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function HeadingSubheading() {
    const [trigger, setTrigger] = useState(true);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setTrigger((prev) => !prev);
    //   }, 4000);
  
    //   return () => clearInterval(interval);
    // }, []);
    // const blurSlideVariants = {
    //   container: {
    //     hidden: { opacity: 0 },
    //     visible: {
    //       opacity: 1,
    //       transition: { staggerChildren: 0.01 },
    //     },
    //     exit: {
    //       transition: { staggerChildren: 0.01, staggerDirection: 1 },
    //     },
    //   },
    //   item: {
    //     hidden: {
    //       opacity: 0,
    //       filter: 'blur(10px) brightness(0%)',
    //       y: 0,
    //     },
    //     visible: {
    //       opacity: 1,
    //       y: 0,
    //       filter: 'blur(0px) brightness(100%)',
    //       transition: {
    //         duration: 1,
    //       },
    //     },
    //     exit: {
    //       opacity: 0,
    //       y: -30,
    //       filter: 'blur(10px) brightness(0%)',
    //       transition: {
    //         duration: 0.4,
    //       },
    //     },
    //   },
    // };
  return (
    <section className='black_container'>
      <h1 className='heading'>
        A Realm for those who are<br />{' '}
        <TextLoop >
          {['Storytellers', 'Creators', 'Thinkers', 'Writers', 'Dreamers'].map((word, index) => (
            <span key={index}>
              {word}
            </span>
          ))}
        </TextLoop>
        .
      </h1>
      <p className='sub-heading !max-w-3xl'>
        <TextEffect 
        className=''
        per='word'
        preset='blur'
        >
Speak your heart, pen your lore—this is your haven to explore. 

        </TextEffect>
       
        <br />
      </p>
    </section>
  );
}