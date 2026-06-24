import { Languages } from "lucide-react";

export function SpanishDraftButton({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="secondary-button">
      <Languages className="h-4 w-4" aria-hidden="true" />
      Generate Spanish Version
    </button>
  );
}
