"use client";

import { createContext, useContext, useState } from "react";
import { mockReviews } from "@/lib/mock/reviews";
import type { Review } from "@/lib/types";

type ReviewsContextValue = {
  reviews: Review[];
  getReview: (id: string) => Review | undefined;
  updateAiReply: (id: string, aiReply: string) => void;
  markReplied: (id: string, replyText: string) => void;
};

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const value: ReviewsContextValue = {
    reviews,
    getReview: (id) => reviews.find((review) => review.id === id),
    updateAiReply: (id, aiReply) =>
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, aiReply } : review,
        ),
      ),
    markReplied: (id, replyText) =>
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id
            ? {
                ...review,
                aiReply: replyText,
                status: "返信済み",
                repliedAt: new Date()
                  .toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replaceAll("-", "/"),
                repliedBy: "店舗管理者",
              }
            : review,
        ),
      ),
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextValue {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews は ReviewsProvider の内側で使ってください");
  }
  return context;
}
