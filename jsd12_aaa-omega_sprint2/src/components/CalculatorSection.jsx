import { useState } from "react";
import bannerCalculate from "../assets/images/banner-calculate.jpg";

const RATE_PER_UNIT = 4.5;      // บาท/หน่วย
const PEAK_HOURS = 5;           // ชั่วโมงแดดต่อวัน
const DAYS_PER_MONTH = 30;

const phases = ["1 เฟส", "3 เฟส", "ไม่แน่ใจ"];

function CalculatorSection() {

    const [electricBill, setElectricBill] = useState("");
    const [daytimeUsage, setDaytimeUsage] = useState(50);
    const [selectedPhase, setSelectedPhase] = useState("1 เฟส");
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const bill = parseFloat(electricBill);

        if (!bill || bill <= 0) {
            alert("กรุณากรอกค่าไฟต่อเดือนให้ถูกต้องครับ");
            return;
        }

        if (daytimeUsage <= 0) {
            alert("กรุณาเลือกการใช้ไฟฟ้าช่วงกลางวันมากกว่า 0% ครับ");
            return;
        }

        // คำนวณหน่วยไฟต่อเดือน
        const unitsPerMonth = bill / RATE_PER_UNIT;

        // คำนวณหน่วยที่ใช้กลางวัน
        const daytimeUnits = unitsPerMonth * (daytimeUsage / 100);

        // คำนวณขนาดโซลาร์ที่ต้องการ (kW)
        const solarKW = daytimeUnits / (PEAK_HOURS * DAYS_PER_MONTH);

        // ปัดขึ้นเป็นขนาดมาตรฐาน (ทุก 1 kW)
        const recommendedKW = Math.ceil(solarKW);

        // คำนวณพลังงานที่ผลิตได้จริงต่อเดือน
        const energyProduced = recommendedKW * PEAK_HOURS * DAYS_PER_MONTH;

        // คำนวณเงินที่ประหยัดได้ต่อเดือน
        const savings = Math.round(energyProduced * RATE_PER_UNIT);

        setResult({
            kw: recommendedKW,
            savings: savings.toLocaleString(),
        });
    };

    return (
        <section id="calculate" className="bg-neutral-light py-12 md:py-16">
            <div className="container mx-auto px-4">

                <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16">

                    {/* Left Card */}
                    <div className="w-full sm:w-1/2 lg:w-2/5 rounded-[2rem] overflow-hidden shadow-xl text-content-lighter group relative aspect-[4/5] sm:aspect-auto h-[400px] sm:h-[500px]">

                        <img
                            src={bannerCalculate}
                            alt="บ้านติดแผงโซลาร์เซลล์"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-success-darker/30 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4 md:p-8">

                            <p className="text-base md:text-xl mb-6 md:mb-12 font-light">
                                แพ็กเกจที่เหมาะสม
                            </p>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center border-t border-success-dark/20 pt-6 md:pt-10 w-full justify-center">

                                <div>
                                    <p className="text-xs md:text-sm opacity-70 mb-1 uppercase">
                                        ขนาดโซลาร์เซลล์
                                    </p>
                                    <p className="text-3xl md:text-5xl font-bold">
                                        {result ? result.kw : "-"}{" "}
                                        <span className="text-sm md:text-xl font-normal">kW</span>
                                    </p>
                                </div>

                                <div className="hidden md:block w-[1px] bg-success-dark/20 h-16"></div>

                                <div>
                                    <p className="text-xs md:text-sm opacity-70 mb-1 uppercase">
                                        ประหยัดค่าไฟ
                                    </p>
                                    <p className="text-3xl md:text-5xl font-bold">
                                        {result ? result.savings : "-"}{" "}
                                        <span className="text-sm md:text-xl font-normal">บาท/เดือน</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="w-full sm:w-1/2 lg:w-3/5 space-y-6 md:space-y-8 text-left">

                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-darker">
                            คำนวณแพ็กเกจโซลาร์เซลล์
                        </h2>

                        {/* Input ค่าไฟ */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-sm text-content-base font-medium">
                                ค่าไฟต่อเดือน
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="6000"
                                    value={electricBill}
                                    onChange={(e) => setElectricBill(e.target.value)}
                                    className="w-full p-3 md:p-4 bg-neutral-lighter border border-content-disable rounded-xl shadow-inner focus:ring-2 focus:ring-content-dark/20 outline-none transition-all"
                                />
                                <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-content-soft bg-content-disable px-2 md:px-3 py-1 rounded-md text-xs">
                                    บาท
                                </span>
                            </div>
                        </div>

                        {/* Range การใช้ไฟกลางวัน */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-sm text-content-hover font-medium flex justify-between">
                                <span>การใช้ไฟฟ้าช่วงกลางวัน</span>
                                <span className="text-primary-soft font-bold">{daytimeUsage}%</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="100" step="10"
                                value={daytimeUsage}
                                onChange={(e) => setDaytimeUsage(Number(e.target.value))}
                                className="w-full h-1.5 bg-content-disable rounded-lg appearance-none cursor-pointer accent-primary-soft"
                            />
                            <div className="flex justify-between text-[10px] text-content-soft font-bold">
                                <span>0%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Phase Buttons */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-sm text-content-hover font-medium">
                                ระบบไฟฟ้าภายในบ้าน
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {phases.map((phase) => (
                                    <button
                                        key={phase}
                                        onClick={() => setSelectedPhase(phase)}
                                        className={`bg-neutral-lighter border-2 p-3 rounded-xl text-sm font-bold transition-all
                                            ${selectedPhase === phase
                                                ? "border-primary-disable text-primary-disable"
                                                : "border-transparent hover:border-primary-disable"
                                            }`}
                                    >
                                        {phase}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleCalculate}
                            className="w-full bg-primary-disable text-neutral-lighter py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-primary-hover transition-all"
                        >
                            คำนวณการใช้งาน
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default CalculatorSection;
