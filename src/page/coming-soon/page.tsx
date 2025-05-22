import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

export default function ComingSoonPage() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-gradient-to-b from-black to-gray-900 antialiased items-center justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none opacity-20",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:left-60"
        fill="rgba(56, 189, 248, 0.5)"
      />
      <Spotlight
        className="top-40 right-0 md:right-60"
        fill="rgba(99, 102, 241, 0.5)"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 text-center flex flex-col items-center">
        <div className="mb-8 inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-neutral-100 backdrop-blur-md border border-white/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
          Pharmacity Store
        </div>
        <h1 className="bg-gradient-to-r from-blue-400 via-neutral-50 to-purple-400 bg-clip-text text-center text-6xl font-bold text-transparent md:text-8xl mb-6">
          Coming Soon
        </h1>

        <div className="text-center text-sm text-neutral-400 border-white/5 pt-6 w-full">
          © {new Date().getFullYear()} Pharmacity Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}