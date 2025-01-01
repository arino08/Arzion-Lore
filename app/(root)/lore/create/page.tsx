import LoreForm from "@/components/LoreForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="black_container !min-h-[230px]">
        <h1 className="heading">Submit Your Lore</h1>
      </section>

      <LoreForm />
    </>
  );
};

export default Page;