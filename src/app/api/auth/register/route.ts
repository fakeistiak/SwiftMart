import User from "@/models/user.model";
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest) {
    try {
        let body;

        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { message: "Invalid JSON body. Check the commas and quotes in your request." },
                { status: 400 }
            );
        }

        const { name, email, password, mobile } = body;
        if (!name || !email || !password || !mobile) {
            return NextResponse.json(
                { message: "name, email, password, and mobile are required." },
                { status: 400 }
            );
        }

        await connectDb();
        const existUser =await User.findOne({ email });
        if(existUser){
            return NextResponse.json({ message: "User already exists!" }, { status: 400 });
        }
        if(password.length<6){
            return NextResponse.json({ message: "Password must be at least 6 characters long!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });
        await newUser.save();
        return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

    }catch(error){
        console.error("Register API error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An error occurred while registering the user!" },
            { status: 500 }
        );
    }
}