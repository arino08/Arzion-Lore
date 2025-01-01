import React from 'react'
import Form from 'next/form'
import SearchformReset from './SearchformReset'
import {Search} from "lucide-react"

const SearchForm = ({query}: {query?: string}) => {
    

  return (
    <Form action ='/' scroll={false} className='search-form'>
        <input 
        name="query"
        defaultValue={query}
        className='search-input'
        placeholder='Find a Lore'    
        />

        <div className='flex gap-2'>
            {query && <SearchformReset />}
            <button type='submit' className='search-btn text-white'>
                <Search size={24} />
            </button>
        </div>
        
    </Form>
  )
}

export default SearchForm