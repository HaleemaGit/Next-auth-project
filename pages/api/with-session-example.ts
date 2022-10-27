import { getSession } from "@lib/auth/session";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "This is your protected writing-space. You can access this content because you are one of our esteemed Bloggers.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
