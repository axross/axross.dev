import GetWebpageSummary from "../GetWebpageSummary";

const getWebpageSummary: GetWebpageSummary = async ({ url }) => {
  if (url.href === "https://localhost:0/article") {
    return Promise.resolve({
      url: new URL("https://www.kohei.dev/posts/react-content-loader?hl=en-US"),
      title: "Implementing Loading Placeholder with React Content Loader",
      description:
        "I spent a year-end vacation to implement loading placeholders on this website. I’ll introduce it.",
      imageURL: new URL("https://www.kohei.dev/profile.jpg"),
    });
  }

  if (url.href === "https://localhost:0/lorem-ipsum") {
    return Promise.resolve({
      url: new URL(
        "https://www.lorem.ipsum/dolor-sit-amet/consectetur-adipiscing-elit/sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua.-Ut-enim-ad-minim-veniam/quis-nostrud-exercitation-ullamco-laboris-nisi-ut-aliquip-ex-ea-commodo-consequat.-Duis-aute-irure-dolor-in-reprehenderit-in-voluptate-velit-esse-cillum-dolore-eu-fugiat-nulla-pariatur.-Excepteur-sint-occaecat-cupidatat-non-proident/sunt-in-culpa-qui-officia-deserunt-mollit-anim-id-est-laborum"
      ),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      imageURL: new URL("https://cdn2.mhpbooks.com/2014/03/test_ttp_big.jpg"),
    });
  }

  if (url.href === "https://localhost:0/loading-forever") {
    return new Promise(() => {});
  }

  if (url.href === "https://localhost:0/no-image") {
    return Promise.resolve({
      url: new URL("https://www.kohei.dev/posts/react-content-loader?hl=en-US"),
      title: "Implementing Loading Placeholder with React Content Loader",
      description:
        "I spent a year-end vacation to implement loading placeholders on this website. I’ll introduce it.",
      imageURL: null,
    });
  }

  if (url.href === "https://localhost:0/unavailable") {
    return Promise.reject(new Error());
  }

  throw new Error(`the given URL (${url}) is not supported.`);
};

export default getWebpageSummary;
