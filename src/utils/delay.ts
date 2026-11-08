// MEMBER 2 — async function buatan sendiri (custom), persis dari modul
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
