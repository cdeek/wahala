import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diksa",
  description: "Under development",
};

export default async function Page({ params: { slug = 'home' }}) {
  return (
    <main className="">
      <h1 className="text-red-500">Diksa</h1>
    </main>
  );
}
