import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";

export default function PatientInfoTab(props) {
  const [records, setRecords] = useState([]);
  let loggedIn = props.loggedin;
  console.log(loggedIn);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('JWT token not found in local storage.');
            return;
          }

        const response = await axios.get(`${process.env.API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          }
        });
        setRecords(response.data.data);
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    };
    if(loggedIn)
      fetchData();
  }, [loggedIn]);
  console.log(records);
  if(!loggedIn){
    return <div>Please Login</div>;
  }
  else if (records.length === 0) {
    return <div>Loading patient records...</div>;
  }

  return (
    <div class="flex justify-center">
    <div  className="text-white content-normal flex-wrap	">
      
      {!loggedIn ? (<div>Please Login</div>) : (records.length===0 ? (
        <div>Loading patient information...</div>
      ) : (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>Patient Information</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="0">
                        <TableCell>Family Name:</TableCell>
                        <TableCell className="text-right">{records.patient.familyName}</TableCell>
                    </TableRow>
                    <TableRow key="1">
                        <TableCell>Given Name:</TableCell>
                        <TableCell className="text-right">{records.patient.givenName}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Date of Birth:</TableCell>
                        <TableCell className="text-right">{records.patient.dob}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Gender: </TableCell>
                        <TableCell className="text-right">{records.patient.gender}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
      
      <Spacer y={5} />
      <Table className="max-width=50%">
        <TableHeader>
            <TableColumn>Parameter</TableColumn>
            <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
        {records.records.map((record, index) => (
            <TableRow key="1">
            <TableCell>{record.ObservationText}</TableCell>
            <TableCell>{record.ObservationValue}</TableCell>
            </TableRow>
        ))}
      </TableBody>
      </Table>
      </div>
      ))}
    </div>
    </div>
  );
};
