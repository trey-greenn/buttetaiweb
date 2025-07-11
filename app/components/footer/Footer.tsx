import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#f5f0e1] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-[#403d39]">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#403d39]">Leave Feedback:</span>
          <a href="mailto:info@williamtreygreen.com" className="text-[#5e503f] hover:underline">
            info@williamtreygreen.com
          </a>
          <form className="flex items-center">
            <input
              type="text"
              placeholder="Your feedback"
              className="py-2 px-4 rounded-md border border-[#ccc5b9] focus:outline-none focus:border-[#5e503f]"
            />
            <button
              type="submit"
              className="ml-2 py-2 px-4 rounded-md bg-[#5e503f] text-white hover:bg-[#403d39] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}