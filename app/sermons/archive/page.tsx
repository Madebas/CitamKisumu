"use client";

import React, { useMemo, useState } from "react";
import { Search, Download, PlayCircle } from "lucide-react";

const archiveSermons = [
	{
		id: "archive-1",
		title: "Living by Faith",
		date: "November 20, 2025",
		speaker: "Rev. John Ochieng",
		youtubeId: "ysz5S6PUM-U",
		downloadUrl: "https://example.com/audio/living-by-faith.mp3",
		tags: ["Faith", "Hebrews"],
	},
	{
		id: "archive-2",
		title: "Prayer that Prevails",
		date: "November 13, 2025",
		speaker: "Pastor Grace Achieng",
		youtubeId: "ScMzIvxBSi4",
		downloadUrl: "https://example.com/audio/prayer-prevails.mp3",
		tags: ["Prayer", "Intercession"],
	},
	{
		id: "archive-3",
		title: "Family Altars",
		date: "November 6, 2025",
		speaker: "Pastor Daniel Were",
		youtubeId: "2Xc9gXyf2G4",
		downloadUrl: "https://example.com/audio/family-altars.mp3",
		tags: ["Family", "Discipleship"],
	},
];

const ArchivePage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredSermons = useMemo(() => {
		return archiveSermons.filter((sermon) => {
			const text = `${sermon.title} ${sermon.speaker} ${sermon.date} ${sermon.tags.join(" ")}`.toLowerCase();
			return text.includes(searchTerm.toLowerCase());
		});
	}, [searchTerm]);

	return (
		<main className="bg-gradient-to-b from-slate-950 via-[#3d080f] to-black text-white min-h-screen py-16">
			<div className="max-w-6xl mx-auto px-4 space-y-10">
				<header className="space-y-4 text-center">
					<p className="text-sm uppercase tracking-[0.4em] text-red-200">Archive</p>
					<h1 className="text-3xl md:text-5xl font-extrabold">Sermon Library</h1>
					<p className="text-gray-300 max-w-3xl mx-auto">
						Browser past services, teachings, and special Sundays. Search by speaker, topic, or date and watch
						immediately on demand.
					</p>
				</header>

				<div className="relative max-w-3xl mx-auto">
					<Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
					<input
						type="search"
						aria-label="Search sermons"
						placeholder="Search by title, speaker, or theme"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full rounded-full bg-white/10 border border-white/20 pl-12 pr-6 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
					/>
				</div>

				<section className="space-y-6">
					{filteredSermons.length === 0 && (
						<p className="text-center text-gray-300">No sermons found. Try a different search.</p>
					)}
					{filteredSermons.map((sermon) => (
						<article
							key={sermon.id}
							className="rounded-3xl bg-white/10 border border-white/10 p-6 flex flex-col md:flex-row gap-6"
						>
							<div className="flex-1 space-y-4">
								<div>
									<p className="text-xs uppercase tracking-[0.4em] text-red-200">{sermon.date}</p>
									<h2 className="text-2xl font-semibold text-white">{sermon.title}</h2>
									<p className="text-sm text-gray-300">Speaker: {sermon.speaker}</p>
								</div>

								<div className="flex flex-wrap gap-2">
									{sermon.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-widest text-red-200"
										>
											{tag}
										</span>
									))}
								</div>

								<div className="flex flex-wrap gap-3 text-sm">
									<button
										type="button"
										className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
										onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.youtubeId}`, "_blank")}
									>
										<PlayCircle className="w-4 h-4" /> Watch on YouTube
									</button>
									<a
										href={sermon.downloadUrl}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:border-white"
									>
										<Download className="w-4 h-4" /> Download Audio
									</a>
								</div>
							</div>

							<div className="w-full md:w-80">
								<div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden border border-white/10">
									<iframe
										title={`${sermon.title} video player`}
										src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="absolute inset-0 w-full h-full"
										loading="lazy"
									/>
								</div>
							</div>
						</article>
					))}
				</section>
			</div>
		</main>
	);
};

export default ArchivePage;
