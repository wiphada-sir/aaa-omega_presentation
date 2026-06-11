import bannerHero from "../assets/images/banner-home-hero.jpg";

function HeroSection() {
    return (
        <section id="hero" className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center text-center px-4">

            <div className="absolute inset-0">
                <img src={bannerHero} alt="Solar Home" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-success-darker/20"></div>
            </div>

            <div className="relative z-10 text-neutral-light max-w-5xl mx-auto">

                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-primary-light">
                    ติดโซลาร์เซลล์บ้าน
                </h2>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-3 md:my-4 leading-tight">
                    ยกระดับบ้านยุคใหม่
                </h1>

                <h2 className="inline-block px-3 py-2 sm:px-4 md:px-6 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-warning-base leading-snug">
                    ด้วยระบบพลังงานอัจฉริยะ
                </h2>

            </div>

        </section>
    );
}

export default HeroSection;