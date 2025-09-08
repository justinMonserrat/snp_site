// app/HomeClient.jsx — client component
"use client";
import { useSearchParams } from "next/navigation";
import HomePage from "./page";

export default function HomeClient() {
    const sp = useSearchParams(); // safe: inside Suspense
    const q = sp.get("q") || "";

    return <main>{<HomePage />}</main>;
}
