'use client';

import { useState } from 'react';
import BoostModal from './BoostModal';

interface Creator {
  id: string;
  username: string;
  avatar: string;
  followers: number;
}

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  creator: Creator;
  title: string;
  likes: number;
  comments: number;
  shares: number;
  donations: number;
}

interface DonationButtonProps {
  video: Video;
  onDonate: (amount: number) => void;
}

export default function DonationButton({ video, onDonate }: DonationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBoost = (amount: number, paymentData: any) => {
    // Here you would integrate with Hedera backend
    console.log('Boost initiated:', {
      amount,
      creator: video.creator.username,
      paymentData: {
        email: paymentData.email,
        // Don't log sensitive card data
      },
    });
    
    // Call the onDonate callback
    onDonate(amount);
  };

  return (
    <>
      {/* Main Boost Button - Premium styling for great income */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-9 md:h-12 w-full rounded-full bg-gradient-to-r from-[#ff6b00] via-[#ff0000] to-[#cc0000] px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-bold text-white hover:from-[#ff8b00] hover:via-[#ff3333] hover:to-[#ff0000] transition-all shadow-lg shadow-[#ff0000]/50 hover:shadow-[#ff0000]/70 hover:scale-105 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-sm md:text-base">stars</span>
          <span>Boost</span>
        </span>
      </button>

      {/* Boost Modal */}
      <BoostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        creator={video.creator}
        onBoost={handleBoost}
      />
    </>
  );
}

