import React from 'react'
import { client } from "@/sanity/lib/client";
import { LORES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import LoreCard, { LoreTypeCard } from "@/components/LoreCard";


const UserLore = async({id} : {id: string}) => {
    const lores = await client.fetch(LORES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {lores.length > 0 ? (
        lores.map((lore: LoreTypeCard) => (
          <LoreCard key={lore._id} post={lore} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}

export default UserLore