import React from 'react'
import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Lore, Author } from '@/sanity/types';

export type LoreTypeCard = Omit<Lore, 'author'> & { 
  author?: Author;
  views?: number;
};

const LoreCard = ({ post }: { post: LoreTypeCard }) => {
  const { _id, title, description, image, _createdAt, category, author, views = 0 } = post;

  return (
    <li className='lore-card group'>
      <div className='flex-between'>
        <p className='lore_card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?.id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/lore/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?.id}`}>
          <Image 
            src={author?.image || 'https://placehold.co/48x48'} 
            alt={author?.name || 'placeholder'} 
            width={48} 
            height={48} 
            className='rounded-full' 
          />
        </Link>
      </div>

      <Link href={`/lore/${_id}`}>
        <p className='lore-card_desc'>{description}</p>
        <img src={image} alt="placeholder" className='lore-card_img' />
      </Link>

      <div className='flex-between mt-5 gap-3'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='lore-card_btn' asChild>
          <Link href={`/lore/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const LoreCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="lore-card_skeleton" />
      </li>
    ))}
  </>
);

export default LoreCard;