import React from "react";
import Avatar from "react-avatar";
import "../styles.css";
import { Chart } from "react-charts";

export default function App() {
  const series = React.useMemo(
    () => ({
      type: "area"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear", stacked: true }
    ],
    []
  );
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 60
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 23
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 65
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 84
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 87
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 84
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 88
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 63
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 60
          }
        ]
      },
      {
        label: "Series 2",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 41
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 15
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 95
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 33
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 96
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 32
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 49
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 18
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 69
          }
        ]
      }
    ],
    []
  );
  return (
         <main>
      {/* <h1>Hello World!</h1> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar name="Manjot Singh" round />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Hello, Manjot Singh!</h1>
      </div>

      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <h1>
          You're overall Status is: 100%!
        </h1>
      </div>



    <div className="App">
      
      <div style={{ width: "1400px", margin:"auto", height: "500px"}}>
        
        <Chart data={data} series={series} axes={axes} tooltip />
        
      </div>
    </div>
    </main>
  );
}