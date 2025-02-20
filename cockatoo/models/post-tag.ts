export default class PostTag {
  displayName?: string;
  source: string;

  constructor({
    displayName,
    source,
  }: {
    displayName?: string;
    source: string;
  }) {
    this.displayName = displayName;
    this.source = source;
  }
}
