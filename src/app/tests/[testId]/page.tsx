"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { requireAuth } from "@/lib/auth";


type Question = {
  _id: string;
  question: string;
  options: string[];
};

export default function TestAttemptPage() {
  const { testId } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    requireAuth();

    const fetchQuestions = async () => {
      try {
        const res = await apiRequest(`/tests/${testId}`);
        setQuestions(res.data.questions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleSelect = (qId: string, optionIndex: number) => {
    setAnswers({ ...answers, [qId]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        answers: Object.entries(answers).map(
          ([questionId, selectedOption]) => ({
            questionId,
            selectedOption,
          })
        ),
      };

      await apiRequest(`/tests/${testId}/submit`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading test...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="mb-8 text-2xl font-bold">Test Attempt</h1>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q._id}
            className="rounded-lg bg-white p-6 shadow"
          >
            <p className="font-medium">
              {index + 1}. {q.question}
            </p>

            <div className="mt-4 space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex cursor-pointer items-center gap-2 rounded border p-2 ${
                    answers[q._id] === i
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={q._id}
                    checked={answers[q._id] === i}
                    onChange={() => handleSelect(q._id, i)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Submit Test
      </button>
    </main>
  );
}
