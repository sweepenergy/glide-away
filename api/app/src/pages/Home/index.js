import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faTrash,
	faPenAlt,
	faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-modal";

import "./styles.css";

const GLIDE_AWAY = "http://localhost:3000";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "20px",
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
	const [submitText, setSubmitText] = useState("Send");

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

			devicesList.map((device) => {
				return { status: false, ...device };
			});

			setDevices(devicesList);
		};

		getDevices();
	}, []);

	const generateDevices = () => {
		let deviceList = [];

		devices.map((device, idx) =>
			deviceList.push(
				<tr key={idx}>
					<td>{device.deviceName}</td>
					<td>{device.deviceReadInterval}</td>
					<td>
						{device.deviceEnvironment}:{device.devicePort}
					</td>
					<td className={device.status ? "online" : "offline"}>
						offline
					</td>
				</tr>
			)
		);

		return (
			<table>
				<thead>
					<tr>
						<td>Device Name</td>
						<td>Read Interval</td>
						<td>Connection</td>
						<td>Status</td>
					</tr>
				</thead>
				<tbody>{deviceList}</tbody>
			</table>
		);
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

	const handleSubmit = async (event) => {
		event.preventDefault();

		setSubmitText(
			<FontAwesomeIcon icon={faSyncAlt} className="fa fa-spinner" />
		);

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

		devicesList.map((device) => {
			if (device.deviceName === deviceName)
				return { status: true, ...device };
			return { status: false, ...device };
		});

		await setDevices(devicesList);

		closeModal();
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
					<div className="bar"></div>
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
						<button type="submit">{submitText}</button>
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
