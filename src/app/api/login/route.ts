import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { loginId, password } = await req.json();

        if (!loginId || !password) {
            return NextResponse.json(
                { message: "ID와 Password가 필요합니다." },
                { status: 400 }
            );
        }

        const [rows] = await pool.query(
            "SELECT * FROM users WHERE login_id = ?",
            [loginId]
        );

        const users = rows as any[];

        if (users.length === 0) {
            return NextResponse.json(
                { message: "존재하지 않는 ID입니다." },
                { status: 400 } 
            );
        }

        const user = users[0];

        if (user.password !== password) {
            return NextResponse.json(
                { message: "비밀번호가 일치하지 않습니다." },
                { status: 400 }
            );
        }

        if (user.type === "CUSTOMER") {
            return NextResponse.json(
                {
                    customerId: user.id,
                    loginId: user.login_id,
                    name: user.name,
                    grade: user.grade ?? "BASIC",
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                staffId: user.id,
                loginId: user.login_id,
                name: user.name,
                task: user.task,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "서버 에러가 발생했습니다." },
            { status: 400 }
        );
    }
}