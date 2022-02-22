export default async function fetchJSON(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<Object> {
  const response = await fetch(input, init);
  return await response.json();
}
