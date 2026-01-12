"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

 
              // src="/images/prayergroups."
              // alt="safarigroupbackground"
              


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

  // Function to generate consistent color based on group name
  const getGroupColor = (groupName: string) => {
    const colors = [
      "bg-blue-50 border-blue-200",
      "bg-green-50 border-green-200",
      "bg-orange-50 border-orange-200",
      "bg-purple-50 border-purple-200",
      "bg-red-50 border-red-200",
      "bg-yellow-50 border-yellow-200",
      "bg-indigo-50 border-indigo-200",
      "bg-pink-50 border-pink-200",
      "bg-teal-50 border-teal-200",
      "bg-cyan-50 border-cyan-200",
    ];
    
    // Simple hash function for consistent color assignment
    let hash = 0;
    for (let i = 0; i < groupName.length; i++) {
      hash = groupName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Google Form URL for registration
  const googleFormUrl = "https://docs.google.com/forms/d/your-form-id-here/viewform";

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

        {/* Safari Group List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safariGroups.map((group, index) => (
            <div
              key={index}
              className={`rounded-xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${getGroupColor(group)}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 font-semibold text-gray-700 text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {group}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  This Safari Group meets weekly for prayer, Bible study, and
                  fellowship within its community zone.
                </p>
                
                <div className="mt-auto">
                  <Link
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    Join This Group
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#e67e22] text-white font-semibold rounded-xl hover:bg-[#cf6d17] transition-colors duration-300 inline-block"
          >
            Join a Safari Group Today
          </Link>
          
          <p className="text-sm text-gray-600 mt-4">
            Fill out our registration form to get connected with a Safari Group
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafariGroupsDetails;