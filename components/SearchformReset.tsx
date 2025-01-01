"use client";
import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react';

const SearchformReset = () => {
    const reset = () => {
            const form = document.querySelector('.search-form') as HTMLFormElement;
    
            if(form) form.reset();
        }


  return (
    <button type='reset' onClick={reset}>
        <Link href={"/"} className='search-btn text-white' >
        <X size={24} />
        </Link>
    </button>  )
}

export default SearchformReset;