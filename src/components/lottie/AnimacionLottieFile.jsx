import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AnimacionLottieFile = ({ url }) => {
  return (
    <DotLottieReact
      src={url}
      autoplay
      loop
      style={{ height: "120px", margin: "0 auto" }}
    />
  );
};

export default AnimacionLottieFile;
