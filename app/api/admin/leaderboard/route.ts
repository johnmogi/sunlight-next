import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const votes = await prisma.vote.findMany();

        // Aggregate votes by cardId
        const leaderboardMap = new Map<string, {
            cardId: string;
            total: number;
            love: number;
            like: number;
            wow: number;
            sad: number;
            fire: number;
        }>();

        votes.forEach((vote: { cardId: string; voteType: string }) => {
            if (!leaderboardMap.has(vote.cardId)) {
                leaderboardMap.set(vote.cardId, {
                    cardId: vote.cardId,
                    total: 0,
                    love: 0,
                    like: 0,
                    wow: 0,
                    sad: 0,
                    fire: 0,
                });
            }

            const entry = leaderboardMap.get(vote.cardId)!;
            entry.total++;

            // Based on schema, voteType is a string. Assuming it matches 'love' | 'like' | 'wow' | 'sad' | 'fire'
            // If the schema only allows 'like', 'dislike', 'love', we need to be careful.
            // However, previous sessions updated the schema to support all 5. 
            // We will map them safely.

            const type = vote.voteType as 'love' | 'like' | 'wow' | 'sad' | 'fire';
            if (['love', 'like', 'wow', 'sad', 'fire'].includes(type)) {
                entry[type]++;
            }
        });

        const leaderboard = Array.from(leaderboardMap.values()).sort((a, b) => b.total - a.total);

        return NextResponse.json({ leaderboard });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json(
            { error: "Failed to fetch leaderboard" },
            { status: 500 }
        );
    }
}
