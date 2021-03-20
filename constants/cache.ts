const MAX_AGE = 60 * 60;
const STALE_WHILE_REVALIDATE = 60 * 60 * 24;

export const CACHE_HEADER_VALUE = `max-age=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, public`;
