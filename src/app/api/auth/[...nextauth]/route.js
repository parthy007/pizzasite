import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // console.log("NEXTAUTH SIGN IN USER", user);
      // console.log("NEXTAUTH SIGN IN ACCOUNT", account);
      // console.log("NEXTAUTH SIGN IN PROFILE", profile);
      const { email } = user;
      try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);

        // Check if the user exists in the database
        const dbUser = await User.findOne({ email: email });
        // console.log("NEXTAUTH SIGNIN USER FOUND", dbUser);
        // if (dbUser) return dbUser;
        // If the user does not exist and is signing in with Google and email is verified
        if (
          !dbUser &&
          account?.provider === "google" &&
          profile.email_verified
        ) {
          console.log("Creating new user...");

          // Create a new user object
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });

          // Save the new user to the database
          await newUser.save();
          console.log("New user created:", newUser);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
      return true;
    },
    async jwt({ token, user, trigger, session, account }) {
      // console.log("NEXTAUTH JWT USER", user);
      // console.log("NEXTAUTH JWT TOKEN", token);
      // console.log("NEXTAUTH JWT SESSION", session);
      // console.log("NEXTAUTH JWT ACCOUNT", account);
      // console.log("NEXTAUTH JWT Trigger", trigger);

      if (trigger === "update" && session?.name) {
        token.user.name = session.name;
        token.user.phone = session.phone;
        token.user.address = session.address;
        token.user.pincode = session.pincode;
        token.user.city = session.city;
        token.user.country = session.country;
      }

      delete token.name;
      delete token.email;
      delete token.picture;

      if (!token.user) {
        token.user = {};
      }
      if (user) {
        // console.log("creating userdata");
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          phone: user.phone,
          address: user.address,
          pincode: user.pincode,
          city: user.city,
          country: user.country,
          admin: user.admin,
        };
        // console.log("userdata: ", userData);
        token.user = userData;
      }
      // console.log("NEXTAUTH JWT USER FINAL", token);

      return token;
    },
    async session({ session, token }) {
      // console.log("NEXTAUTH SESSION", session);
      // console.log("NEXTAUTH SESSION TOKEN", token);

      if (token.user) {
        const {
          id,
          name,
          email,
          image,
          phone,
          address,
          pincode,
          city,
          country,
          admin,
        } = token.user;
        session.user = {
          id,
          name,
          email,
          image,
          phone,
          address,
          pincode,
          city,
          country,
          admin,
        };
      }
      if (token.error) {
        session.error = token.error;
      }
      // console.log("NEXTAUTH SESSION FINAL", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // console.log("url", url);
      // console.log("baseUrl", baseUrl);

      return url.startsWith("/") ? baseUrl : url;
    },
  },
  // debug: process.env.NODE_ENV !== "production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
