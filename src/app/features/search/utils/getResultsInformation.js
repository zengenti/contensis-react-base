const getResultsInformation = (paging, searchTerm) => {
  if (!paging) return null;
  const { pageIndex, pageSize, totalCount } = paging;

  const start = pageIndex * pageSize + 1;
  let end = start + pageSize - 1;

  if (end > totalCount) end = totalCount;

  let text =
    totalCount > 0
      ? `Results <strong>${start}</strong> - <strong>${end}</strong> of about <strong>${totalCount}</strong> results`
      : null;

  if (text && searchTerm) text += ` for <strong>${searchTerm}</strong>`;

  return text;
};

export default getResultsInformation;
