import Image from "next/image";
import { cn } from "~!";

export default function FullScreenLogoLayer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src="/logo-unclipped.svg"
        alt="Logo"
        width={500}
        height={500}
        priority
        className="select-none"
      />
    </div>
  );
}
