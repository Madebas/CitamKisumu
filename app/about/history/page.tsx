"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const timeline = [
	{
		year: "1959",
		title: "Humble Beginnings",
		description:
			"Christ Is The Answer Ministries (then Nairobi Pentecostal Church) was founded in Nairobi with a mandate to preach Christ and disciple believers.",
		image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&auto=format&fit=crop&q=60",
	},
	{
		year: "1980s",
		title: "Nationwide Growth",
		description:
			"CITAM expanded to new congregations across Kenya, launching radio outreach and Bible schools to equip ministers.",
		image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=900&auto=format&fit=crop&q=60",
	},
	{
		year: "2005",
		title: "CITAM Kisumu Planted",
		description:
			"Responding to the growing need in Western Kenya, CITAM Kisumu opened its doors under the leadership of visionary pastors and Safari Group pioneers.",
		image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&auto=format&fit=crop&q=60",
	},
	{
		year: "2015",
		title: "Community Impact",
		description:
			"Expanded community care through Safari Groups, youth mentorship, and city-wide compassion outreaches impacting thousands.",
		image: "https://images.unsplash.com/photo-1474367658825-e5858839e99d?w=900&auto=format&fit=crop&q=60",
	},
	{
		year: "2020-2026",
		title: "Digital & Global",
		description:
			"Online church, global missions partnerships, and renewed focus on prayer & discipleship continue to drive the vision forward.",
		image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&auto=format&fit=crop&q=60",
	},
];

const HistoryPage = () => {
	return (
		<main className="bg-gradient-to-b from-slate-950 via-[#3d080f] to-black text-white min-h-screen py-16">
			<div className="max-w-5xl mx-auto px-4 space-y-12">
				<header className="space-y-4 text-center">
					<p className="text-sm uppercase tracking-[0.4em] text-red-200">
						Our Story
					</p>
					<h1 className="text-3xl md:text-5xl font-extrabold">
						CITAM Kisumu Journey
					</h1>
					<p className="text-gray-300 max-w-3xl mx-auto">
						From a small prayer gathering in Nairobi to a vibrant community
						across the nations, learn how Christ has led CITAM to impact Kisumu
						and beyond.
					</p>
				</header>

				<section className="relative">
					<div
						className="absolute left-5 md:left-1/2 transform -translate-x-1/2 h-full border-l border-white/20"
						aria-hidden
					/>
					<div className="space-y-12">
						{timeline.map((item, index) => (
							<article
								key={item.year}
								className={`relative flex flex-col md:flex-row ${
									index % 2 === 0 ? "md:flex-row-reverse" : ""
								} gap-6 items-center`}
							>
								<div className="md:w-1/2 space-y-3">
									<p className="text-xs uppercase tracking-[0.4em] text-red-200">
										{item.year}
									</p>
									<h2 className="text-2xl font-semibold">
										{item.title}
									</h2>
									<p className="text-gray-200 leading-relaxed">
										{item.description}
									</p>
								</div>
								<div className="md:w-1/2 w-full">
									<div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-lg">
										<Image
											src={item.image}
											alt={item.title}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover"
										/>
									</div>
								</div>
								<span
									className="absolute left-5 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 border-4 border-black"
									aria-hidden
								/>
							</article>
						))}
					</div>
				</section>

				<div className="bg-white/10 border border-white/10 rounded-3xl p-8 text-center space-y-4">
					<h3 className="text-2xl font-semibold">
						Join the ongoing story
					</h3>
					<p className="text-gray-200">
						We believe God is writing new chapters in Kisumu and beyond. Be
						part of this move by serving, giving, and gathering in community
						each week.
					</p>
					<Link
						href="/"
						className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold"
					>
						Visit Us This Sunday
					</Link>
				</div>
			</div>
		</main>
	);
};

export default HistoryPage;
