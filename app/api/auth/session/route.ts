import { NextRequest, NextResponse } from "next/server";
import { signPayload, verifyPayload } from "@/lib/twoFactor";

export const runtime = "nodejs";

const SESSION_COOKIE = "sm_session";
const SESSION_TTL_DAYS = 7;

type SessionPayload = {
    email: string;
    orgName: string;
    role: string;
    exp: number;
};

// GET - Check current session
export async function GET(req: NextRequest) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = verifyPayload<SessionPayload>(token);

    if (!payload) {
        const response = NextResponse.json({ authenticated: false, error: "Invalid session" }, { status: 401 });
        response.cookies.delete(SESSION_COOKIE);
        return response;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
        const response = NextResponse.json({ authenticated: false, error: "Session expired" }, { status: 401 });
        response.cookies.delete(SESSION_COOKIE);
        return response;
    }

    return NextResponse.json({
        authenticated: true,
        user: {
            email: payload.email,
            orgName: payload.orgName,
            role: payload.role,
        },
    });
}

// POST - Create session after successful authentication
export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body?.email || !body?.orgName) {
        return NextResponse.json({ ok: false, error: "Missing email or orgName" }, { status: 400 });
    }

    const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_DAYS * 24 * 60 * 60;

    const token = signPayload({
        email: body.email,
        orgName: body.orgName,
        role: body.role || "user",
        exp,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
        name: SESSION_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
        path: "/",
    });

    return response;
}

// DELETE - Logout / destroy session
export async function DELETE() {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(SESSION_COOKIE);
    return response;
}
