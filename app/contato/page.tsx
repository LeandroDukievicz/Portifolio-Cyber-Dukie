import Image from "next/image";

export default function Contato() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/contact.webp"
        alt="background contato"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}
