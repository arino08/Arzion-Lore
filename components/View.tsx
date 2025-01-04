import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  try {
    const query = `*[_type == "lore" && _id == $id][0] {
      _id,
      views
    }`;

    const { views: totalViews = 0 } = await client
      .withConfig({ useCdn: false })
      .fetch(query, { id });

    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();

    return (
      <div className="view-container relative">
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>

        <p className="view-text">
          <span className="font-black">Views: {totalViews}</span>
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error updating views:", error);
    return null;
  }
};

export default View;