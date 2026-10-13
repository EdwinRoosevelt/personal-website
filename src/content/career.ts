export type Revision = {
  rev: string;
  from: string;
  to: string | null;
  role: string;
  org: string;
  place: string;
  notes: string[];
};

/** Oldest first. Revision letters follow drawing convention: A is the first issue. */
export const revisions: Revision[] = [
  {
    rev: "A",
    from: "Mar 2021",
    to: "Jul 2022",
    role: "Site reliability engineer, SonyLIV",
    org: "Tata Consultancy Services",
    place: "Ahmedabad",
    notes: [
      "Built and maintained monitoring that tracked the health and performance of the SonyLIV streaming platform.",
      "Responded to incidents, diagnosed root causes and shipped fixes to keep downtime short.",
    ],
  },
  {
    rev: "B",
    from: "Jul 2022",
    to: "Mar 2023",
    role: "Web application developer",
    org: "Bibox Labs (Evobi Automations)",
    place: "Bengaluru",
    notes: [
      "Built web applications with product managers, designers and other developers.",
      "Tracked down and fixed issues reported by users and clients.",
    ],
  },
  {
    rev: "C",
    from: "Mar 2023",
    to: null,
    role: "Full-stack MERN developer",
    org: "Beanstalkedu Services",
    place: "Kolkata",
    notes: [
      "Build responsive interfaces in React, and the Node.js services behind them.",
      "Design and maintain application logic and secure authentication.",
      "Keep technical documentation current so knowledge doesn't live in one head.",
    ],
  },
];

export const education = [
  {
    years: "2022 – 2023",
    title: "Executive PG Programme in Software Development, Cloud Computing",
    school: "IIIT Bangalore",
    grade: "CGPA 3.6 / 4.0",
  },
  {
    years: "2015 – 2019",
    title: "B.Tech, Mechanical Engineering",
    school: "Amrita Vishwa Vidyapeetham, Coimbatore",
    grade: "CGPA 8.5 / 10",
    notes: "Led the web and multimedia team for Anokha, the college tech fest. Edited Amritadhwani, the college magazine.",
  },
];
