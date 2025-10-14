/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { Metadata } from "next"
import { FaLocationDot } from "react-icons/fa6"


export const metadata: Metadata = {
  title: "Chi tiết công ty",
  description: "Mô tả trang chi tiết công ty...",
}

export default async function CompanyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/detail/${slug}`)
  const data = await res.json()

  let companyDetail: any = null
  let jobList: any[] = []

  if (data.code === "success") {
    companyDetail = data.companyDetail
    jobList = data.jobList
  }

  return (
    <>
      {companyDetail && (
        <div className="pt-[30px] pb-[60px]">
          <div className="container mx-auto px-[16px]">

            {/* Thông tin công ty */}
            <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
              <div className="w-[100px]">
                <img
                  src={companyDetail.logo}
                  alt={companyDetail.companyName}
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                  {companyDetail.companyName}
                </h1>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> {companyDetail.address}
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="flex flex-col gap-[10px]">
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Mô hình công ty:
                <span className="text-[#121212] ml-[5px]">{companyDetail.companyModel}</span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Quy mô công ty:
                <span className="text-[#121212] ml-[5px]">{companyDetail.companyEmployees}</span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Thời gian làm việc:
                <span className="text-[#121212] ml-[5px]">{companyDetail.workingTime}</span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Làm việc ngoài giờ:
                <span className="text-[#121212] ml-[5px]">{companyDetail.workOvertime}</span>
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
              <h2 className="font-[700] text-[20px] text-[#121212] mb-[10px]">Mô tả chi tiết</h2>
              <div dangerouslySetInnerHTML={{ __html: companyDetail.description }} />
            </div>

            {/* Việc làm */}
            <div className="mt-[30px]">
              <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
                Công ty có {jobList.length} việc làm
              </h2>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                {jobList.map((item: any) => (
                  <CardJobItem key={item.id} item={item} />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
