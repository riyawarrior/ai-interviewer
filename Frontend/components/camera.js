"use client";
import { useRef, useState, useEffect } from "react";

const Camera = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [userResponses, setUserResponses] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        "Tell me about yourself.",
        "What is your educational background?",
        "Why are you interested in this position?",
        "What skills do you bring to this job?",
        "Where do you see yourself in five years?",
    ];

    // Start the camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (!videoRef.current) return;
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        } catch (error) {
            console.error("Error accessing the camera:", error);
            alert("Failed to access the camera. Please check permissions.");
        }
    };

    // Stop the camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
    };

    // Start listening for user's response using Web Speech API
    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("User's response:", transcript);
            setUserResponses((prev) => [...prev, transcript]);
            moveToNextQuestion();
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Could not recognize speech. Please try again.");
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    // Move to the next question
    const moveToNextQuestion = () => {
        if (questionIndex + 1 < questions.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            alert("Congratulations, You have successfully finished your interview mock test!");
        }
    };

    // Show the result after submission
    const handleSubmit = () => {
        setShowResult(true);
    };

    // Analyze the user's responses
    const analyzeResponses = () => {
        return userResponses.map((response, index) => {
            const hesitationWords = ["um", "uh", "ah", "er"];
            const hesitationCount = hesitationWords.reduce(
                (count, word) => count + (response.toLowerCase().includes(word) ? 1 : 0),
                0
            );

            return {
                question: questions[index],
                response: response,
                fumbles: hesitationCount,
                feedback:
                    hesitationCount > 0
                        ? `You hesitated ${hesitationCount} time(s). Try to be more confident.`
                        : "Great response! You sounded confident.",
            };
        });
    };

    useEffect(() => {
        setCurrentQuestion(questions[questionIndex]);
    }, [questionIndex]);

    useEffect(() => {
        if (isCameraOn) {
            startCamera();
        }
    }, [isCameraOn]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
            {/* Camera Section */}
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
                        ref={videoRef}
                        className="rounded-lg shadow-lg w-full max-w-md h-1200"
                        autoPlay
                        playsInline
                    ></video>
                    <button
                        onClick={stopCamera}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-sm font-semibold rounded-lg hover:bg-red-700"
                    >
                        Close Camera
                    </button>
                </div>
            )}

            {/* Conditional rendering for questions and response button */}
            {isCameraOn && !showResult && (
                <>
                    {/* Questions Section */}
                    <div className="absolute top-4 w-full text-center bg-blue-600 py-2 px-4 rounded-md shadow-lg">
                        <p className="text-lg font-semibold">{currentQuestion}</p>
                    </div>

                    {/* User Response Section */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={startListening}
                            className="px-6 py-2 bg-green-600 text-lg font-semibold rounded-lg hover:bg-green-700"
                            disabled={isListening}
                        >
                            {isListening ? "Listening..." : "Answer"}
                        </button>
                        <p className="mt-4 text-lg">
                            {questionIndex + 1 === questions.length
                                ? "You have answered all the questions!"
                                : `Question ${questionIndex + 1} of ${questions.length}`}
                        </p>
                    </div>

                    {questionIndex + 1 === questions.length && (
                        <button
                            onClick={handleSubmit}
                            className="mt-4 px-6 py-2 bg-yellow-600 text-lg font-semibold rounded-lg hover:bg-yellow-700"
                        >
                            Submit
                        </button>
                    )}
                </>
            )}

            {/* Results Section */}
            {showResult && (
                <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Interview Analysis</h2>
                    {analyzeResponses().map((result, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold">Q{index + 1}: {result.question}</p>
                            <p>Your Response: {result.response}</p>
                            <p className="text-yellow-400">{result.feedback}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Camera;
