import NextAuth from 'next-auth';
import { authconfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from './app/lib/definitions';
import bcrypt from 'bcrypt'

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authconfig,
    providers: [Credentials({
        async authorize(credentials, request) {
            const parsedCredentails =  z.object({
                email: z.string().email(),
                password: z.string().min(1)
            }).safeParse(credentials)

            if(parsedCredentails.success){
                const { email, password } = parsedCredentails.data
                const user = await getUser(email);
                console.log(user)
                if(!user) return null;
                const passwordMatch = await bcrypt.compare(password, user.password)
                if(passwordMatch) return user;
            }
            return null
        },
    })]
});