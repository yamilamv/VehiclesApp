export interface GenericResult<TItem> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Array<TItem>;
}
