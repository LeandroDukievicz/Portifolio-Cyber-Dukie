import Image from "next/image";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/home.webp"
        alt="background"
        fill
        priority
        className="object-cover"
        suppressHydrationWarning
      />
    </main>
  );
}
