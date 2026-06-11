import { Link } from "react-router-dom";
import logoLight from "../assets/images/logo-aaa-omega-light.png";


const navLinks = [
    { label: "หน้าแรก", path: "/" },
    { label: "สินค้า", path: "/allproducts" },
    { label: "บริการ", path: "/services" },
    { label: "ผลงาน", path: "/testimonials" },
    { label: "ติดต่อเรา", path: "/contact" },
];

const legalLinks = [
    "นโยบายคุ้มครองข้อมูลส่วนบุคคล",
    "ข้อกำหนดและเงื่อนไข",
    "การปฏิบัติตามกฎหมาย",
];

function FooterSection() {
    return (
        <footer className="bg-neutral-darker text-neutral-lighter pt-10 pb-6 w-full font-['Kanit']">
            <div className="px-4 sm:px-6 lg:px-20 w-full">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-center mb-10">

                    {/* Logo */}
                    <div className="flex items-center justify-center lg:justify-start">
                        <img src={logoLight} alt="AAA Omega Solar" className="h-10 rounded-none" />
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center justify-center">
                        <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-x-4 gap-y-3 lg:gap-x-8 xl:gap-x-12 text-[14px] font-medium opacity-90">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="hover:text-primary-hover transition-all">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">

<div className="bg-neutral-lighter text-neutral-darker flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow-sm">
                            <i className="material-symbols-outlined text-xl">call</i>
                            <span className="text-sm whitespace-nowrap">02 999 8888</span>
                        </div>

                    </div>
                </div>

                <div className="border-t border-white/5 w-full mb-6"></div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] opacity-40 font-light">

                    <p className="text-center md:text-left">
                        ©AAA Omega Company Limited. All rights reserved.
                    </p>

                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-x-4 gap-y-2 lg:gap-x-10 text-center">
                        {legalLinks.map((link) => (
                            <a key={link} href="#" className="hover:text-neutral-lighter transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default FooterSection;