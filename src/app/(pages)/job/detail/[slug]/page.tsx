/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { positionList, workingFormList } from "@/config/variable";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowRightLong, FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6";
import { FormApply } from "./FormApply"

export const metadata: Metadata = {
  title: "Chi tiết công việc | IT Jobs",
  description: "Mô tả trang chi tiết công việc...",
};

export default async function JobDetailPage({ params }: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/detail/${slug}`);
  const data = await res.json();

  let jobDetail: any = null;

  if (data.code === "success") {
    jobDetail = data.jobDetail;
    jobDetail.position = positionList.find(item => item.value === jobDetail.position)?.label;
    jobDetail.workingForm = workingFormList.find(item => item.value === jobDetail.workingForm)?.label;
  }

  if (!jobDetail) return <div className="p-10 text-center text-gray-600">Không tìm thấy công việc</div>;

  return (
    <div className="pt-[30px] pb-[60px]">
      <div className="container mx-auto px-[16px]">
        <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
          <h1 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[10px]">
            {jobDetail.title}
          </h1>
          <div className="font-[400] text-[16px] text-[#414042] mb-[10px]">
            {jobDetail.companyName}
          </div>
          <div className="font-[700] text-[20px] text-[#0088FF] sm:mb-[20px] mb-[10px]">
            {jobDetail.salaryMin.toLocaleString("vi-VN")}$ - {jobDetail.salaryMax.toLocaleString("vi-VN")}$
          </div>

          <Link href="#form-apply" className="bg-[#0088FF] rounded-[4px] font-[700] text-[16px] text-white flex items-center justify-center h-[48px] mb-[20px]">
            Ứng tuyển
          </Link>

          {/* Hình ảnh */}
          <div className="grid grid-cols-3 sm:gap-[16px] gap-[8px] mb-[20px]">
            {jobDetail.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt=""
                className="aspect-[232/145] object-cover rounded-[4px] w-full"
              />
            ))}
          </div>

          {/* Thông tin */}
          <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
            <FaUserTie className="text-[16px]" /> {jobDetail.position}
          </div>
          <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
            <FaBriefcase className="text-[16px]" /> {jobDetail.workingForm}
          </div>
          <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
            <FaLocationDot className="text-[16px]" /> {jobDetail.companyAddress}
          </div>

          {/* Kỹ năng */}
          <div className="flex flex-wrap gap-[8px]">
            {jobDetail.technologies.map((itemTech: string, indexTech: number) => (
              <div
                key={indexTech}
                className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px]"
              >
                {itemTech}
              </div>
            ))}
          </div>
        </div>

        {/* Mô tả */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
          <h2 className="font-[700] text-[20px] mb-[10px]">Mô tả chi tiết</h2>
          <div dangerouslySetInnerHTML={{ __html: jobDetail.description }} />
        </div>

        {/* Form ứng tuyển */}
        <div id="form-apply" className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
          <h2 className="font-[700] text-[20px] text-black mb-[20px]">
            Ứng tuyển ngay
          </h2>
          <FormApply jobId={jobDetail.id} />
        </div>


        {/* Công ty */}
        <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px] flex gap-[12px]">
          <div className="w-[100px]">
            <img
              src={jobDetail.companyLogo}
              alt={jobDetail.companyName}
              className="aspect-square object-cover rounded-[4px]"
            />
          </div>
          <div className="flex-1">
            <div className="font-[700] text-[18px] text-[#121212] mb-[10px]">
              {jobDetail.companyName}
            </div>
            <Link href={`/company/detail/${jobDetail.companyId}`} className="flex items-center gap-[8px] font-[400] text-[16px] text-[#0088FF]">
              Xem công ty <FaArrowRightLong />
            </Link>
            <div className="mt-[10px]">
              <p><strong>Mô hình công ty:</strong> {jobDetail.companyModel}</p>
              <p><strong>Quy mô:</strong> {jobDetail.companyEmployees}</p>
              <p><strong>Thời gian làm việc:</strong> {jobDetail.companyWorkingTime}</p>
              <p><strong>Làm việc ngoài giờ:</strong> {jobDetail.companyWorkOvertime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
