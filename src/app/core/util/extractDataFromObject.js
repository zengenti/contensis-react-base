//extracts the published date from an entry object
export const getEntryPublishedDate = entry => {
  return entry.publishDateOverride
    ? entry.publishDateOverride
    : entry.sys && entry.sys.version && entry.sys.version.created;
};
