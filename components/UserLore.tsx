'use client'

import { client } from "@/sanity/lib/client";
import { LORES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import LoreCard from "./LoreCard";
import { useLiveQuery } from "@sanity/preview-kit";
import { Skeleton } from "./ui/skeleton";

const UserLore = ({ id }: { id: string }) => {
  const [lores, loading] = useLiveQuery(
      [],
      LORES_BY_AUTHOR_QUERY,
      { id }
    );

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
        ))}
      </>
    );
  }

  return (
    <>
      {lores?.map((lore: any) => (
        <LoreCard key={lore._id} post={lore} />
      ))}
    </>
  );
};

export default UserLore;