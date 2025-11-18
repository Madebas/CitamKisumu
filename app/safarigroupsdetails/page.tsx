"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SafariGroupsDetails: React.FC = () => {
  const safariGroups = [
    "Airport-Brightlight Safari Group Fellowship",
    "Katworo Safari Group Fellowship",
    "Mamboleo Safari Group Fellowship",
    "Tom Mboya Safari Group Fellowship",
    "Kiboswa Safari Group Fellowship",
    "Okore Robert Ouko Safari Group Fellowship",
    "Elgons Safari Group Fellowship",
    "Rabour-Ahero Safari Group Fellowship",
    "Kawater Safari Group Fellowship",
    "Ojola Safari Group Fellowship",
    "Carwash Safari Group Fellowship",
    "Nyamasaria A and B Safari Group Fellowship",
    "Manyatta-Baraka Safari Group Fellowship",
    "Lower Arina Safari Group Fellowship",
    "Kemri Safari Group Fellowship",
    "RIAT-Lake View Safari Group Fellowship",
    "Posta Flats Safari Group Fellowship",
    "Amani Safari Group Fellowship",
    "Riat Hills Safari Group Fellowship",
    "Polyview Safari Group Fellowship",
    "Vihiga Safari Group Fellowship",
    "Kanyamedha B Safari Group Fellowship",
    "Upper Migosi Safari Group Fellowship",
    "Otonglo Safari Group Fellowship",
    "Lower Migosi Safari Group Fellowship",
    "Milimani Safari Group Fellowship",
    "Kilo Safari Group Fellowship",
    "Railways Nyalenda Safari Group Fellowship",
    "Grace Ogot Safari Group Fellowship",
    "KenyaRe Safari Group Fellowship",
    "USAID Safari Group Fellowship",
    "Eagles Safari Group Fellowship",
    "Luanda Safari Group Fellowship",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto w-[85%]">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Safari Group Fellowships
        </h1>

        <p className="text-center text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
          CITAM Kisumu Safari Groups are the heart of our community. These small
          fellowships bring believers together for discipleship, encouragement,
          and outreach. Through these groups, members experience genuine care,
          spiritual growth, and a sense of family within the larger church body.
        </p>

        {/* Safari Group List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safariGroups.map((group, index) => (
            <div
              key={index}
              className="bg-[#fff8f0] rounded-2xl shadow-md hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-40">
                <Image
                  src="/images/fellowship.jpg"
                  alt={group}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {group}
                </h3>
                <p className="text-sm text-gray-700">
                  This Safari Group meets weekly for prayer, Bible study, and
                  fellowship within its community zone.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="mailto:info@citamkisumu.org"
            className="px-8 py-3 bg-[#e67e22] text-white font-semibold rounded-xl hover:bg-[#cf6d17] transition"
          >
            Join a Safari Group Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SafariGroupsDetails;
