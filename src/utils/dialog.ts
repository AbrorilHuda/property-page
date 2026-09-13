/**
 * Helper dialog yang dapat diakses keyboard: focus trap, Escape,
 * scroll-lock, dan pengembalian fokus ke pemicu.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])';

const returnFocusMap = new WeakMap<HTMLElement, HTMLElement | null>();

export function isDialogOpen(root: HTMLElement): boolean {
  return !root.classList.contains('hidden');
}

export function openDialog(root: HTMLElement): void {
  returnFocusMap.set(root, document.activeElement as HTMLElement | null);
  root.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const first = root.querySelector<HTMLElement>(FOCUSABLE);
  (first ?? root).focus();
}

export function closeDialog(root: HTMLElement): void {
  if (root.classList.contains('hidden')) return;
  root.classList.add('hidden');
  document.body.style.overflow = '';
  returnFocusMap.get(root)?.focus();
  returnFocusMap.delete(root);
}

/** Pasang pada root dialog: keydown="dialogKeydown(root, $event)" */
export function dialogKeydown(root: HTMLElement, e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeDialog(root);
    return;
  }
  if (e.key !== 'Tab') return;

  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null
  );
  if (items.length === 0) return;

  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;

  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

/** Klik pada backdrop (target === root) menutup dialog. */
export function backdropClick(root: HTMLElement, e: MouseEvent): void {
  if (e.target === root) closeDialog(root);
}
