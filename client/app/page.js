import { auth } from "@/lib/firebase";

export default function Home() {
  console.log(auth);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">
        GuptaMart
      </h1>
    </main>
  );
}