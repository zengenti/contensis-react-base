import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList } from 'contensis-core-api';
/**
 * Util class holds our search results helper boilerplate methods
 */
export class Util {
  static GetIds(entries: Entry[], fieldId?: string) {
    if (fieldId) {
      return entries
        ?.map(e =>
          Array.isArray(e?.[fieldId])
            ? e?.[fieldId]?.map((f: Entry) => f?.sys?.id)
            : e?.[fieldId]?.sys?.id || ''
        )
        .flat();
    }
    return entries?.map(e => e?.sys?.id || '');
  }

  static GetItems(result: PagedList<Entry>) {
    return this.GetResults(result) ? result.items : [];
  }

  static GetResults(result: PagedList<Entry>) {
    if (result?.items) {
      return result;
    } else {
      return null;
    }
  }
}

export const mergeResults = (
  results: Entry[],
  parentResults: Entry[],
  replaceContentTypeIds: string[],
  linkFieldId: string
) =>
  results
    .map(r => {
      if (replaceContentTypeIds.some(c => c === r.sys.contentTypeId)) {
        const resolvedParent = parentResults?.find(e =>
          e[linkFieldId]?.some((l: Entry) => l.sys?.id === r.sys.id)
        );
        if (resolvedParent)
          return {
            ...resolvedParent,
            ...r,
            entryTitle: resolvedParent.entryTitle,
            entryDescription: resolvedParent.entryDescription,
            sys: resolvedParent.sys,
            originalSys: r.sys,
          };
        else return r;
      }
      return r;
    })
    .filter(r => r) as Entry[];
