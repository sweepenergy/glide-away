import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history"

import Home from "./pages/Home";
import Login from "./pages/login";
import useDate from "./components/useDate";

import "./App.css"

const App = () => {
	const { time } = useDate();
	const [apiKey, setApiKey] = useState({
		api_key: "",
		api_token: "",
	});
	const [devicesDirectoryId, setDevicesDirectoryId] = useState("");
	const [devicesStreamId, setDevicesStreamId] = useState("");
	const [sensorsDirectoryId, setSensorsDirectoryId] = useState("");

	return (
		<Router history={createBrowserHistory}>
			<Switch>
				<Route exact path="/">
					<Login
						setApiKey={setApiKey}
						setDevicesDirectoryId={setDevicesDirectoryId}
						setSensorsDirectoryId={setSensorsDirectoryId}
						setDevicesStreamId={setDevicesStreamId}
					/>
				</Route>
				<Route path="/dashboard">
					<Home
						apiKey={apiKey}
						devicesDirectoryId={devicesDirectoryId}
						devicesStreamId={devicesStreamId}
						sensorsDirectoryId={sensorsDirectoryId}
					/>
				</Route>
			</Switch>
			<footer>
				<ul className="footer-container">
					<li className="footer-item">
						<button
							className="footer-links"
							onClick={() => {
								window.location.href =
									"https://sweepenergy.com";
							}}
						>
							Sweep Energy
						</button>
					</li>
					<li className="footer-item">{time}</li>
					<li className="footer-item">
						<button
							className="footer-links"
							onClick={() => {
								window.location.href =
									"https://docs.sweepapi.com";
							}}
						>
							API
						</button>
					</li>
				</ul>
			</footer>
		</Router>
	);
};

export default App;
