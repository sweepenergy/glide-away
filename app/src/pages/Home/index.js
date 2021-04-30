import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./styles.css";

const GLIDE_AWAY = "http://localhost:3001";

const Home = ({
	apiKey,
	devicesDirectoryId,
	devicesStreamId,
	sensorsDirectoryId,
}) => {
	const [devices, setDevices] = useState([]);

	useEffect(() => {
		const getDevices = async () => {
			let devicesList = await axios
				.get(
					`${GLIDE_AWAY}/api/stream/dataset/${devicesStreamId}?span=raw&time_scale=1m&ts_type=skewness`,
					{
						auth: {
							username: apiKey.api_key,
							password: apiKey.api_token,
						},
					}
				)
				.then((response) => response.data)
				.catch((error) => console.error(error));

			setDevices(devicesList);
		};

		getDevices();
	}, []);

	const generateDevices = () => {
		let deviceList = [];

		devices.map((device, idx) =>
			deviceList.push(
				<li className="dashboard__devices__device" key={idx}>
					<span className="dashboard__devices__device__text">
						{device.deviceName}
					</span>
					<div className="dashboard__devices__device__icons">
						<div className="dashboard__devices__device__icons__icon">
							<FontAwesomeIcon icon={faPenAlt} />
						</div>
						<div className="dashboard__devices__device__icons__icon">
							<FontAwesomeIcon icon={faTrash} />
						</div>
					</div>
				</li>
			)
		);

		return <ul>{deviceList}</ul>;
	};

	const handleClick = async () => {
		await axios
			.post(
				`${GLIDE_AWAY}/api/modbus/add`,
				{
					devices_stream_id: `${devicesStreamId}`,
					sensors_directory_id: `${sensorsDirectoryId}`,
					data: {
						deviceName: `Modbus ${devices.length}`,
						deviceReadInterval: 5000,
						devicePort: 5020,
						deviceEnvironment: "localhost",
						deviceNumber: devices.length,
					},
				},
				{
					auth: {
						username: apiKey.api_key,
						password: apiKey.api_token,
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => console.error(error));

		let devicesList = await axios
			.get(
				`${GLIDE_AWAY}/api/stream/dataset/${devicesStreamId}?span=raw&time_scale=1m&ts_type=skewness`,
				{
					auth: {
						username: apiKey.api_key,
						password: apiKey.api_token,
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => console.error(error));

		setDevices(devicesList);
	};

	return (
		<main className="dashboard">
			<section className="dashboard__heading">
				<h2 className="dashboard__heading__title">Modbus Devices</h2>
				<button
					className="dashboard__heading__icon"
					onClick={handleClick}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</section>
			<div className="bar"></div>
			<section className="dashboard__devices">
				{generateDevices()}
			</section>
		</main>
	);
};

export default Home;
