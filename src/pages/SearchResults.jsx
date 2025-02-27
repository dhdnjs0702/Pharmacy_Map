import React from "react";
import CompNavBar from "../common/CompNavBar";
import CompSearchBar from "../common/CompSearchBar";
import KakaoMap from "../components/KakaoMap";
import "../index.css";
import { Button, Typography, Input, Textarea } from "@material-tailwind/react";

const SearchResults = () => {
  return (
    <div>
      <CompNavBar />
      <CompSearchBar />
      <div className="flex">

        {/* 왼쪽 패널: Contact Form */}
        <div className="w-1/3 p-4 bg-white shadow-md">
          <div className="flex items-center justify-between px-4 pb-2">
            <Typography variant="h5" color="blue-gray">
              Contact Us
            </Typography>
            {/* 닫기 아이콘은 고정 패널에서는 필요 없으므로 제거할 수 있습니다. */}
          </div>

          <div className="mb-5 px-4">
            <Typography variant="small" color="gray" className="font-normal">
              Write the message and then click the button.
            </Typography>
          </div>

          <form className="flex flex-col gap-6 p-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input type="email" label="Email" />
            <Input label="Subject" />
            <Textarea rows={6} label="Message" />
            <Button>Send Message</Button>
          </form>
        </div>
          <KakaoMap />
        </div>
      </div>
  );
};

export default SearchResults;
