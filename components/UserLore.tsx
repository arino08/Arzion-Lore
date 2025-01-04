import { client } from "@/sanity/lib/client";
import { LORES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import LoreCard from "./LoreCard";

const UserLore = async ({ id }: { id: string }) => {
  const lores = await client.fetch(LORES_BY_AUTHOR_QUERY, { id });
  console.log("Fetched lores:", lores); // Debug log

  return (
    <>
      {lores?.map((lore: any) => (
        <LoreCard key={lore._id} post={lore} />
      ))}
    </>
  );
};

export default UserLore;