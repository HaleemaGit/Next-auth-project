import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile';



// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/sign-in',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }




import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
 
  return (
    <>
      <AppLayout title="ProfilePage">
     
          <UserProfile /> 
        
      
        {/* <div> */}
        {/* <UserProfile />; */}
          {/* <h1>
            Hello, {`${session.user.name ?? session.user.email}`} This is a
            protected route. You can see it because you're logged in.
          </h1>
        </div>
        <blockquote>
          <p>This page is protected using Page.auth = true</p>
          <p>Either way works.</p>
          <p>But in this case the session is available on the first render.</p>
        </blockquote> */}
      </AppLayout>
    </>
  );
};

ProfilePage.auth = {
  redirectTo: "/",
};

export default ProfilePage;
