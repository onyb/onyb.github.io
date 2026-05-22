const social = {
  twitter: "https://x.com/onybose",
  github: "https://github.com/onyb",
  linkedin: "https://linkedin.com/in/onyb",
};

export default {
  title: "Anirudha Bose",
  author: "Anirudha Bose",
  url: "https://anirudha.co",
  description:
    "Anirudha (Ani) Bose — Senior Staff Engineer at Brave, working on Web3, wallets, and cryptography.",
  defaultImage: "/android-chrome-512x512.png",
  social,
  person: {
    name: "Anirudha Bose",
    givenName: "Anirudha",
    familyName: "Bose",
    alternateName: ["Ani Bose", "Ani", "onyb"],
    jobTitle: "Senior Staff Engineer",
    worksFor: { name: "Brave", url: "https://brave.com" },
    description:
      "Senior Staff Engineer at Brave working on Web3, wallets, and cryptography. Previously Ledger, CERN, HRI; runs 21M Labs.",
    knowsAbout: [
      "Web3",
      "Blockchain",
      "Bitcoin",
      "Ethereum",
      "Self-custodial wallets",
      "Elliptic Curve Cryptography",
      "Software Engineering",
      "Large Language Models",
    ],
    sameAs: [...Object.values(social), "https://21mlabs.com"],
  },
};
