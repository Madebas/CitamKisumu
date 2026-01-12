import React from 'react'
import Link from 'next/link'

const SermonSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section - More Compact */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            CITAM Kisumu Sermons
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light">
            Church Sermon
          </p>
        </div>

        {/* Main Content - Tighter Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Sermon Details */}
          <div className="space-y-6">
            {/* Sermon Title */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                The Power of Faith in Modern Times
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Join us for an inspiring CITAM Kisumu Sermons where we explore the enduring 
                power of faith in our contemporary world.
              </p>
            </div>

            {/* Sermon Details - More Compact */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">November 15, 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">6:00 PM - 7:30 PM</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Pastor John Smith</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Hebrews 11:1-6</span>
              </div>
            </div>

            {/* Key Points - More Compact */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <h3 className="text-base font-semibold mb-2">Key Takeaways</h3>
              <ul className="space-y-1.5 text-gray-300 text-sm">
                <li>• Understanding faith as substance and evidence</li>
                <li>• Applying biblical principles to daily life</li>
                <li>• Building spiritual resilience</li>
                <li>• Community's role in strengthening faith</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Media/Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-xl border border-red-500/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-300 text-sm">Play Sermon Recording</p>
              </div>
            </div>
            
            {/* Smaller Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-blue-500/10 rounded-full blur-lg"></div>
          </div>
        </div>

        {/* Bottom Right Corner - Smaller Button */}
        <div className="flex justify-end mt-12">
          <Link 
            href="/sermons/previous-services"
            className="group relative inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden text-sm"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 group-hover:from-red-700 group-hover:to-red-900 transition-all duration-300"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center space-x-2">
              <span>Get More Sermons</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SermonSection