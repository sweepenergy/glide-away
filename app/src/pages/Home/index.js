import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-modal";

import "./styles.css";

const GLIDE_AWAY = "http://localhost:3001";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const Home = ({
	apiKey,
	devicesDirectoryId,
	devicesStreamId,
	sensorsDirectoryId,
}) => {
	const [devices, setDevices] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [deviceName, setDeviceName] = useState("Modbus Device");
	const [devicePort, setDevicePort] = useState(5020);
	const [deviceEnvironment, setDeviceEnvironment] = useState("localhost");
	const [deviceReadInterval, setDeviceReadInterval] = useState(5000);

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

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleDeviceName = (event) => {
		event.preventDefault();
		let isDuplicate = devices.some(
			(device) => device.deviceName === event.target.value
		);

		if (!isDuplicate) setDeviceName(event.target.value);
		else
			alert(
				"Name of device already exists, please try a different name!"
			);
	};

	const handleSubmit = async () => {
		await axios
			.post(
				`${GLIDE_AWAY}/api/modbus/add`,
				{
					devices_stream_id: `${devicesStreamId}`,
					sensors_directory_id: `${sensorsDirectoryId}`,
					data: {
						deviceName: `${deviceName}`,
						deviceReadInterval: Number(deviceReadInterval),
						devicePort: Number(devicePort),
						deviceEnvironment: `${deviceEnvironment}`,
						deviceNumber: Number(devices.length),
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
					onClick={openModal}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Add New Device Modal"
				>
					<div className="modal__header">
						<h2>Add New Device</h2>
						<button onClick={closeModal}>close</button>
					</div>
					<form className="modal__form" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="name">Name</label>
							<input
								id="name"
								value={deviceName}
								type="text"
								onChange={handleDeviceName}
							/>
						</div>
						<div>
							<label htmlFor="interval">Read Interval</label>
							<input
								id="interval"
								value={deviceReadInterval}
								type="number"
								onChange={(event) =>
									setDeviceReadInterval(event.target.value)
								}
							/>
						</div>
						<div>
							<label htmlFor="port">Port</label>
							<input
								id="port"
								value={devicePort}
								type="number"
								onChange={(event) =>
									setDevicePort(event.target.value)
								}
							/>
						</div>
						<div>
							<label htmlFor="environment">Environment</label>
							<input
								id="environment"
								value={deviceEnvironment}
								type="text"
								onChange={(event) =>
									setDeviceEnvironment(event.target.value)
								}
							/>
						</div>
						<button type="submit">Submit</button>
					</form>
				</Modal>
			</section>
			<div className="bar"></div>
			<section className="dashboard__devices">
				{generateDevices()}
			</section>
		</main>
	);
};

export default Home;
