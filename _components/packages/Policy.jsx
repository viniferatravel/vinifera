'use client'
import React,{ useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import EmailModal from "@/_components/EmailModal"

export default function Policy({selectedPackage}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = (val) => {
    setModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex shadow-md rounded-xl border gap-2 p-5 justify-between flex-col lg:flex-row w-full">
        <div className="flex gap-3">
          <div className="flex justify-center items-center ">
            <NotebookPen className="size-8 mr-5 text-themeColor" />
          </div>
          <div className=" flex flex-col">
            <h2 className="text-xl font-semibold">Want to read it later?</h2>
            <p>
              Download this tour’s PDF brochure and start tour planning offline
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button onClick={() => setModalOpen(true)} className="flex gap-3 border-themeColor border text-themeColor hover:bg-themeColor rounded-full p-4 hover:text-white ">
            <div className="flex justify-between items-center">
              <Mail className="size-5" />
            </div>
            <div className="text-base font-semibold ">Email Itinerary</div>
          </button>
        </div>
        <EmailModal modalOpen={modalOpen} onCloseModal={handleCloseModal} selectedPackage={selectedPackage}/>
      </div>
      <div className="flex shadow-md rounded-xl border gap-3 p-5 flex-col w-full">
        <h2 className="text-xl font-semibold">Cancellation Policy</h2>
        <p className="">A transparent overview of applicable fees.</p>
        <div>
          <button
            className=" border-themeColor border text-themeColor hover:bg-themeColor rounded-full py-2 px-4 hover:text-white"
            onClick={onOpen}
          >
            Explore Your Options
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="top"
        scrollBehavior="outside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Your options if plans change
            </ModalHeader>
            <ModalBody>
              <CancellationPolicyTable />
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col">
                <p>
                  Read the full{" "}
                  <Link className="text-themeColor hover:font-medium" href="#">
                    cancellation policy.
                  </Link>
                </p>
                <p>
                  Need a human touch? Our friendly Customer Support{" "}
                  <Link href="#" className="text-themeColor hover:font-medium">
                    1800 266 1100{" "}
                  </Link>
                  (Toll Free) is there for you.
                </p>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";
import { Mail, NotebookPen } from "lucide-react";

function CancellationPolicyTable() {
  // Cancellation policy data
  const data = [
    {
      period: "More than 90 days",
      worldTours: "Registration Amount or 20% of tour cost whichever is higher",
      indianTours:
        "Registration Amount or 20% of tour cost whichever is higher",
    },
    { period: "90 - 61 days", worldTours: "30%", indianTours: "30%" },
    { period: "60 - 46 days", worldTours: "50%", indianTours: "50%" },
    { period: "45 - 31 days", worldTours: "75%", indianTours: "75%" },
    { period: "30 - 16 days", worldTours: "90%", indianTours: "90%" },
    { period: "15 - 01 days", worldTours: "100%", indianTours: "100%" },
    {
      period: "On the day of departure",
      worldTours: "100%",
      indianTours: "100%",
    },
    { period: "On Tour", worldTours: "100%", indianTours: "100%" },
  ];

  return (
    <div>
      <Table aria-label="Cancellation Policy Table">
        <TableHeader>
          <TableColumn>Number of days before departure</TableColumn>
          <TableColumn>World Tours</TableColumn>
          <TableColumn>Indian Tours</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.period}</TableCell>
              <TableCell>{item.worldTours}</TableCell>
              <TableCell>{item.indianTours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
