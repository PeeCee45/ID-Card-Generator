"use client";

import { useState, useRef } from "react";
import SignBox from "@component/signBox";
import PassportWithNoise from "@component/passportWithNoise";
import convertHtmlToPng from "@component/html2PNG";
import VisitorNotifier from "@component/visitor";

export default function Home() {
  const [name, setName] = useState("")
  const [addr, setAddr] = useState("")
  const [stateCountry, setStateCountry] = useState("")
  const [licenceNo, setLicenceNo] = useState("")
  const [licenceClass, setLicenceClass] = useState("")
  const [donor, setDonor] = useState("")
  const [DOB, setDOB] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cardNo, setCardNo] = useState("")
  const [passport, setPassport] = useState<File |null>(null)
  const [signature, setSignature] = useState<string | null>(null);

  const readyDiv = useRef<HTMLDivElement | null>(null);

  const handleExport = async () => {
    await convertHtmlToPng(readyDiv.current);
  };


  VisitorNotifier();

  return (
    <div className="bg-black w-screen h-screen flex max-md:flex-col justify-center items-center max-md:justify-start  max-md:overflow-y-auto">
      <div className="w-1/2 max-md:w-full h-screen max-md:min-h-screen overflow-y-auto flex flex-col items-center items-center py-10">
        <div className="w-[90%] mx-auto p-6 bg-white text-gray-800 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Citizen Info</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="JOHN DOE"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={name}
                onChange={(e)=>{setName((e.target.value).toUpperCase())}}
                />
            </div>

            {/* State / Country */}
            <div>
              <input
                type="text"
                placeholder="New South Wales, Australia"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={stateCountry}
                onChange={(e)=>{setStateCountry((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                placeholder="123 Anywhere St, Winterfell NSW 2000"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={addr}
                onChange={(e)=>{setAddr((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Licence No */}
            <div>
              <input
                type="text"
                placeholder="Licence No: 12345678"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={licenceNo}
                onChange={(e)=>{setLicenceNo((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Donor */}
            <div>
              <input
                type="text"
                placeholder="Donor: A"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={donor}
                onChange={(e)=>{setDonor((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Licence Class */}
            <div>
              <input
                type="text"
                placeholder="Licence Class: C"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={licenceClass}
                onChange={(e)=>{setLicenceClass((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <input
                type="text"
                placeholder="Date of Birth: 16 OCT 2026"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={DOB}
                onChange={(e)=>{setDOB((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <input
                type="text"
                placeholder="Expiry Date: 16 OCT 2026"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={expiry}
                onChange={(e)=>{setExpiry((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Card Number */}
            <div>
              <input
                type="text"
                placeholder="Card Number: 1 123 123 213"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                // value={passport}
                onChange={(e)=>{setCardNo((e.target.value).toUpperCase())}}
              />
            </div>

            {/* Passport */}
            <div>
              <input
                accept="image/*,.pdf"
                type="file"
                placeholder="Upload your passport"
                className="w-full px-4 py-2 font-medium text-[10pt] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setPassport(e.target.files[0]);
                }}

              />
            </div>

            {/* Signature */}
            <div >
              <hr className="mb-10"/>
              <h2 className="text-[11pt] font-semibold">Signature</h2>
              <span className="text-[9pt] font-medium">Sign on the white board below</span>
              <SignBox onExport={setSignature} />
            </div>

            <button
              className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={handleExport}
            >
              Generate & Download
            </button>
          </div>
        </div>

      </div>
      <div className="w-1/2 max-md:w-full  overflow text-black flex items-center justify-center">
          <div ref={readyDiv} className="w-[360px] h-[498px] bg-white relative">
              <img src="/bg.png" className="absolute w-full h-auto" draggable="false"/>
              <div className="absolute top-0 left-0">

                  <div className="absolute w-[62px] h-[80px] top-[254px] left-[40px] rotate-[-1deg] ">
                    <PassportWithNoise passport={passport} width={62} height={80} noiseOpacity={0.3} passportOpacity={0.5} />
                  </div>


                  <div className="absolute w-[62px] h-[80px] mt-[310px] ml-[40px] rotate-[-1deg]">
                    <img src={signature ?? undefined} className="w-full h-auto" draggable="false"/>
                  </div>
                  
                  
                  <div
                    className="absolute w-[89px] h-[114px] mt-[221px] ml-[240px] rotate-[-1deg]"
                  >
                    <PassportWithNoise passport={passport} width={89} height={114} noiseOpacity={1} passportOpacity={0.9}/>
                  </div>



                  <label className="absolute w-[220px] text-nowrap mt-[180px] ml-[70px] rotate-[-1.4deg] text-center font-bold text-[7.7pt]">{stateCountry || "New South Wales, Australia"}</label>

                  <label className="absolute w-[115px] leading-none text-wrap mt-[200px] ml-[36px] rotate-[-1deg] font-bold text-[8pt]">{name || "JOHN DOE"}</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[236px] ml-[36px] rotate-[-1deg] font-bold text-[7.4pt]">{addr || "123 ANYWHERE STR WINTERFELL NSW 2000"}</label>

                  <label className="absolute w-[115px] leading-none text-wrap mt-[270px] ml-[36px] rotate-[-1deg] font-bold text-[5.8pt]">Licence No</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[277px] ml-[36px] rotate-[-1deg] font-bold text-[7.7pt]">{licenceNo || "12345678"}</label>
                  
                  <label className="absolute w-[115px] leading-none text-wrap mt-[269px] ml-[116px] rotate-[-1deg] font-bold text-[5.8pt]">Donor</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[277px] ml-[116px] rotate-[-1deg] font-bold text-[7.7pt]">{donor || "A"}</label>
                  
                  <label className="absolute w-[115px] leading-none text-wrap mt-[293px] ml-[37px] rotate-[-1deg] font-bold text-[5.8pt]">Licence className</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[300px] ml-[37px] rotate-[-1deg] font-bold text-[7.7pt]">{licenceClass || "C"}</label>

                  <label className="absolute w-[115px] leading-none text-wrap mt-[330px] ml-[171px] rotate-[-1deg] font-bold text-[5.8pt]">Date of Birth</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[337px] ml-[171px] rotate-[-1deg] font-bold text-[7.7pt]">{DOB || "16 OCT 2026"}</label>
                  

                  <label className="absolute w-[115px] leading-none text-wrap mt-[330.6px] ml-[212px] rotate-[-1deg] text-right font-bold text-[5.8pt]">Expiry Date</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[337px] ml-[213px] rotate-[-1deg] text-right font-bold text-[7.7pt]">{expiry || "16 OCT 2026"}</label>
                  
                  <label className="absolute w-[115px] leading-none text-wrap mt-[198px] ml-[209px] rotate-[-1deg] text-right font-bold text-[5.8pt]">Card Number</label>
                  <label className="absolute w-[115px] leading-none text-wrap mt-[205px] ml-[209px] rotate-[-1deg] text-right font-bold text-[7.3pt]">{cardNo || "1 123 123 213"}</label>
              </div>
          </div>
      </div>
    </div>
  );
}
