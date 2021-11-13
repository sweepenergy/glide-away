import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';

const VALID_COLUMNS = ['id', 'display_name', 'description', 'units', 'type', 'modbus_location_start', 'modbus_location_end'];
const VALID_TYPES = ['number', 'text'];

const CSVParser = (): React.ReactElement => {
  const [isValid, setIsValid] = useState(true)

  const handleOnDrop = (data: {data: string[]}[]) => {
    setIsValid(true)
    const columns = data[0].data;
    if (JSON.stringify(columns) === JSON.stringify(VALID_COLUMNS)) {
      for (let i = 1; i < data.length; i++) {
        const row = data[i].data;
        if (row[0] !== '' && (row.length !== 7 || Number.isNaN(+row[5]) || Number.isNaN(+row[6]))) {
          setIsValid(false)
          break;
        }
      }
    } else {
      setIsValid(false)
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        style={{}}
        config={{}}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      {!isValid && <span style={{ color: 'red' }}>Invalid data format. Check the valid format.</span>}
    </>
  );
};

export default CSVParser;
