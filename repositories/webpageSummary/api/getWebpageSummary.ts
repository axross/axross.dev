import GetWebpageSummary from "../GetWebpageSummary";

const getWebpageSummary: GetWebpageSummary = async ({ url }) => {
  const response = await fetch(
    `/api/webpage_summaries/${encodeURIComponent(url.href)}`
  );

  if (!response.ok) new Error();

  const json = await response.json();

  return {
    url: new URL(json.url),
    title: json.title,
    description: json.description,
    imageURL: new URL(json.imageURL),
  };
};

export default getWebpageSummary;
