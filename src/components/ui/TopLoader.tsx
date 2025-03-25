"use client";

import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

const TopLoader = () => {
	const [loading, setLoading] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const searchParams = useSearchParams();
	const pathname = usePathname();

	React.useEffect(() => {
		const startLoading = () => {
			setLoading(true);
			setProgress(0);

			setTimeout(() => setProgress(90), 25);

			setTimeout(() => {
				const interval = setInterval(() => {
					setProgress((oldProgress) => {
						if (oldProgress >= 100) {
							clearInterval(interval);
							return oldProgress;
						}

						return oldProgress + 0.2;
					});
				}, 50);
			}, 500);

			return () => {};
		};

		const finishLoading = () => {
			setTimeout(() => {
				setProgress(100);

				setTimeout(() => {
					setLoading(false);
					setProgress(0);
				}, 200);
			}, 750);
		};

		startLoading();
		finishLoading();
	}, [pathname, searchParams]);

	if (!loading) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				height: "3px",
				width: `${progress}%`,
				backgroundColor: "#000000",
				transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
				zIndex: 9999,
			}}
		/>
	);
};

export default TopLoader;
