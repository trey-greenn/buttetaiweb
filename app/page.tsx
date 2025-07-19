'use client';

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function PaperView() {
  return (
    <>
      <Head>
        <title>Newspaper Style Design</title>
        <meta name="viewport" content="width=device-width" />
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic" rel="stylesheet" />
      </Head>

      <div className="bg-[#f9f7f1] text-[#2f2f2f] font-serif min-h-screen">
        {/* Header Section */}
        <div className="text-center relative">
          <div className="relative">
            {/* <div className="relative w-[12%] left-2.5 border-[3px] border-double border-[#2f2f2f] p-[10px_15px] leading-5 inline-block my-0 mx-[50px_0_20px_-360px] md:hidden lg:inline-block">
              <span className="italic">Weatherforcast for the next 24 hours: Plenty of Sunshine</span><br />
              <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
            </div> */}
            <h1 className="font-playfair font-black text-[80px] uppercase inline-block leading-[72px] my-5">Buffetai</h1>
          </div>

          <div className="uppercase border-b-2 border-t-2 border-[#2f2f2f] text-[36px] py-3">Improving Information Diets</div>
        </div>

        {/* Content Section */}
        <div className="text-[0] leading-[0] word-spacing-[-0.31em] inline-block m-[30px_auto_0] w-full ">
          <div className="flex justify-center">
            {/* Column 1 Tooling Section*/}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f] first:border-l-0">
              <div className="text-center">
                <Link href ='/tools'>
                    <h2 className="font-playfair font-normal italic text-[36px] p-[10px_0] block mx-auto">Check Out Our Tools</h2>
                </Link>
                <p className="font-playfair font-bold text-xs p-[10px_0]">by BUFFET AI TEAM</p>
              </div>
              <p className="mt-0 mb-5">Our suite of AI-powered tools is designed to streamline your workflow and enhance productivity. From automated content generation to intelligent data analysis, we provide cutting-edge solutions for modern businesses.</p>
              <figure className="m-[0_0_20px] border-2 border-[#2f2f2f] p-4">
                <div className="text-center mb-2">
                  <h3 className="font-playfair font-bold text-xl uppercase mb-1">SPECIAL OFFER</h3>
                  <p className="font-serif italic text-sm mb-3">Limited Time Only</p>
                </div>
                <div className="relative w-full h-[150px]">
                  <Image 
                    src="/thinker.png" 
                    alt="Personal Newsletter Curation"
                    layout="fill"
                    objectFit="cover"
                    className="sepia-[80%] contrast-100 opacity-80 mix-blend-multiply"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-playfair font-bold text-lg">AI Assistant Agents</h4>
                  <p className="font-serif text-xs mt-1 mb-2">Tailored information delivered to your inbox daily</p>
                  <p className="font-serif text-sm font-bold mt-3">Subscribe Today: $9.99/month</p>
                  <Link href="/pricing" className="inline-block mt-2 border border-[#2f2f2f] px-4 py-1 text-xs font-bold hover:bg-[#2f2f2f] hover:text-[#f9f7f1] transition-colors">
                    SUBSCRIBE NOW
                  </Link>
                </div>
              </figure>
              <p className="mt-0 mb-5">Each tool is carefully crafted with user experience in mind, ensuring intuitive interfaces and powerful functionality. Whether you're a content creator, marketer, or business analyst, our tools adapt to your specific needs and help you achieve better results in less time.</p>
            </div>

            {/* Column 2 About Section*/}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <Link href='/about'>
                    <h2 className="font-playfair font-normal text-[42px] uppercase italic p-[10px_0] block mx-auto">What are we about?</h2>
                </Link>
                <p className="font-playfair font-normal text-lg p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[13px] after:block after:mx-auto">Innovation through AI</p>
              </div>
              <p className="mt-0 mb-5">At Buffet AI, we're committed to democratizing artificial intelligence and making advanced tools accessible to everyone. Our mission is to empower individuals and businesses with technology that simplifies complex tasks and unlocks new possibilities.</p>
              
             

              <p className="mt-0 mb-5">Founded by a team of AI enthusiasts and industry experts, we combine technical expertise with a deep understanding of real-world business challenges. Our approach focuses on creating practical solutions that deliver tangible results, whether you're looking to automate routine tasks or gain deeper insights from your data.</p>

              <p className="mt-0 mb-5">Join our growing community of forward-thinking professionals who are leveraging AI to transform their work and achieve more than they thought possible. With Buffet AI, the future of work is here today.</p>
            </div>

            {/* Column 3 Blog Section*/}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <Link href='/blog'>
                <h2 className="font-playfair font-bold text-[30px] uppercase p-[10px_0] block mx-auto">Catch Up With Our Blog!</h2>
                </Link>
                <p className="font-playfair font-normal italic text-[24px] p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[13px] after:block after:mx-auto">Latest insights and updates</p>
              </div>
              <p className="mt-0 mb-5">Stay informed with our latest articles covering AI trends, product updates, and practical tips for maximizing the potential of our tools. Our blog is a valuable resource for anyone interested in the evolving landscape of artificial intelligence.</p>
              <figure className="m-[0_0_20px] border-2 border-[#2f2f2f] p-4">
                <div className="text-center mb-2">
                  <h3 className="font-playfair font-bold text-xl uppercase mb-1">SPECIAL OFFER</h3>
                  <p className="font-serif italic text-sm mb-3">Limited Time Only</p>
                </div>
                <div className="relative w-full h-[150px]">
                  <Image 
                    src="/thinker.png" 
                    alt="Personal Newsletter Curation"
                    layout="fill"
                    objectFit="cover"
                    className="sepia-[80%] contrast-100 opacity-80 mix-blend-multiply"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-playfair font-bold text-lg">PERSONAL NEWSLETTER CURATION</h4>
                  <p className="font-serif text-xs mt-1 mb-2">Tailored information delivered to your inbox daily</p>
                  <p className="font-serif text-sm font-bold mt-3">Subscribe Today: $9.99/month</p>
                  <Link href="/pricing" className="inline-block mt-2 border border-[#2f2f2f] px-4 py-1 text-xs font-bold hover:bg-[#2f2f2f] hover:text-[#f9f7f1] transition-colors">
                    SUBSCRIBE NOW
                  </Link>
                </div>
              </figure>
              
              <p className="mt-0 mb-5">Our team of experts regularly publishes in-depth analyses and case studies that showcase the real-world impact of AI technologies. 
                <span className="font-playfair text-[36px] leading-[44px] text-center font-normal block my-10 mx-0 before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-4 before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-4 after:block after:mx-auto">
                  "AI is not just about automation, but augmentation of human potential."
                </span> 
                Whether you're a beginner looking to understand the basics or an experienced professional seeking advanced insights, our blog provides valuable content tailored to different knowledge levels and interests.
              </p>
              
              <p className="mt-0 mb-5">Subscribe to our newsletter to receive the latest articles directly in your inbox and join the conversation by sharing your thoughts and experiences in the comments section of each post.</p>
            </div>

                        {/* Column 4 Pricing */}
                        <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <Link href='/pricing'>
                <h2 className="font-playfair font-normal italic text-[36px] p-[10px_0] block mx-auto">Pricing of Services</h2>
                </Link>
                <p className="font-playfair font-bold text-xs p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[10px] after:block after:mx-auto">Flexible plans for every need</p>
              </div>
              
              <h3 className="font-playfair font-bold text-base uppercase mt-4 mb-2 border-b border-[#2f2f2f] pb-1">OUR TOOLS</h3>
              <ul className="list-disc pl-5 mb-5">
                <li className="mb-2">Newsletter Curation — AI-powered content selection tailored to your interests</li>
                <li className="mb-2">Letter Generator — Create professional correspondence with a few clicks</li>
                <li className="mb-2">Image Generation — Convert text descriptions into stunning visuals</li>
                <li className="mb-2">Search Summarizer — Extract key insights from multiple sources instantly</li>
                <li className="mb-2">Document Analysis — Uncover patterns and insights from your documents</li>
              </ul>
              
              <h3 className="font-playfair font-bold text-base uppercase mt-4 mb-2 border-b border-[#2f2f2f] pb-1">PRICING MODELS</h3>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  <span className="font-bold">Free Tier</span> — Basic access to all tools with limited usage
                </li>
                <li className="mb-2">
                  <span className="font-bold">Standard ($9.99/month)</span> — Increased limits, priority processing
                </li>
                <li className="mb-2">
                  <span className="font-bold">Pro ($24.99/month)</span> — Unlimited usage, premium features, API access
                </li>
                <li className="mb-2">
                  <span className="font-bold">Enterprise</span> — Custom solutions, dedicated support, volume discounts
                </li>
              </ul>
              
              <div className="text-center mt-4">
                <Link href="/pricing" className="inline-block border-2 border-double border-[#2f2f2f] px-4 py-2 text-xs font-bold hover:bg-[#2f2f2f] hover:text-[#f9f7f1] transition-colors">
                  VIEW FULL PRICING DETAILS
                </Link>
              </div>
            </div>

            {/* Column 5 Followers */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700">
              <div className="text-center">
                <Link href='/follow'>
                    <h2 className="font-playfair font-bold text-[30px] uppercase p-[10px_0] block mx-auto">Join Our Community!</h2>
                </Link>
                <p className="font-playfair font-bold text-xs p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[10px] after:block after:mx-auto">CONNECT AND COLLABORATE</p>
              </div>
              <p className="mt-0 mb-5">Become part of our growing community of AI enthusiasts, developers, and business professionals. Share ideas, get support, and collaborate on projects with like-minded individuals who are passionate about leveraging technology to solve real-world problems.</p>
              <figure className="m-[0_0_20px] border-2 border-[#2f2f2f] p-4">
                <div className="text-center mb-2">
                  <h3 className="font-playfair font-bold text-xl uppercase mb-1">SPECIAL OFFER</h3>
                  <p className="font-serif italic text-sm mb-3">Limited Time Only</p>
                </div>
                <div className="relative w-full h-[150px]">
                  <Image 
                    src="/thinker.png" 
                    alt="Personal Newsletter Curation"
                    layout="fill"
                    objectFit="cover"
                    className="sepia-[80%] contrast-100 opacity-80 mix-blend-multiply"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-playfair font-bold text-lg">Image Generation</h4>
                  <p className="font-serif text-xs mt-1 mb-2">Generate AI conscripted images in an instance</p>
                  <p className="font-serif text-sm font-bold mt-3">Subscribe Today: $9.99/month</p>
                  <Link href="/pricing" className="inline-block mt-2 border border-[#2f2f2f] px-4 py-1 text-xs font-bold hover:bg-[#2f2f2f] hover:text-[#f9f7f1] transition-colors">
                    SUBSCRIBE NOW
                  </Link>
                </div>
              </figure>
              <p className="mt-0 mb-5">Follow us on social media for the latest updates, join our forums to participate in discussions, and attend our regular webinars and virtual events to deepen your understanding of AI applications. Our community is a vibrant ecosystem where knowledge sharing and mutual support drive innovation and growth for everyone involved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}