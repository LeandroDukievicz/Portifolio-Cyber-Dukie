import Image from "next/image";

export default function Skills() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/skills.webp"
        alt="background skills"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}
