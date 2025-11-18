"use client";

import React from 'react'
import SectionHeading from '@/components/Helper/SectionHeading'
import Image from 'next/image'

const About = () => {
  return (
    <section className="pt-20 pb-20 bg-[#fff8f0]">
      <div className="container mx-auto w-[80%] flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="md:w-1/2">
          <Image
            src="/images/HeroSectionMain2.png"
            alt="CITAM Kisumu Church"
            width={800}
            height={600}
            priority
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2">
          <SectionHeading heading="CITAM KSM" />
          <p className="mt-6 text-gray-700 leading-relaxed">
            Christ Is The Answer Ministries (CITAM) Kisumu is a community of believers
            committed to transforming lives through the gospel of Jesus Christ.
            We exist to make disciples of all nations and to impact society through
            holistic ministry — spiritual, social, and economic empowerment.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            We believe that Christ is truly the answer to every need of humanity.
            Join us for our worship services, fellowship groups, and outreach programs
            as we grow together in faith and purpose.
          </p>

          <button className="mt-8 px-6 py-3 bg-[#e63946] text-white rounded-lg font-semibold hover:bg-[#d62839] transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Mission - Vision - Values Section */}
      <div className="container mx-auto w-[80%] mt-16 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {/* Mission */}
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To know God and to make Him known through evangelism and discipleship.
              To share the love of Christ through worship, discipleship, and service.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              A Community of Believers Impacting the World with the Gospel of our Lord Jesus Christ through the transforming Power of the Holy Spirit.
            </p>
          </div>

          {/* Values */}
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-700 leading-relaxed">
              Community, Integrity, Transformation, Accountability and Ministry.
            </p>
          </div>
        </div>

        {/* Bottom Border Message */}
        <div className="text-center border-t border-gray-300 py-4 bg-white">
          <p className="text-lg font-semibold text-gray-800">
            You’re always welcome here.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
