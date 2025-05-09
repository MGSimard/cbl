import { IconClipboard } from "@/_components/Icons";

export function CopyButton({ toCopy }: { toCopy: string }) {
  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
      onClick={() => navigator.clipboard.writeText(toCopy)}>
      <IconClipboard />
    </button>
  );
}
