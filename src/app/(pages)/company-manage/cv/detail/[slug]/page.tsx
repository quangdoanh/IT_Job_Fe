/* eslint-disable @typescript-eslint/no-explicit-any */
import { positionList, workingFormList } from "@/config/variable"
import { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"

export const metadata: Metadata = {
  description: "Mô tả trang chi tiết CV...",
}

export default async function CompanyManageCVDetailPage({ params }: {
  params: {
    slug: string
  }
}) {
  const { slug } = params;

  const headerList = await headers(); // lấy tất cả HTTP request headers mà người dùng gửi khi truy cập trang. 

  const cookie = headerList.get("cookie");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/detail/${slug}`, {
    headers: {
      cookie: cookie || ""
    },
    cache: "no-store"
  });
  const data = await res.json();

  let infoCV: any = null;
  let infoJob: any = null;
  if (data.code == "success") {
    infoCV = data.infoCV;
    infoJob = data.infoJob;

    infoJob.position = positionList.find(item => item.value == infoJob.position)?.label;
    infoJob.workingForm = workingFormList.find(item => item.value == infoJob.workingForm)?.label;
  }

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Thông tin CV */}
          {infoCV && (
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
              <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
                <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                  Thông tin CV
                </h2>
                <Link href="/company-manage/cv/list" className="font-[400] text-[14px] text-[#0088FF] underline">
                  Quay lại danh sách
                </Link>
              </div>

              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Họ tên:
                <span className="font-[700] ml-[5px]">{infoCV.fullName}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Email:
                <span className="font-[700] ml-[5px]">{infoCV.email}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Số điện thoại:
                <span className="font-[700] ml-[5px]">{infoCV.phone}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                File CV:
              </div>
              <div className="bg-[#D9D9D9] h-[736px]">
                <iframe src={infoCV.fileCV} className="w-full h-full"></iframe>
              </div>
            </div>
          )}

          {/* Thông tin công việc */}
          {infoJob && (
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
              <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black mb-[20px]">
                Thông tin công việc
              </h2>

              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Tên công việc:
                <span className="font-[700] ml-[5px]">{infoJob.title}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Mức lương:
                <span className="font-[700] ml-[5px]">
                  {infoJob.salaryMin.toLocaleString("vi-VN")}$ - {infoJob.salaryMax.toLocaleString("vi-VN")}$
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Cấp bậc:
                <span className="font-[700] ml-[5px]">{infoJob.position}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Hình thức làm việc:
                <span className="font-[700] ml-[5px]">{infoJob.workingForm}</span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Công nghệ:
                <span className="font-[700] ml-[5px]">{infoJob.technologies.join(", ")}</span>
              </div>

              <Link href={`/company-manage/job/edit/${infoJob.id}`} className="font-[400] text-[14px] text-[#0088FF] underline">
                Xem chi tiết công việc
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
