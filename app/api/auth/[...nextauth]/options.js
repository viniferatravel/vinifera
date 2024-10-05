import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

const BASE_URL = process.env.BASE_URL;

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({

      name: 'Credentials',
      async authorize(credentials, req) {


        if (credentials.userID && credentials.user_role && credentials.password) {

          const res = await fetch(BASE_URL + "api/userApi", {
            method: 'POST',
            body: JSON.stringify({ "userID": credentials.userID, "user_role": credentials.user_role }),
            headers: { "Content-Type": "application/json" }
          })
          const use = await res.json()

          // console.log("Credentials::::>", use)
          let user = use.result;

          // // console.log("User: ", user);

          if (res.ok && user) {
            if (user) {

              const dbuserID = user.user_id;
              const dbpassword = user.hashPassword;

              const match = await bcrypt.compare(credentials.password, dbpassword);

              if (match) {

                if (Object.keys(user).length > 0) {

                  user = { user_id: user.user_id, user_role: user.user_role };

                  return user

                } else {

                  return null;

                }

              } else {

                return null;

              }
            };
          }

        }

      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {

      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    }
  },
  pages: {
    signIn: "/adminlogin",
  },
  secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',

}

export default NextAuth(options)
