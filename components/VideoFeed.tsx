'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VideoPlayer from './VideoPlayer';
import DonationButton from './DonationButton';
import Header from './Header';

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  creator: {
    id: string;
    username: string;
    avatar: string;
    followers: number;
  };
  title: string;
  likes: number;
  comments: number;
  shares: number;
  donations: number;
}

interface VideoFeedProps {
  videos: Video[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Mark user interaction when scrolling
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
      
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const newIndex = Math.round(scrollTop / containerHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    // Also track any user interaction (click, touch, etc.) on the page
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [currentVideoIndex, videos.length, hasUserInteracted]);

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide pt-16"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full snap-start snap-always relative bg-[#0f0f0f] flex items-center justify-center pt-16"
          >
            <main className="flex items-center justify-center w-full max-w-[580px] h-full max-h-[calc(100vh-8rem)] px-4">
              {/* Video Container */}
              <div className="w-full max-w-[450px] h-full min-w-0 relative flex-shrink-0">
                <VideoPlayer
                  video={video}
                  isActive={index === currentVideoIndex}
                  hasUserInteracted={hasUserInteracted}
                />
                
                {/* Video Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 text-white z-20">
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/profile/${video.creator.username.toLowerCase()}`} 
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer relative z-30"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent video click when clicking creator link
                        e.preventDefault(); // Prevent default link behavior
                        router.push(`/profile/${video.creator.username.toLowerCase()}`);
                      }}
                    >
                      <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0" style={{ backgroundImage: `url(${video.creator.avatar})` }}></div>
                      <p className="font-semibold">@{video.creator.username}</p>
                    </Link>
                    <p className="mt-2 text-sm">{video.title}</p>
                  </div>
                </div>
              </div>

              {/* Right Side Action Buttons */}
              <div className="ml-4 flex flex-col items-center justify-end gap-5 flex-shrink-0">
                {/* Like Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="h-12 w-12 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#333333] transition-colors">
                    <span className="material-symbols-outlined text-2xl text-white">favorite</span>
                  </div>
                  <span className="text-xs font-medium text-white">{formatCount(video.likes)}</span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="h-12 w-12 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#333333] transition-colors">
                    <span className="material-symbols-outlined text-2xl text-white">comment</span>
                  </div>
                  <span className="text-xs font-medium text-white">{formatCount(video.comments)}</span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="h-12 w-12 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#333333] transition-colors">
                    <span className="material-symbols-outlined text-2xl text-white">share</span>
                  </div>
                  <span className="text-xs font-medium text-white">{formatCount(video.shares)}</span>
                </button>

                {/* More Options Button */}
                <button className="flex flex-col items-center gap-1">
                  <div className="h-12 w-12 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#333333] transition-colors">
                    <span className="material-symbols-outlined text-2xl text-white">more_horiz</span>
                  </div>
                </button>

                {/* Follow Button */}
                <button className="h-12 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors">
                  Follow
                </button>

                {/* Boost Button */}
                <DonationButton 
                  video={video}
                  onDonate={(amount) => {
                    console.log(`Donated $${amount} to ${video.creator.username}`);
                  }}
                />
              </div>
            </main>
          </div>
        ))}
      </div>
    </>
  );
}
