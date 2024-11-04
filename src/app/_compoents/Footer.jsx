import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center gap-4 p-4 rounded-md shadow-md bg-gray-100">
      <div className="flex gap-4">
        <Link href="/about" className="font-medium hover:text-gray-400">
          About Us
        </Link>
        <Link href="/contact" className="font-medium hover:text-gray-400">
          Contact
        </Link>
        <Link href="/privacy-policy" className="font-medium hover:text-gray-400">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="font-medium hover:text-gray-400">
          Terms of Service
        </Link>
        {/* Job Board &copy; 2024 - All rights reserved */}
      </div>
    </footer>
  );
}