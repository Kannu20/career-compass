"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const tests = [
    {
        id: "aptitude-1",
        title: "Aptitude Test – Basics",
        questions: 10,
        duration: 15,
    },
    {
        id: "coding-1",
        title: "Coding MCQs – DSA",
        questions: 8,
        duration: 20,
    },
    {
        id: "cs-core-1",
        title: "CS Core – OS + DBMS",
        questions: 12,
        duration: 18,
    },
];

export default function TestsPage() {
    const router = useRouter();
    return (
        <div className="space-y-6">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white"
            >
                Available Tests
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-6">
                {tests.map((test, index) => (
                    <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition"
                        onClick={() => router.push(`/dashboard/tests/${test.id}`)}
                    >
                        <h2 className="text-xl font-semibold text-white">{test.title}</h2>
                        <p className="text-gray-300 mt-2">
                            {test.questions} Questions · {test.duration} mins
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );

}
