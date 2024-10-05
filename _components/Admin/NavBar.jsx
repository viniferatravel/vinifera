"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
} from "@nextui-org/react";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Power, IndianRupee } from "lucide-react";
import { button as buttonStyles } from "@nextui-org/theme";

const NavBar = () => {
  const [session, setSession] = useState({});

  let router = useRouter();

  const pathname = usePathname(); // Get the current pathname
  const [activeTab, setActiveTab] = useState("/admin/dashboard"); // Set initial active tab to "Packages"
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]); // Update activeTab whenever the pathname changes

  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, []);

  const profile = (
    <PopoverContent>
      <div>
        <div className="px-1 py-2 flex gap-10 flex-col ">
          {session && session?.user?.user_role === "admin" ? (
            <User
              name={session?.user?.user_id}
              description=""
              avatarProps={{
                src: "https://www.svgrepo.com/show/509009/avatar-thinking-3.svg",
              }}
              className="text-black"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col items-start mr-6">
        <Button
          variant="shadow"
          color="danger"
          size="sm"
          className="left-4 mt-3 mb-3"
          startContent={<Power />}
          onClick={async (e) => {
            try {
              await signOut({ redirect: false });
              setSession(null);
              router.push("/adminlogin");
              window.location.reload();
            } catch (error) {
              console.error("Sign out error:", error);
            }
          }}
        >
          Logout
        </Button>
      </div>
    </PopoverContent>
  );

  return (
    <>
      <div className="sticky top-0 w-full bg-background z-50 ">
        <div className="flex mx-auto items-center justify-between bg-black/30 backdrop-blur-xl py-3  ">
          <div className="flex grow justify-end mx-3 ">
            {session && session?.user?.user_role === "admin" ? (
              session?.user?.user_id === undefined &&
              session?.user?.user_role === undefined ? (
                <Link
                  href="/adminlogin"
                  // onClick = {(e) => signIn()}
                  className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                  })}
                >
                  Login/Sign Up
                </Link>
              ) : (
                <>
                  <div className="flex justify-end">
                    <Link href={`/admin/dashboard`}>
                      <Button
                        style={{
                          color:
                            activeTab === "/admin/dashboard" ? "red" : "white",
                        }}
                        className="bg-transparent font-semibold"
                        onClick={() => setActiveTab("/admin/dashboard")} // Optional: Update state on click
                      >
                        Packages
                      </Button>
                    </Link>
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/admin/category`}>
                      <Button
                        style={{
                          color:
                            activeTab === "/admin/category" ? "red" : "white",
                        }}
                        className="bg-transparent font-semibold"
                        onClick={() => setActiveTab("/admin/category")} // Optional: Update state on click
                      >
                        Add Category
                      </Button>
                    </Link>
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/admin/package`}>
                      <Button
                        style={{
                          color:
                            activeTab === "/admin/package" ? "red" : "white",
                        }}
                        className="bg-transparent font-semibold"
                        onClick={() => setActiveTab("/admin/package")} // Optional: Update state on click
                      >
                        Add Package
                      </Button>
                    </Link>
                  </div>

                  <Popover
                    key="bottom"
                    placement="bottom"
                    color="default"
                    backdrop="transparent"
                  >
                    <PopoverTrigger>
                      <Button
                        color="primary"
                        variant="link"
                        className="capitalize"
                      >
                        <User
                          name={session?.user?.user_id}
                          description=""
                          avatarProps={{
                            src: "https://www.svgrepo.com/show/509003/avatar-thinking-6.svg",
                          }}
                          className="text-white font-semibold"
                        />
                      </Button>
                    </PopoverTrigger>
                    {profile}
                  </Popover>
                </>
              )
            ) : (
              <Link
                href="/adminlogin"
                // onClick = {(e) => signIn()}
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                })}
              >
                Login/Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
