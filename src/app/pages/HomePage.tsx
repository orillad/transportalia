import { Header } from '../components/Header';
import imgBg1 from '../../assets/backgrounds/home-hero.png';
import imgLogoGran from '../../assets/logos/image.png';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[724px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgBg1}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Play button icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[180px] h-[180px] rounded-full bg-[#FC8D24]/30 flex items-center justify-center">
            <div className="w-[125px] h-[125px] rounded-full bg-[#FC8D24]/50 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-[#FB8D24] border-b-[20px] border-b-transparent ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="mx-auto w-full max-w-[560px]">
            <img
              src={imgLogoGran}
              alt="TRANSPORTALIA"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="text-[32px] leading-normal text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat
            semper mi at ultricies. In congue bibendum felis, non faucibus libero
            varius nec. Proin vel tempor turpis. Sed magna lorem, rhoncus et egestas
            ut, pellentesque ut massa. Nunc et nisl metus. Praesent mollis
            facilisis ante. Ut fringilla tristique tempus.
          </div>
        </div>
      </div>
    </div>
  );
}
