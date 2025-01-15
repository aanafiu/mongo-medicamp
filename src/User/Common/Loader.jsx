import Lottie from "lottie-react";
import loaderLottie from "../../assets/loaderLottie.json"
const Loader = () => {
    return <div className="w-[100%] h-[100%] flex justify-center items-center"><Lottie animationData={loaderLottie} loop={true} width={100} height={100}/></div>

};

export default Loader;