// import React from "react";

// const MyLoadingAnimation = () => {
//   return (
//     <div className="flex justify-center">
//       <div className="w-16 h-16 mb-8 border-t-4 border-solid rounded-full border-primary animate-spin"></div>
//     </div>
//   );
// };

// export default MyLoadingAnimation;
"use client";
import Lottie from "lottie-react";
import animationData from "@/animations/loading-animation2.json";
export default function MyLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Lottie
        animationData={animationData}
        className="flex items-center justify-center"
        loop={true}
      />
    </div>
  );
}
