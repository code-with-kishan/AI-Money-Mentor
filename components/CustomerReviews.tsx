"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rohan Kapoor",
    profession: "Software Engineer",
    rating: 5,
    review:
      "Finally a financial app that understands Indian tax laws! The Money Health Score gave me clarity on my financial position I never had before.",
    avatar: "RK",
    color: "from-blue-400 to-cyan-400",
  },
  {
    name: "Priya Sharma",
    profession: "Freelance Designer",
    rating: 5,
    review:
      "The SIP and tax optimization features saved me ₹45,000 annually. The AI recommendations are actually useful and not generic.",
    avatar: "PS",
    color: "from-purple-400 to-pink-400",
  },
  {
    name: "Aditya Patel",
    profession: "Student & Investor",
    rating: 5,
    review:
      "As a young investor, this app simplified wealth planning for me. The future simulator helps me set realistic goals.",
    avatar: "AP",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    name: "Meera Desai",
    profession: "Business Owner",
    rating: 4.5,
    review:
      "Portfolio analysis feature is comprehensive. Combined with AI insights, I've optimized my portfolio allocation significantly.",
    avatar: "MD",
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Vikram Singh",
    profession: "Finance Manager",
    rating: 5,
    review:
      "Best fintech app I've used. The dashboard gives me real-time insights into my entire financial health. Highly recommended!",
    avatar: "VS",
    color: "from-red-400 to-pink-400",
  },
  {
    name: "Neha Iyer",
    profession: "Doctor",
    rating: 4.5,
    review:
      "The chat AI is incredibly helpful. It answers my financial questions better than most advisors I've consulted.",
    avatar: "NI",
    color: "from-indigo-400 to-blue-400",
  },
];

const trustStats = [
  { label: "Active Users", value: "50,000+", icon: "👥" },
  { label: "Assets Managed", value: "₹500 Cr+", icon: "💰" },
  { label: "Average Rating", value: "4.9★", icon: "⭐" },
  { label: "Tax Saved", value: "₹10 Cr+", icon: "💸" },
];

export function CustomerReviews() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll("[data-review-card]");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: false,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll carousel — only runs rAF when visible
  useEffect(() => {
    if (!cardsRef.current) return;

    const carousel = cardsRef.current;
    const scrollSpeed = 0.8;
    let scrollPos = 0;
    let isMouseOver = false;
    let isVisible = false;
    let frameId: number | null = null;

    const onMouseEnter = () => (isMouseOver = true);
    const onMouseLeave = () => (isMouseOver = false);

    carousel.addEventListener("mouseenter", onMouseEnter);
    carousel.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      if (!isVisible) {
        frameId = null;
        return; // Stop the loop entirely when not visible
      }
      if (!isMouseOver && autoScroll) {
        scrollPos += scrollSpeed;
        if (scrollPos > carousel.scrollWidth - carousel.clientWidth) {
          scrollPos = 0;
        }
        carousel.scrollLeft = scrollPos;
      }
      frameId = requestAnimationFrame(animate);
    };

    // Only start/stop rAF based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && frameId === null) {
          frameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(carousel);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      observer.disconnect();
      carousel.removeEventListener("mouseenter", onMouseEnter);
      carousel.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [autoScroll]);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="display-font mb-3 text-4xl font-bold sm:text-5xl">
            Loved by <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">10,000+ Indians</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-300/85">
            Join thousands of Indians who&apos;ve transformed their financial lives with AI Money Mentor.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustStats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-4 text-center transition hover:border-blue-300/40 sm:p-6"
              data-review-card
            >
              <p className="text-2xl sm:text-3xl">{stat.icon}</p>
              <p className="display-font mt-2 text-xl font-bold text-blue-200 sm:text-2xl">{stat.value}</p>
              <p className="text-xs text-slate-400 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div
            ref={cardsRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                data-review-card
                className="group shrink-0 w-80 transition-transform duration-300"
              >
                <GlassCard className="h-full group-hover:scale-105">
                  {/* Stars */}
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-slate-600"}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mb-4 min-h-12 text-sm text-slate-200">{review.review}</p>

                  {/* Divider */}
                  <div className="mb-4 h-px bg-linear-to-r from-transparent via-blue-400/30 to-transparent" />

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-linear-to-br ${review.color} flex items-center justify-center font-bold text-slate-950`}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{review.name}</p>
                      <p className="text-xs text-slate-400">{review.profession}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black to-transparent" />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-300">Ready to join thousands of smart Indians?</p>
          <a
            href="/dashboard"
            className="premium-button inline-block rounded-full px-8 py-3 font-semibold"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}
