// import { useState } from "react";
// import { REVIEW_URL } from "../places/places-api-url";

// const REVIEWS_PER_PAGE = 5;

// export const useReviews = (itemId, byPlace = true) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   const loadReviews = async (initial = false) => {
//     if (loading) return;
//     setLoading(true);

//     const offset = initial ? 0 : page * REVIEWS_PER_PAGE;

//     try {
//       const res = await fetch(
//         `${REVIEW_URL}?${byPlace ? "placeId" : "userId"}=${itemId}&limit=${REVIEWS_PER_PAGE}&offset=${offset}`
//       );
//       const data = await res.json();

//       if (initial) {
//         setReviews(data.reviews);
//         setPage(1);
//       } else {
//         setReviews((prev) => [...prev, ...data.reviews]);
//         setPage((prev) => prev + 1);
//       }

//       setHasMore(data.reviews.length === REVIEWS_PER_PAGE);
//     } catch (e) {
//       console.error("Error loading reviews:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     reviews,
//     loading,
//     hasMore,
//     loadReviews,
//   };
// };

import { useEffect, useState } from "react";
import { REVIEW_URL } from "../places/places-api-url";

const REVIEWS_PER_PAGE = 5;

export const useReviews = (itemId, byPlace = true, refreshKey = null) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    if (refreshKey !== null) {
      setReviews([]);
      setPage(0);
      setHasMore(true);
      loadReviews(true);
    }
  }, [refreshKey]);

  const loadReviews = async (initial = false) => {
    if (loading) return;
    setLoading(true);
    setError(null); // Reset previous error

    const offset = initial ? 0 : page * REVIEWS_PER_PAGE;

    try {
      const res = await fetch(
        `${REVIEW_URL}?${byPlace ? "placeId" : "userId"}=${itemId}&limit=${REVIEWS_PER_PAGE}&offset=${offset}`
      );
      const data = await res.json();

      const newReviews = Array.isArray(data.reviews) ? data.reviews : [];

      if (initial) {
        setReviews(newReviews);
        setPage(1);
      } else {
        setReviews((prev) => [...prev, ...newReviews]);
        setPage((prev) => prev + 1);
      }

      setHasMore(newReviews.length === REVIEWS_PER_PAGE);
      reviewsShouldBeRefreshed = false;
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (e) {
      console.error("Error loading reviews:", e);
      setError("Failed to load reviews."); // Optional
      if (initial) {
        setReviews([]);
        setPage(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetReviews = () => {
    setReviews([]);
    setPage(0);
    setHasMore(true);
  };

  const removeReviewById = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return {
    reviews,
    loading,
    hasMore,
    loadReviews,
    error,
    resetReviews,
    removeReviewById,
  };
};
