import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY, AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserLore from "@/components/UserLore";
import { Suspense } from "react";
import { LoreCardSkeleton } from "@/components/LoreCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  // Remove Promise wrapper from params type
  const id = params.id;
  console.log("Fetching user with ID:", id); // Debug log

  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  
  console.log("Found user:", user); // Debug log
  
  if (!user) return notFound();

  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h3>
        </div>

        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="profile_image"
        />

        <p className="text-30-extrabold mt-7 text-center">
          @{user?.username}
        </p>
        <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
      </div>

      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <p className="text-30-bold">
          {session?.user?.id === id ? "Your" : "All"} Lores
        </p>
        <ul className="card_grid-sm">
          <Suspense fallback={<LoreCardSkeleton />}>
            <UserLore id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default Page;