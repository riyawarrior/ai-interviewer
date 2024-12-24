"use client";
import { useRef, useState, useEffect } from "react";

const Camera = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const startCamera = async () => {
        console.log("Start Camera function called...");

        // Debugging: Check if videoRef.current is available
        if (!videoRef.current) {
            console.error("Error: videoRef.current is null");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Camera stream acquired:", stream);

            // Debugging: Check videoRef.current before setting srcObject
            if (!videoRef.current) {
                console.error("Error: videoRef.current became null");
                return;
            }

            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            console.log("Camera started successfully.");
        } catch (error) {
            console.error("Error accessing the camera:", error);
            alert("Failed to access the camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        console.log("Stop Camera function called...");
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            console.log("Camera stopped.");
        }
        setIsCameraOn(false);
    };

    useEffect(() => {
        if (isCameraOn) {
            console.log("isCameraOn is true, starting camera...");
            startCamera();
        }
    }, [isCameraOn]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {!isCameraOn ? (
                <button
                    onClick={() => setIsCameraOn(true)}
                    className="px-6 py-2 bg-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-700"
                >
                    Open Camera
                </button>
            ) : (
                <div className="relative">
                    <video
                        ref={videoRef} // Attach the video element reference
                        className="rounded-lg shadow-lg w-full max-w-md"
                        autoPlay
                        playsInline // For mobile device compatibility
                    ></video>
                    <button
                        onClick={stopCamera}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-sm font-semibold rounded-lg hover:bg-red-700"
                    >
                        Close Camera
                    </button>
                </div>
            )}
        </div>
    );
};

export default Camera;
