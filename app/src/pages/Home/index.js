import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPenAlt } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

const Home = () => {
	const generateDevices = () => {
		let deviceList = [];

		for (let i = 0; i < 10; i++) {
			deviceList.push(
				<li className="dashboard__devices__device">
					<span className="dashboard__devices__device__text">
						Device {i + 1}
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
			);
		}

		return <ul>{deviceList}</ul>;
	};
	return (
		<main className="dashboard">
			<section className="dashboard__heading">
				<h2 className="dashboard__heading__title">Modbus Devices</h2>
				<div className="dashboard__heading__icon">
					<FontAwesomeIcon icon={faPlus} />
				</div>
			</section>
			<div className="bar"></div>
			<section className="dashboard__devices">
				{generateDevices()}
			</section>
		</main>
	);
};

export default Home;
