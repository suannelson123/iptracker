import { ChevronRightIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useRef, useState } from "react";
import { ApiContext } from "../../ContextApi/IpAddressProvider";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  const { data, setNewIpAddress } = useContext(ApiContext);
  const [searchInput, setSearchInput] = useState("");

  const onSubmit = (e) => {
    if (!searchInput.trim()) return;
    e.preventDefault();
    console.log("invoked");

    setNewIpAddress(searchInput);
  };

  return (
    <header
      id="header"
      className="bg-patternMobile bg-no-repeat bg-center bg-cover w-full p-5 relative"
    >
      <div>
        <h1 className="text-secondary text-center text-[1.6rem] my-5">
          IP Address Tracker
        </h1>

        {/* Search Form */}
        <form
          onSubmit={onSubmit}
          className="flex relative h-full w-full mb-32"
          noValidate
        >
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-6 rounded-lg"
            type="text"
            placeholder="Search for any IP address"
            maxLength={25}
            aria-label="IP Address Search"
          />
          <div className="absolute h-full right-[0.5px]">
            <Button
              className="h-full rounded-lg rounded-l-none"
              aria-label="Search"
              disabled={!searchInput.trim()}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </form>

        {/* Info Display */}
        <div className="absolute top-[100%] translate-y-[-35%] left-[50%] -translate-x-[50%] bg-secondary rounded-2xl w-[90%] p-5 text-center flex flex-col gap-5 z-50 lg:flex-row lg:justify-between lg:p-10">
          <div className="border-r border-r-black pr-5">
            <span className="text-[0.8rem] font-semibold text-vDark">
              IP ADDRESS
            </span>
            <p className="text-[1.5rem] text-foreground">{data?.ip}</p>
          </div>
          <div className="border-r border-r-black pr-5">
            <span className="text-[0.8rem] font-semibold text-vDark">
              LOCATION
            </span>
            <p className="text-[1.5rem] text-foreground">
              {data?.location?.country}, {data?.location?.lat},{" "}
              {data?.location?.lng}
            </p>
          </div>
          <div className="border-r border-r-black pr-5">
            <span className="text-[0.8rem] font-semibold text-vDark">
              TIMEZONE
            </span>
            <p className="text-[1.5rem] text-foreground">
              {data?.location?.timezone}
            </p>
          </div>
          <div>
            <span className="text-[0.8rem] font-semibold text-vDark">ISP</span>
            <p className="text-[1.5rem] text-foreground">
              {data?.isp || "No ISP"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
