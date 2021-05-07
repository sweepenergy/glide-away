import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./styles.css";
import check from "../../assets/cloud.png";

const GLIDE_AWAY = "http://localhost:3000";

const Login = ({
	setApiKey,
	setDevicesDirectoryId,
	setSensorsDirectoryId,
	setDevicesStreamId,
}) => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmission = async (event) => {
		event.preventDefault();

		// Get Authorization
		let auth = await axios
			.post(
				`${GLIDE_AWAY}/api/user/auth`,
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => console.error(error));

		// Get API Key
		let apiKey = await axios
			.get(`${GLIDE_AWAY}/api/user/api_key`, {
				auth: {
					username: auth.session_id,
					password: auth.session_token,
				},
			})
			.then((response) => response.data)
			.catch((error) => console.error(error));

		setApiKey(apiKey);

		// Verify Directory Structure
		let directoryResponse = await axios
			.get(`${GLIDE_AWAY}/api/directory/verify`, {
				auth: {
					username: apiKey.api_key,
					password: apiKey.api_token,
				},
			})
			.then((response) => response.data)
			.catch((error) => console.error(error));

		const devicesDirectory = directoryResponse.directory.filter(
			(dir) => dir.name === "Modbus Devices"
		);
		setDevicesDirectoryId(devicesDirectory[0].id);

		const sensorsDirectory = directoryResponse.directory.filter(
			(dir) => dir.name === "Sensors"
		);
		setSensorsDirectoryId(sensorsDirectory[0].id);

		// Get Devices Stream ID
		let devicesDataResponse = await axios
			.get(`${GLIDE_AWAY}/api/directory/${devicesDirectory[0].id}`, {
				auth: {
					username: apiKey.api_key,
					password: apiKey.api_token,
				},
			})
			.then((response) => response.data)
			.catch((error) => console.error(error));

		setDevicesStreamId(devicesDataResponse.stream[0].id);

		history.push("/dashboard");
	};

	return (
		<div className="login">
			<div className="login-container">
				<div className="logo">
					<img src={check} alt="check" />
				</div>
				<div className="title">
					<header>Glide Away</header>
					<header>Sweep API</header>
				</div>
				<form className="userinput" onSubmit={handleSubmission}>
					<div className="input-control">
						<div className="email-input">
							<label>Email</label>
							<input
								type="email"
								label="example@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="password-input">
							<label>Password</label>
							<input
								type="password"
								label="*******"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					<button type="submit" className="button">
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
