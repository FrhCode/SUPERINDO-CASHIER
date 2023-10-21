import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" flex items-center justify-between text-2xl font-medium">
          <span>Indomie</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BsInfoCircleFill color="var(--blue-600)" />
            <p className="font-semibold">info</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            eum dolores, eos omnis temporibus dignissimos.
          </p>
        </div> */}

        <Table>
          <TableCaption>
            {/* <DialogAddSolution
              symptomName={diese.name}
              dieseCode={diese.code}
            /> */}
            Tambah variant untuk indomie
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead></TableHead>
              {/* <TableHead className="text-right">Nilai Keyakinan</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {diese.solutions.map(({ id, name, description }) => {
              return (
                <TableRow key={id}>
                  <TableCell className="">{name}</TableCell>
                  <TableCell className="text-right">
                    <DropDownSolutionTable
                      solution={{ id, description, name }}
                    />
                  </TableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
