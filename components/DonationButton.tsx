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
      {/* Main Boost Button - Red solid button matching design */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-12 w-full rounded-full bg-[#ff0000] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff3333] transition-colors"
      >
        Boost
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

