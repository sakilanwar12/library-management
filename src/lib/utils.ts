export const getLimit = (limit: unknown, fallback = 10): number => {
  const parsed = parseInt(limit as string, 10);

  if (isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
};

export const getSort = (
  sortBy: unknown = "createdAt",
  sortOrder: unknown = "asc"
): Record<string, 1 | -1> => {
  const sortField = typeof sortBy === "string" ? sortBy : "createdAt";
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  return { [sortField]: sortDirection };
};
