'use client';

import Link from 'next/link';

export default function Header() {
  const currentUser = {
    username: 'you',
    avatar: 'https://i.pravatar.cc/150?img=68',
    followers: 5000,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-[#0f0f0f] px-4 sm:px-6">
      {/* Left Section - Menu & Logo */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-white flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg className="h-8 w-8 text-[#ff0000] flex-shrink-0" fill="currentColor" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.324 3.125c-.324-.913-.88-1.72-1.668-2.316C23.96 0 14 0 14 0S4.039 0 2.344.809c-.788.596-1.344 1.403-1.668 2.316C0 4.417 0 10 0 10s0 5.583.676 6.875c.324.913.88 1.72 1.668 2.316C4.04 20 14 20 14 20s9.961 0 11.656-.809c.788-.596 1.344-1.403 1.668-2.316C28 15.583 28 10 28 10s0-5.583-.676-6.875ZM11.2 14.286V5.714L18.4 10l-7.2 4.286Z"></path>
          </svg>
          <h1 className="text-2xl font-bold tracking-tighter text-white">Streamify</h1>
        </Link>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex flex-1 justify-center px-4 lg:px-16">
        <div className="w-full max-w-2xl">
          <form className="flex w-full items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="h-10 w-full rounded-l-full border border-[#222222] bg-[#222222] pl-4 pr-4 text-white placeholder:text-[#aaaaaa] focus:border-[#ff0000] focus:outline-none"
              />
            </div>
            <button className="h-10 flex-shrink-0 rounded-r-full border border-[#222222] bg-white/[.15] px-6 text-white transition-colors hover:bg-white/[.25] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - User Actions */}
      <div className="flex items-center justify-end gap-2 sm:gap-4">
        <button className="p-2 text-white flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">videocam</span>
        </button>
        <button className="p-2 text-white flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
        <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
      </div>
    </header>
  );
}
