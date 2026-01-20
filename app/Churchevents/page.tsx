"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, LocationIcon } from '../../components/Helper/Icons'

// --- Dynamic Event Logic ---
import { addMonths, format, isBefore } from 'date-fns'

// Helper: Calculate Easter Sunday for a given year (Meeus/Jones/Butcher algorithm)
function getEasterSunday(year: number): Date {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4)
  return new Date(year, month - 1, day)
}

// Helper: Get first Sunday of a given month/year
function getFirstSunday(year: number, month: number): Date {
  const firstOfMonth = new Date(year, month, 1)
  const dayOfWeek = firstOfMonth.getDay()
  const offset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  return new Date(year, month, 1 + offset)
}

// Helper: Get NEXT Holy Communion date (first Sunday of current or next month)
function getNextHolyCommunionDate(today: Date): Date {
  const year = today.getFullYear()
  const month = today.getMonth()
  
  // Get first Sunday of current month
  const currentMonthFirstSunday = getFirstSunday(year, month)
  
  // If current month's first Sunday is in the past, get next month's
  if (isBefore(currentMonthFirstSunday, today)) {
    // Get next month
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    return getFirstSunday(nextYear, nextMonth)
  }
  
  return currentMonthFirstSunday
}

// --- Dynamic Carousel Slides ---
function getCarouselSlides(today: Date) {
  // Get the next Holy Communion date
  const nextHolyCommunion = getNextHolyCommunionDate(today)
  
  return [
    {
      title: "CITAM Kisumu Tuvuke Bridge for ex-Candidates",
      date: "January 20, 2026", // Keep as January 20, 2026
      time: "8:00 AM & 7:00 PM",
      description:
        "A special Tuvuke Bridge gathering for ex-candidates — an evening of encouragement, mentorship, and practical next-step support as we walk alongside those transitioning into new opportunities.",
      image: '/images/Event1.jpeg',
    },
    {
      title: "Holy Communion",
      date: format(nextHolyCommunion, "MMMM d, yyyy"),
      time: "During Main Services",
      description: "Join us for Holy Communion on the first Sunday of every month as we remember Christ's sacrifice.",
      image: '/images/event7.jpg',
    }
  ]
}

// --- Dynamic Events List ---
function getEvents(today: Date) {
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const events = [
    // Static events
    {
      title: "Community Outreach & Food Drive",
      date: "December 20, 2025",
      time: "9:00 AM – 12:00 PM",
      location: "CITAM Kisumu Parking Area",
      category: "Outreach",
      description:
        "Partner with us as we share Christ's love through giving food supplies to families in need within Kisumu County.",
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

  // --- Recurring Holy Communion ---
  // Use the next Holy Communion date instead of current month's first Sunday
  const nextHolyCommunion = getNextHolyCommunionDate(today)
  
  // Show Holy Communion if it's upcoming (today or in the future)
  if (!isBefore(nextHolyCommunion, today)) {
    events.push({
      title: "Holy Communion",
      date: format(nextHolyCommunion, "MMMM d, yyyy"),
      time: "During Main Services",
      location: "CITAM Kisumu Sanctuary",
      category: "Worship",
      description: "Join us for Holy Communion on the first Sunday of every month as we remember Christ's sacrifice.",
      image: '/images/event7.jpg',
    })
  }

  // --- Christian Calendar Events (auto, appear 1 month before) ---
  // Helper to check if today is within 1 month before eventDate
  function showEventOneMonthBefore(eventDate: Date) {
    const oneMonthBefore = addMonths(eventDate, -1)
    return today >= oneMonthBefore && today <= eventDate
  }

  // New Year's Eve Night Kesha – December 31
  const nyeDate = new Date(year, 11, 31)
  if (showEventOneMonthBefore(nyeDate)) {
    events.push({
      title: "New Year's Eve Night Kesha",
      date: format(nyeDate, "MMMM d, yyyy"),
      time: "9:00 PM – Midnight",
      location: "CITAM Kisumu Sanctuary",
      category: "Worship",
      description: "Join us for a night of prayer and worship as we cross into the New Year.",
      image: '/images/Event2.jpg',
    })
  }

  // New Year Prayer and Fasting – Beginning of January (show in December and January)
  const nyPrayerStart = new Date(year, 0, 2) // Assume Jan 2nd for start
  if ((month === 11 && day >= 1) || (month === 0 && day <= 15)) {
    events.push({
      title: "New Year Prayer and Fasting",
      date: "Beginning of January",
      time: "See church announcements",
      location: "CITAM Kisumu Sanctuary",
      category: "Prayer",
      description: "Start the year in prayer and fasting as we seek God's guidance for the year ahead.",
      image: '/images/Event2.jpg',
    })
  }

  // Christmas Service – December 25
  const christmasDate = new Date(year, 11, 25)
  if (showEventOneMonthBefore(christmasDate)) {
    events.push({
      title: "Christmas Service",
      date: format(christmasDate, "MMMM d, yyyy"),
      time: "9:00 AM & 11:00 AM",
      location: "CITAM Kisumu Sanctuary",
      category: "Worship",
      description: "Celebrate the birth of Christ with us at our special Christmas Service.",
      image: '/images/event6.jpg',
    })
  }

  // Easter Sunday Service – moveable date
  const easterDate = getEasterSunday(year)
  if (showEventOneMonthBefore(easterDate)) {
    events.push({
      title: "Easter Sunday Service",
      date: format(easterDate, "MMMM d, yyyy"),
      time: "9:00 AM & 11:00 AM",
      location: "CITAM Kisumu Sanctuary",
      category: "Worship",
      description: "Join us for a special Easter Sunday Service as we celebrate the resurrection of Jesus Christ.",
      image: '/images/event6.jpg',
    })
  }

  // Remove duplicates by title and date
  const unique = new Map()
  for (const ev of events) {
    const key = ev.title + '|' + ev.date
    if (!unique.has(key)) unique.set(key, ev)
  }
  return Array.from(unique.values())
}

export default function Page() {
  const [index, setIndex] = useState(0)
  const today = new Date()
  const carouselSlides = getCarouselSlides(today)
  const events = getEvents(today)

  useEffect(() => {
    // Changed from 5000ms (5 seconds) to 30000ms (30 seconds)
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselSlides.length)
    }, 30000) // 30 seconds
    return () => clearInterval(interval)
  }, [carouselSlides.length])

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
          
          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
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