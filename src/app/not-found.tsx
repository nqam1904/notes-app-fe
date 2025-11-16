import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - Notes',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <h1 className="text-[8rem] m-0 font-black bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-none animate-[fadeInDown_0.6s_ease-out] md:text-[5rem]">404</h1>
      <h2 className="text-[2rem] my-8 mb-4 font-semibold text-[#2d3748] animate-fadeIn md:text-2xl">Page Not Found</h2>
      <p className="text-lg text-[#718096] mb-12 max-w-[400px] animate-fadeIn md:text-base md:mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/notes" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl no-underline font-semibold text-base transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.4)] animate-[fadeInUp_1.2s_ease-out] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)] active:translate-y-0 md:px-7 md:py-3.5 md:text-[0.9375rem]">
        Go to Notes
      </Link>
    </div>
  );
}
