"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, LocationIcon } from '../../components/Helper/Icons'

const carouselSlides = [
  {
    title: "CITAM Kisumu Tuvuke Bridge for ex-Candidates",
    date: "January 20, 2026",
    time: "8:00 AM & 7:00 PM",
    description:
      "A special Tuvuke Bridge gathering for ex-candidates — an evening of encouragement, mentorship, and practical next-step support as we walk alongside those transitioning into new opportunities.",
    image: '/images/Event1.jpeg',
  },
  {
    title: "Crossover Night Prayer & Worship",
    date: "December 31, 2025",
    time: "9:00 PM – Midnight",
    description:
      "End the year and begin 2026 in prayer and worship at CITAM Kisumu as we thank God for His faithfulness and commit the new year to Him.",
    image: '/images/Event2.jpg',
  },
  {
    title: "CITAM Kisumu Family Retreat",
    date: "January 17–19, 2026",
    time: "All Weekend",
    description:
      "A refreshing retreat designed to strengthen families spiritually, emotionally, and relationally through teaching, fellowship, and prayer.",
    image: '/images/Event 3.png',
  },
]

const events = [
  {
    title: "CITAM Kisumu Youth Overnight (Lock-In)",
    date: "January 10, 2026",
    time: "7:00 PM – 7:00 AM",
    location: "CITAM Kisumu Church Grounds",
    category: "Youth Ministry",
    description:
      "An overnight youth experience featuring worship, teaching, team activities, and mentorship sessions.",
    image: '/images/event4.jpg',
  },
  {
    title: "Community Outreach & Food Drive",
    date: "December 20, 2025",
    time: "9:00 AM – 12:00 PM",
    location: "CITAM Kisumu Parking Area",
    category: "Outreach",
    description:
      "Partner with us as we share Christ’s love through giving food supplies to families in need within Kisumu County.",
    image: '/images/event5.jpg',
  },
  {
    title: "Sunday Worship Services",
    date: "Every Sunday",
    time: "9:00 AM & 11:00 AM",
    location: "CITAM Kisumu Sanctuary",
    category: "Worship",
    description:
      "Join us every Sunday for vibrant worship, sound biblical teaching, and fellowship with the CITAM Kisumu family.",
    image: '/images/event6.jpg',
  },
]

export default function Page() {
  const [index, setIndex] = useState(0)
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const target = new Date("2025-12-24").getTime()
    const now = new Date().getTime()
    const diff = target - now
    setDaysLeft(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))))
  }, [])

  return (
    <section id="events" className="py-16 bg-[#6b0f1a]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            CITAM Church Kisumu – Announcements & Events
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Stay informed and connected with what God is doing at CITAM Church Kisumu.
            Join us in worship, discipleship, and community outreach.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative h-[360px] sm:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden mb-16 shadow-xl">
          <Image
            src={carouselSlides[index].image}
            alt={carouselSlides[index].title}
            fill
            sizes="100vw"
            quality={90}
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70 text-white p-8 flex flex-col justify-end">
            {daysLeft > 0 && index === 0 && (
              <p className="text-3xl font-bold mb-2 text-yellow-300">
                {daysLeft} Days to Christmas Eve Service
              </p>
            )}
            <h3 className="text-3xl sm:text-4xl font-bold">
              {carouselSlides[index].title}
            </h3>
            <p className="mt-2 text-gray-200 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-yellow-300" />
                {carouselSlides[index].date}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-yellow-300" />
                {carouselSlides[index].time}
              </span>
            </p>
            <p className="mt-4 max-w-xl text-gray-200">
              {carouselSlides[index].description}
            </p>
          </div>

          <button
            onClick={() =>
              setIndex((index - 1 + carouselSlides.length) % carouselSlides.length)
            }
            className="absolute left-4 top-1/2 max-sm:top-auto max-sm:bottom-4 max-sm:left-3 bg-white/90 px-3 py-1 rounded"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setIndex((index + 1) % carouselSlides.length)
            }
            className="absolute right-4 top-1/2 max-sm:top-auto max-sm:bottom-4 max-sm:right-3 bg-white/90 px-3 py-1 rounded"
          >
            ❯
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#6b0f1a] text-white text-sm px-3 py-1 rounded">
                  {event.category}
                </span>
              </div>

              <div className="p-5">
                <h4 className="text-xl font-semibold text-[#6b0f1a]">
                  {event.title}
                </h4>
                <p className="text-sm mt-2 inline-flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-[#6b0f1a]" />{event.date}</p>
                <p className="text-sm inline-flex items-center gap-2"><ClockIcon className="w-4 h-4 text-[#6b0f1a]" />{event.time}</p>
                <p className="text-sm inline-flex items-center gap-2"><LocationIcon className="w-4 h-4 text-[#6b0f1a]" />{event.location}</p>
                <p className="mt-3 text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
