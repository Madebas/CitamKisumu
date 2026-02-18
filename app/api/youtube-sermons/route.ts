import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const CHANNEL_ID = 'UC2DbVTl14V4tgkLhbyfdSXg';
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const monthMap: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

// Extract a date from title – tries three common patterns
function extractDateFromTitle(title: string): Date | null {
  const patterns = [
    // Pattern 1: DD(TH) MON YYYY  (e.g. "15TH FEB 2026")
    /(\d{1,2})(?:ST|ND|RD|TH)?\s+([A-Z]{3})\s+(\d{4})/i,
    // Pattern 2: MON DD(TH) YYYY  (e.g. "FEB 15TH 2026")
    /([A-Z]{3})\s+(\d{1,2})(?:ST|ND|RD|TH)?\s+(\d{4})/i,
    // Pattern 3: YYYY MON DD(TH)  (e.g. "2026 FEB 15TH")
    /(\d{4})\s+([A-Z]{3})\s+(\d{1,2})(?:ST|ND|RD|TH)?/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (!match) continue;

    // Depending on the pattern, the groups have different meanings
    if (pattern === patterns[0]) {
      // Groups: day, month, year
      const day = parseInt(match[1], 10);
      const monthStr = match[2].toUpperCase();
      const year = parseInt(match[3], 10);
      const month = monthMap[monthStr];
      if (month !== undefined) return new Date(year, month, day);
    } else if (pattern === patterns[1]) {
      // Groups: month, day, year
      const monthStr = match[1].toUpperCase();
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      const month = monthMap[monthStr];
      if (month !== undefined) return new Date(year, month, day);
    } else if (pattern === patterns[2]) {
      // Groups: year, month, day
      const year = parseInt(match[1], 10);
      const monthStr = match[2].toUpperCase();
      const day = parseInt(match[3], 10);
      const month = monthMap[monthStr];
      if (month !== undefined) return new Date(year, month, day);
    }
  }
  return null;
}

export async function GET() {
  try {
    const response = await fetch(RSS_FEED_URL);
    if (!response.ok) throw new Error(`Failed to fetch RSS feed: ${response.status}`);

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const result = parser.parse(xmlData);

    const feed = result.feed;
    let entries = feed.entry || [];
    if (!Array.isArray(entries)) entries = [entries];

    // First pass: extract date and filter to Sundays only
    const sundayVideos: any[] = [];

    for (const entry of entries) {
      const videoId = entry['yt:videoId'];
      const title = entry.title;
      const publishedAt = entry.published;
      const description = entry['media:group']?.['media:description'] || '';
      const thumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

      const serviceDate = extractDateFromTitle(title);
      if (!serviceDate) continue; // skip if no date in title

      // Check if it's a Sunday (day of week = 0)
      if (serviceDate.getDay() !== 0) continue;

      // Infer speaker
      const speaker = (() => {
        const haystack = `${title} ${description}`.toLowerCase();
        if (haystack.includes('patrick kiprop') || haystack.includes('kiprop'))
          return 'Rev. Patrick Kiprop';
        if (haystack.includes('geoffrey ong') || haystack.includes('ong’ondo'))
          return 'Rev. Geoffrey Ong’ondo';
        if (haystack.includes('jane ong')) return 'Rev. Jane Ong’ondo';
        if (haystack.includes('petronila wegulo')) return 'Rev. Petronila Wegulo';
        if (haystack.includes('florence iminza')) return 'Pastor Florence Iminza';
        if (haystack.includes('epiphany nyirahabimana')) return 'Pastor Epiphany Nyirahabimana';
        return 'CITAM Kisumu Preacher';
      })();

      sundayVideos.push({
        id: videoId,
        title,
        date: serviceDate.toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        }),
        serviceDate, // for sorting
        speaker,
        excerpt: description.slice(0, 100) + (description.length > 100 ? '…' : ''),
        youtubeId: videoId,
        thumbnail,
      });
    }

    // Sort by service date descending (newest first)
    sundayVideos.sort((a, b) => b.serviceDate.getTime() - a.serviceDate.getTime());

    // Deduplicate by date – keep only the first video for each distinct Sunday
    const seenDates = new Set<string>();
    const uniqueSundayVideos: typeof sundayVideos = [];

    for (const video of sundayVideos) {
      const dateKey = video.serviceDate.toDateString();
      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        uniqueSundayVideos.push(video);
      }
      if (uniqueSundayVideos.length >= 4) break; // we only need four
    }

    // Remove the temporary serviceDate field
    const resultSermons = uniqueSundayVideos.map(({ serviceDate, ...rest }) => rest);

    return NextResponse.json({ sermons: resultSermons }, { status: 200 });
  } catch (error) {
    console.error('RSS feed error:', error);
    return NextResponse.json({ error: 'Failed to fetch sermons' }, { status: 500 });
  }
}