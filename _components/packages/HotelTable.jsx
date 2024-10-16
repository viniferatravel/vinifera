import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";


export default function HotelTable({ selectedPackage }) {
  // Hotel data
  const data = [
    {
      place: "DUBAI",
      hotel: "DELTA HOTELS BY MARRIOTT, or Similar",
      nights: 4,
    },
    {
      place: "ABU DHABI",
      hotel: "LE ROYAL MERIDIEN ABU DHABI or Similar",
      nights: 2,
    },
  ];

  return (
    <div>
      {selectedPackage?.hotels?.length > 0
        ? <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Hotels:</h2>
          <Table aria-label="Hotel Information Table">
            <TableHeader>
              <TableColumn>Place</TableColumn>
              <TableColumn>Hotel</TableColumn>
              <TableColumn>Nights</TableColumn>
            </TableHeader>
            <TableBody>
              {selectedPackage?.hotels?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.place}</TableCell>
                  <TableCell>{item.hotel}</TableCell>
                  <TableCell>{item.nights}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center items-center">
            <p>
              <span className="text-lg ">Note :</span> Under unavoidable
              circumtances Hotels are subject to change, in such condition
              substitute hotel of similar category is provided.
            </p>
          </div>

        </div>
        : ""}
    </div>
  );
}
