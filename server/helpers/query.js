export const buildQuery = (filters) => {
  const query = {};

  if (filters.city) query.city = filters.city;
  if (filters.purpose) query.purpose = filters.purpose;
  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;
  if (filters.bedroom) query.bedroom = filters.bedroom;

  if (filters.minPrice)
    query["price.value"] = {
      ...query["price.value"],
      $gte: Number(filters.minPrice),
    };
  if (filters.maxPrice)
    query["price.value"] = {
      ...query["price.value"],
      $lte: Number(filters.maxPrice),
    };

  return query;
};
