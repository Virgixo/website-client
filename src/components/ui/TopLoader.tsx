"use client";

import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

interface TopLoaderProps {
	color?: string;
	height?: string;
}

const TopLoader: React.FC<TopLoaderProps> = ({ color = "#000000", height = "3px" }) => {
	const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
	const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

	const [loading, setLoading] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const searchParams = useSearchParams();
	const pathname = usePathname();

	React.useEffect(() => {
		const startLoading = () => {
			setLoading(true);
			setProgress(0);

			timeoutRef.current = setTimeout(() => setProgress(90), 25);

			timeoutRef.current = setTimeout(() => {
				intervalRef.current = setInterval(() => {
					setProgress((oldProgress) => {
						if (oldProgress >= 100) {
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}

							return oldProgress;
						}

						return oldProgress + 0.2;
					});
				}, 50);
			}, 500);
		};

		const finishLoading = () => {
			timeoutRef.current = setTimeout(() => {
				setProgress(100);

				timeoutRef.current = setTimeout(() => {
					setLoading(false);
					setProgress(0);
				}, 200);
			}, 750);
		};

		startLoading();
		finishLoading();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [pathname, searchParams]);

	if (!loading) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				height,
				width: `${progress}%`,
				backgroundColor: color,
				transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
				zIndex: 9999,
			}}
		/>
	);
};

export default TopLoader;
