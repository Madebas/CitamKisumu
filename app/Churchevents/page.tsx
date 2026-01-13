'use client'

import { useEffect, useState } from 'react'

const carouselSlides = [
  {
    title: "CITAM Kisumu Christmas Eve Candlelight Service",
    date: "December 24, 2025",
    time: "5:00 PM & 7:00 PM",
    description:
      "Join the CITAM Church Kisumu family for a powerful candlelight service filled with worship, carols, and reflection as we celebrate the birth of our Lord Jesus Christ.",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/christmas-service-flyer-template-design-11d4124293913ad0e39833d5a7e00789_screen.jpg",
  },
  {
    title: "Crossover Night Prayer & Worship",
    date: "December 31, 2025",
    time: "9:00 PM – Midnight",
    description:
      "End the year and begin 2026 in prayer and worship at CITAM Kisumu as we thank God for His faithfulness and commit the new year to Him.",
    image:
      "https://cdn.taggbox.com/v7/https://socialwalls.com/blog/wp-content/uploads/2025/04/people-hands-up-church-worship-altar-liberation-hope_844008-87.jpg",
  },
  {
    title: "CITAM Kisumu Family Retreat",
    date: "January 17–19, 2026",
    time: "All Weekend",
    description:
      "A refreshing retreat designed to strengthen families spiritually, emotionally, and relationally through teaching, fellowship, and prayer.",
    image:
      "https://blog.cph.org/hs-fs/hubfs/_blogs/CPH_blog/Teach/2025/08-25-Fall-Family-Events-Teach.jpg",
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
    image:
      "https://images.squarespace-cdn.com/content/v1/5e67ed0c2192f61504334cb6/6c095cad-435d-4752-aaf0-270ff6ac5068/Image20230811120336.jpg",
  },
  {
    title: "Community Outreach & Food Drive",
    date: "December 20, 2025",
    time: "9:00 AM – 12:00 PM",
    location: "CITAM Kisumu Parking Area",
    category: "Outreach",
    description:
      "Partner with us as we share Christ’s love through giving food supplies to families in need within Kisumu County.",
    image:
      "https://cdn.shopify.com/s/files/1/0091/3509/5863/files/5-church-outreach-ideas-to-connect-with-the-community-img.jpg",
  },
  {
    title: "Sunday Worship Services",
    date: "Every Sunday",
    time: "9:00 AM & 11:00 AM",
    location: "CITAM Kisumu Sanctuary",
    category: "Worship",
    description:
      "Join us every Sunday for vibrant worship, sound biblical teaching, and fellowship with the CITAM Kisumu family.",
    image:
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1413898406773885",
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
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-16 shadow-xl">
          <img
            src={carouselSlides[index].image}
            alt={carouselSlides[index].title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70 text-white p-8 flex flex-col justify-end">
            {daysLeft > 0 && index === 0 && (
              <p className="text-3xl font-bold mb-2 text-yellow-300">
                {daysLeft} Days to Christmas Eve Service
              </p>
            )}
            <h3 className="text-4xl font-bold">
              {carouselSlides[index].title}
            </h3>
            <p className="mt-2 text-gray-200">
              📅 {carouselSlides[index].date} ⏰ {carouselSlides[index].time}
            </p>
            <p className="mt-4 max-w-xl text-gray-200">
              {carouselSlides[index].description}
            </p>
          </div>

          <button
            onClick={() =>
              setIndex((index - 1 + carouselSlides.length) % carouselSlides.length)
            }
            className="absolute left-4 top-1/2 bg-white/90 px-3 py-1 rounded"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setIndex((index + 1) % carouselSlides.length)
            }
            className="absolute right-4 top-1/2 bg-white/90 px-3 py-1 rounded"
          >
            ❯
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
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
                <p className="text-sm mt-2">📅 {event.date}</p>
                <p className="text-sm">⏰ {event.time}</p>
                <p className="text-sm">📍 {event.location}</p>
                <p className="mt-3 text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
