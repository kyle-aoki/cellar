export default interface FsObject {
  name: string;
  path: string;
  file: boolean;
  content: string | null;
}
