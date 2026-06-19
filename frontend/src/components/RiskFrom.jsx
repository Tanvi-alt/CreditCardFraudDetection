import { useState } from "react";

const features = [
  { key: "v14", label: "Transaction Risk Indicator", desc: "Overall transaction risk behavior" },
  { key: "v4", label: "Behavioral Pattern Score", desc: "Spending behavior patterns" },
  { key: "v11", label: "Spending Anomaly Index", desc: "Unusual or abnormal spending activity" },
  { key: "v12", label: "Payment Stability Score", desc: "Consistency and stability in payments" },
  { key: "v10", label: "Credit Consistency Measure", desc: "Long-term credit behavior consistency" },
];

const RiskForm = () => {
  const [values, setValues] = useState({
    v14: 50,
    v4: 50,
    v11: 50,
    v12: 50,
    v10: 50,
  });

  // 🔥 NEW STATE
  const [result, setResult] = useState(null);

  const handleChange = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async () => {
    const payload = {};
    Object.keys(values).forEach(
      (k) => (payload[k] = (values[k] - 50) / 50)
    );

    const res = await fetch("https://creditcardfrauddetection-backend.onrender.com/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // 🔥 STORE RESULT
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Credit Risk Prediction
        </h2>

        {features.map((f) => (
          <div key={f.key} className="mb-6">
            <label className="flex items-center justify-between font-medium text-gray-700">
              {f.label}
              <span title={f.desc} className="text-gray-400 cursor-help text-sm">ⓘ</span>
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={values[f.key]}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="w-full mt-2 accent-blue-600"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Low</span>
              <span className="font-semibold text-gray-700">{values[f.key]}</span>
              <span>High</span>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Predict
        </button>

        {/* 🔥 RESULT DISPLAY */}
        {result && (
          <div
            className={`mt-6 p-4 rounded-xl text-white text-center font-bold ${
              result.prediction === "Fraud"
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {result.prediction}
            <div className="text-sm font-normal mt-1">
              Fraud Probability: {result.fraud_probability}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskForm;