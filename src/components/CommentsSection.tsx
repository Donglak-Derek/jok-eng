"use client";

import { useEffect, useState } from "react";
import { UserScript, Comment as CommentType } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection, onSnapshot, orderBy, query, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "./Button";

interface CommentsSectionProps {
  scenario: UserScript;
}

export default function CommentsSection({ scenario }: CommentsSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Listen to comments sub-collection
    // Path: users/{authorId}/scenarios/{scenarioId}/comments
    const q = query(
      collection(db, "users", scenario.userId, "scenarios", scenario.id, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as CommentType[];
      setComments(docs);
    });

    return () => unsubscribe();
  }, [scenario.id, scenario.userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    
    if (!scenario.userId) {
        alert("Error: Scenario author ID is missing. Cannot post comment.");
        setSubmitting(false);
        return;
    }

    try {
      console.log(`Attempting to post comment to: users/${scenario.userId}/scenarios/${scenario.id}/comments`);
      await addDoc(collection(db, "users", scenario.userId, "scenarios", scenario.id, "comments"), {
        scenarioId: scenario.id,
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || "Anonymous",
        userPhotoURL: user.photoURL || null,
        text: newComment.trim(),
        createdAt: Date.now() 
      });

      // Increment comment count on the parent scenario document
      try {
          const scenarioRef = doc(db, "users", scenario.userId, "scenarios", scenario.id);
          await updateDoc(scenarioRef, {
              commentsCount: increment(1)
          });
      } catch (countErr) {
          console.error("Failed to increment comment count:", countErr);
      }

      setNewComment("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error posting comment:", err);
      // Show the actual error message to the user for debugging
      alert(`Failed to post comment: ${err.message || err.code || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t-2 border-black/5 bg-gray-50/50 rounded-lg p-4">
      <h4 className="font-sans font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">Comments ({comments.length})</h4>
      
      {/* Comments List */}
      <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
        {comments.length === 0 ? (
          <p className="font-hand text-sm text-gray-400 italic text-center py-2">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full border border-black/10 flex-shrink-0 overflow-hidden bg-white">
                {comment.userPhotoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={comment.userPhotoURL} alt={comment.userName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 bg-gray-100">
                    {comment.userName[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col bg-white p-3 rounded-2xl rounded-tl-none border border-black/5 shadow-sm">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-black">{comment.userName}</span>
                    <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                 </div>
                 <p className="text-sm text-gray-700 leading-snug font-hand">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      {user ? (
        <form 
          onSubmit={(e) => {
             e.stopPropagation();
             handleSubmit(e);
          }} 
          className="flex gap-2"
          onClick={(e) => e.stopPropagation()} // Stop bubbling for whole form
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-white border border-black/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors shadow-inner"
            disabled={submitting}
          />
          <Button 
            type="submit" 
            variant="secondary" 
            size="sm"
            disabled={submitting || !newComment.trim()}
            className="text-xs font-bold border border-black/10"
          >
            Send
          </Button>
        </form>
      ) : (
        <p className="text-xs text-gray-400 text-center">Log in to comment.</p>
      )}
    </div>
  );
}
