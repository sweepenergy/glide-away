// https://stackoverflow.com/questions/63219753/how-to-show-time-and-date-in-realtime-in-react-js

import React from "react";

const useDate = () => {
	const locale = "en";
	const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

	React.useEffect(() => {
		// Creates an interval which will update the current data every minute
		const timer = setInterval(() => {
			//This will trigger a rerender every component that uses the useDate hook.
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
		};
	}, []);

	const day = today.toLocaleDateString(locale, { weekday: "long" });
	const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
		locale,
		{ month: "long" }
	)}\n\n`;
	const hour = today.getHours();

	const time = today.toLocaleTimeString(locale, {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
		second: "numeric",
	});

	return {
		time,
	};
};
export default useDate;
