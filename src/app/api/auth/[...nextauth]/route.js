import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await mongoose.connect(process.env.MONGO_URL);
        const user = User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) return user;
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
