import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const basicAuth = req.headers.get("authorization");

    // Always trigger the browser's native login prompt
    // If credentials were provided but are wrong (handled in middleware), this will re-prompt
    return new NextResponse("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
        },
    });
}
