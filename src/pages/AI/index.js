import React, { useState } from "react";

export default function AI() {
  const [text, setText] = useState("");
  const synth = window.speechSynthesis;
  
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
    recognition.start();
  };
  
  const speakText = (textToSpeak) => {
    if (synth.speaking) return;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-4">AI-Powered English Learning</h1>
      
      {/* Vocabulary Builder */}
      <div className="p-4 border rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold">Word of the Day</h2>
        <p className="text-lg">Hello</p>
        <button 
          onClick={() => speakText('Hello')} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">
          🔊 Listen
        </button>
      </div>
      
      {/* AI Chatbot Placeholder */}
      <div className="p-4 border rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold">Chatbot Practice</h2>
        <p className="text-gray-600">(AI Chatbot coming soon...)</p>
      </div>
      
      {/* Speech Recognition */}
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Speech Practice</h2>
        <p className="mb-2">Say something in English:</p>
        <button
          onClick={startListening}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          🎤 Start Speaking
        </button>
        <p className="mt-2 font-bold">{text}</p>
        {text && (
          <button
            onClick={() => speakText(text)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            🔊 Speak Text
          </button>
        )}
        <p className="mt-2 font-bold">{text}</p>
      </div>
    </div>
  );
}
