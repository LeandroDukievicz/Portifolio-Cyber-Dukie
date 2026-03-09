import Image from "next/image";

export default function Sobre() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/about.webp"
        alt="background sobre"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}
