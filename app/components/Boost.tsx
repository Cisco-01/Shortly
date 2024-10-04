"use client";

import Link from "next/link";

export default function Boost() {
  return (
    <section
      className="relative inset-0 bg-purple-900 bg-no-repeat bg-center bg-cover py-16 px-6 md:px-12 lg:px-24"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='250' viewBox='0 0 1440 250' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M830 -63.482C830 19.351 854.36 78.678 944.732 117C1035.1 155.321 1122.42 120.352 1210.01 140.4C1297.6 160.448 1297.6 289.595 1380.09 369.071C1462.57 448.547 1636.49 467.852 1777.91 387.221C1919.32 306.589 1983.43 118.325 1941.17 7.31897C1898.92 -103.687 1817.94 -205 1427.24 -205C1036.53 -205 830 -146.314 830 -63.482ZM-263.351 570.909C-233.666 648.24 -189.662 694.897 -91.561 698.286C6.54102 701.676 75.524 637.739 164.482 625.066C253.44 612.392 299.722 732.961 405.212 777.598C510.7 822.236 679.987 777.931 783.112 651.976C886.24 526.021 878.62 327.29 799.392 238.798C720.162 150.307 608.257 84.743 243.5 224.76C-121.257 364.777 -293.036 493.578 -263.351 570.909ZM-514 -377.482C-514 -294.649 -489.64 -235.322 -399.268 -197C-308.897 -158.679 -221.582 -193.648 -133.991 -173.6C-46.401 -153.552 -46.401 -24.405 36.086 55.071C118.572 134.547 292.491 153.852 433.906 73.221C575.321 -7.41101 639.426 -195.675 597.173 -306.681C554.919 -417.687 473.943 -519 83.236 -519C-307.471 -519 -514 -460.314 -514 -377.482Z' fill='%237e22ce'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-screen-xl mx-auto text-center ">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-8">
          Boost your links today
        </h1>
        <Link href="#urlshortener" passHref>
          <button
            className="btn font-bold py-3 px-6 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#urlshortener");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
