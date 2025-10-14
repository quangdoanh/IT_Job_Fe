/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { positionList, workingFormList } from "@/config/variable";
import { useRouter, useSearchParams } from "next/navigation"

import { useEffect, useState } from "react";

export const SearchContainer = () => {
    const searchParams = useSearchParams();
    const language = searchParams.get("language") || "";
    const city = searchParams.get("city") || "";
    const company = searchParams.get("company") || "";
    const keyword = searchParams.get("keyword") || "";
    const position = searchParams.get("position") || "";
    const working = searchParams.get("working") || "";
    const [jobList, setJobList] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();


    const route = useRouter();

    useEffect(() => {
        console.log("useEffect chạy với page =", page);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?language=${language}&city=${city}&company=${company}&keyword=${keyword}&position=${position}&working=${working}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.code == "success") {
                    setJobList(data.jobs);
                    setTotalPage(data.totalPage);
                    setTotalRecord(data.totalRecord);
                }
            })
    }, [language, city, company, keyword, position, working, page]);

    console.log(jobList);

    const handleFilterPosition = (event: any) => {
        const value = event.target.value;
        const params = new URLSearchParams(searchParams.toString()); // ấy phần query string rồi tạo một đối tượng URLSearchParams mới từ nó.
        if (value) {
            console.log("chay position:", value);
            params.set("position", value);
        } else {
            params.delete("position");
        }

        route.push(`?${params.toString()}`);
    }
    const handleFilterWorkingForm = (event: any) => {
        const value = event.target.value;
        const params = new URLSearchParams(searchParams.toString()); // ấy phần query string rồi tạo một đối tượng URLSearchParams mới từ nó.
        if (value) {
            params.set("working", value);
        } else {
            params.delete("working");
        }

        route.push(`?${params.toString()}`);
    }
    const handlePagination = (event: any) => {
        console.log("chạy vào dây page", event.target.value)
        const value = event.target.value;
        setPage(parseInt(value));
    }


    return (
        <>
            <div className="container mx-auto px-[16px]">
                {/* tottal ? load trang se day du : load bị thiếu số */}
                {totalRecord && (
                    <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
                        {jobList.length} /
                        {totalRecord} việc làm:
                        <span className="text-[#0088FF] ml-[6px]">
                            {language} {city} {company} {keyword}
                        </span>
                    </h2>
                )}


                <div
                    className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
                    style={{
                        boxShadow: "0px 4px 20px 0px #0000000F"
                    }}
                >
                    <select
                        name=""
                        className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
                        onChange={handleFilterPosition}
                        defaultValue={position}
                    >

                        <option value="">Cấp bậc</option>
                        {positionList.map((item, index) => {
                            return <option key={index} value={item.value}>{item.label}</option>
                        })}
                    </select>
                    <select name=""
                        className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
                        onChange={handleFilterWorkingForm}
                        defaultValue={working}
                    >
                        <option value="">Hình thức làm việc</option>
                        {workingFormList.map((item, index) => {
                            return <option key={index} value={item.value}>{item.label}</option>
                        })}
                    </select>
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                    {jobList.map(item => (
                        <CardJobItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="mt-[30px]">
                    <select
                        name=""
                        className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]"
                        onChange={handlePagination}
                    >
                        {Array(totalPage).fill("").map((item, index) => (
                            <option key={index} value={index + 1}>Trang {index + 1}</option>
                        ))}
                    </select>

                </div>

            </div>
        </>
    )
}
