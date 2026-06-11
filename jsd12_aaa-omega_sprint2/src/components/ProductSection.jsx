import { useState } from "react";
import product001 from "../assets/images/product-001.png";
import product002 from "../assets/images/product-002.png";
import product003 from "../assets/images/product-003.png";
import product004 from "../assets/images/product-004.png";
import product005 from "../assets/images/product-005.png";
import product006 from "../assets/images/product-006.png";
import product007 from "../assets/images/product-007.png";
import product008 from "../assets/images/product-008.png";

const products = [
    { id: 1, image: product001, category: "อินเวอร์เตอร์", name: "Smart Energy Controller" },
    { id: 2, image: product002, category: "ระบบกักเก็บพลังงาน", name: "Smart String Energy Storage System" },
    { id: 3, image: product003, category: "ออฟติไมเซอร์", name: "Smart Module Controller" },
    { id: 4, image: product004, category: "ระบบกักเก็บพลังงาน", name: "Smart String Energy Storage System" },
    { id: 5, image: product005, category: "เครื่องชารจ์รถ EV", name: "Smart Charger" },
    { id: 6, image: product006, category: "อุปกรณ์เสริม", name: "Smart Power Sensor" },
    { id: 7, image: product007, category: "อุปกรณ์เสริม", name: "Smart Power Sensor" },
    { id: 8, image: product008, category: "อุปกรณ์เสริม", name: "Smart Dongle 4G" },
];

const tabs = ["บ้านพักอาศัย", "ภาคพาณิชย์และอุตสาหกรรม", "ระดับโรงไฟฟ้า", "ระบบกักเก็บพลังงาน", "ไมโครกริดอัจฉริยะ"];

function ProductSection() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="product" className="py-12 md:py-20 px-4">
            <div className="container mx-auto text-center">

                <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 text-primary-dark">
                    สินค้าและโซลูชัน
                </h1>

                {/* Tabs */}
                <div className="overflow-x-auto pb-2">
                    <div className="inline-flex min-w-max items-center border border-primary-hover rounded-xl p-1 bg-neutral-lighter shadow-sm">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 md:px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                                    ${activeTab === tab
                                        ? "bg-primary-hover text-neutral-lighter"
                                        : "text-neutral-hover hover:bg-neutral-lighter"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col group">
                            <div className="bg-neutral-light p-4 md:p-6 rounded-2xl aspect-square flex items-center justify-center mb-3 md:mb-4 shadow-sm group-hover:shadow-md transition">
                                <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                            </div>
                            <div className="space-y-1 px-1">
                                <p className="text-xs md:text-sm text-neutral-base font-light">
                                    {product.category}
                                </p>
                                <h3 className="text-xs sm:text-sm md:text-base font-medium text-neutral-darker leading-snug">
                                    {product.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-10 md:mt-12">
                    <button className="border-2 border-primary-disable text-primary-soft px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium hover:bg-primary-disable hover:text-content-lighter transition-all">
                        ดูสินค้าทั้งหมด
                    </button>
                </div>

            </div>
        </section>
    );
}

export default ProductSection;
