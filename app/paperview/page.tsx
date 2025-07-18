'use client';

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

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
            <div className="relative w-[12%] left-2.5 border-[3px] border-double border-[#2f2f2f] p-[10px_15px] leading-5 inline-block my-0 mx-[50px_0_20px_-360px] md:hidden lg:inline-block">
              <span className="italic">Weatherforcast for the next 24 hours: Plenty of Sunshine</span><br />
              <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
            </div>
            <h1 className="font-playfair font-black text-[80px] uppercase inline-block leading-[72px] mb-5">Newpost York</h1>
          </div>

          <div className="uppercase border-b-2 border-t-2 border-[#2f2f2f] py-3">York, MA - Thursday August 30, 1978 - Seven Pages</div>
        </div>

        {/* Content Section */}
        <div className="text-[0] leading-[0] word-spacing-[-0.31em] inline-block m-[30px_2%_0]">
          <div className="flex flex-wrap">
            {/* Column 1 */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f] first:border-l-0">
              <div className="text-center">
                <h2 className="font-playfair font-normal italic text-[36px] p-[10px_0] block mx-auto">When darkness overspreads my eyes</h2>
                <p className="font-playfair font-bold text-xs p-[10px_0]">by JOHANN WOLFGANG VON GOETHE</p>
              </div>
              <p className="mt-0 mb-5">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream;</p>
              <p className="mt-0 mb-5">and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!</p>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <h2 className="font-playfair font-normal text-[42px] uppercase italic p-[10px_0] block mx-auto">Give people courage</h2>
                <p className="font-playfair font-normal text-lg p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[13px] after:block after:mx-auto">The crowd seemed to grow</p>
              </div>
              <p className="mt-0 mb-5">The sunset faded to twilight before anything further happened. The crowd far away on the left, towards Woking, seemed to grow, and I heard now a faint murmur from it. The little knot of people towards Chobham dispersed. There was scarcely an intimation of movement from the pit.</p>
              
              <figure className="m-[0_0_20px]">
                <div className="relative w-full h-[150px]">
                  <Image 
                    src="/thinker.png" 
                    alt="Hermine hoping for courage"
                    layout="fill"
                    objectFit="cover"
                    className="sepia-[80%] contrast-100 opacity-80 mix-blend-multiply"
                  />
                </div>
                <figcaption className="italic text-xs">Hermine hoping for courage.</figcaption>
              </figure>

              <p className="mt-0 mb-5">It was this, as much as anything, that gave people courage, and I suppose the new arrivals from Woking also helped to restore confidence. At any rate, as the dusk came on a slow, intermittent movement upon the sand pits began, a movement that seemed to gather force as the stillness of the evening about the cylinder remained unbroken. Vertical black figures in twos and threes would advance, stop, watch, and advance again, spreading out as they did so in a thin irregular crescent that promised to enclose the pit in its attenuated horns. I, too, on my side began to move towards the pit.</p>

              <p className="mt-0 mb-5">Then I saw some cabmen and others had walked boldly into the sand pits, and heard the clatter of hoofs and the gride of wheels. I saw a lad trundling off the barrow of apples. And then, within thirty yards of the pit, advancing from the direction of Horsell, I noted a little black knot of men, the foremost of whom was waving a white flag.</p>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <h2 className="font-playfair font-bold text-[30px] uppercase p-[10px_0] block mx-auto">May the Force be with you</h2>
                <p className="font-playfair font-normal italic text-[24px] p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[13px] after:block after:mx-auto">Let go your conscious self and act on instinct</p>
              </div>
              <p className="mt-0 mb-5">Partially, but it also obeys your commands. Hey, Luke! May the Force be with you. I have traced the Rebel spies to her. Now she is my only link to finding their secret base.</p>
              
              <figure className="m-[0_0_20px]">
                <div className="relative w-full h-[150px]">
                  <Image 
                    src="/thinker.png" 
                    alt="This time, let go your conscious self and act on instinct."
                    layout="fill"
                    objectFit="cover"
                    className="sepia-[80%] contrast-100 opacity-80 mix-blend-multiply"
                  />
                </div>
                <figcaption className="italic text-xs">"This time, let go your conscious self and act on instinct."</figcaption>
              </figure>
              
              <p className="mt-0 mb-5">Leave that to me. Send a distress signal, and inform the Senate that all on board were killed. 
                <span className="font-playfair text-[36px] leading-[44px] text-center font-normal block my-10 mx-0 before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-4 before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-4 after:block after:mx-auto">
                  "Don't under­estimate the Force. I suggest you try it again, Luke."
                </span> 
                This time, let go your conscious self and act on instinct. In my experience, there is no such thing as luck. You're all clear, kid. Let's blow this thing and go home!
              </p>
              
              <p className="mt-0 mb-5">You don't believe in the Force, do you? Partially, but it also obeys your commands. The plans you refer to will soon be back in our hands. As you wish.</p>
            </div>

            {/* Column 4 */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700 border-r border-[#2f2f2f]">
              <div className="text-center">
                <h2 className="font-playfair font-normal italic text-[36px] p-[10px_0] block mx-auto">The buzz of the little world</h2>
                <p className="font-playfair font-bold text-xs p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[10px] after:block after:mx-auto">A thousand unknown plants</p>
              </div>
              <p className="mt-0 mb-5">I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath</p>
            </div>

            {/* Column 5 */}
            <div className="w-full md:w-[47%] lg:w-[31%] xl:w-[17.5%] text-sm leading-5 inline-block p-[0_1%] align-top mb-[50px] transition-all duration-700">
              <div className="text-center">
                <h2 className="font-playfair font-bold text-[30px] uppercase p-[10px_0] block mx-auto">It wasn't a dream</h2>
                <p className="font-playfair font-bold text-xs p-[10px_0] before:border-t before:border-[#2f2f2f] before:content-[''] before:w-[100px] before:h-[7px] before:block before:mx-auto after:border-b after:border-[#2f2f2f] after:content-[''] after:w-[100px] after:h-[10px] after:block after:mx-auto">by FRANZ KAFKA</p>
              </div>
              <p className="mt-0 mb-5">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
              
              <p className="mt-0 mb-5">His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}