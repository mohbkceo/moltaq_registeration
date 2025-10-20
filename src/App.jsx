import React, { useState } from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import './App.css'
const serverEndPoint = 'http://localhost:5000/api/content/mol_reg'

function App() {
 const [lastScanned, setLastScanned] = useState("");

  const handleScan = async (result) => {
    if (!result?.[0]?.rawValue) return;
    console.log(result)
    const qrText = result[0].rawValue.trim();
    if (qrText === lastScanned) return;
    setLastScanned(qrText);
    
    toast.success(`Qr coded reader success data: ${qrText}`);

    try {
      await axios.post(serverEndPoint, { data:qrText });
      toast.success("Saved to database!");
    } catch (err) {
      console.log(err)
      toast.error("Failed to save data");
    }
  };

  const handleError = (err) => {
    console.error("Scanner error:", err);
    toast.error("⚠️ Camera error, check permissions");
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" />
      <div className="w-[300px] h-[300px] border-2 border-gray-500 rounded-lg overflow-hidden">
        <Scanner
          
          styles={{ width: "100%", height: "100%" }}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
    </div>
  );
}

export default App
