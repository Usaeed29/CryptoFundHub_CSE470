import Link from "next/link";

type HeroProps = {
  walletAddress: string;
};

export default function Hero({ walletAddress }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center relative z-10">
        {/* Animated Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
          Welcome to CryptoFundHub
        </h1>

        {/* Animated Subheading */}
        <p className="text-lg md:text-2xl mb-12 animate-fade-up delay-200">
          Start or support your favorite crowdfunding campaigns with crypto.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {/* Dashboard Button */}
          <Link
            href={`/dashboard/${walletAddress}`}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            Create Campaign
          </Link>

          {/* Explore Button */}
          <Link
            href="/explore"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            Explore Campaigns
          </Link>
        </div>
      </div>

      {/* Optional subtle background shapes */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-white/10 rounded-full translate-x-1/2 translate-y-1/3 blur-3xl pointer-events-none"></div>

      {/* Add Tailwind animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate-fade-up.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}
