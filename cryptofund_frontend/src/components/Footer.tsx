// src/components/Footer.tsx
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">CryptoFundHub</h2>
            <p className="text-gray-400 max-w-sm">
              Crowdfunding made easy with crypto. Start, support, and track campaigns seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold text-white mb-2">Explore</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/explore" className="hover:text-white transition">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/create-campaign" className="hover:text-white transition">
                    Create Campaign
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Connect</h3>
              <ul className="flex gap-4">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    <FaTwitter size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    <FaGithub size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    <FaLinkedin size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CryptoFundHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
