import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Welcome to the forest</span>
         
        </div>


        <div className="mt-8">
         
        </div>
      </section>
    </DefaultLayout>
  );
}
