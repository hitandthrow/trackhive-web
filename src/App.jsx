
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [awb, setAwb] = useState('');
  const [data, setData] = useState(null);
  const [rawView, setRawView] = useState(false);

  const handleTrack = async () => {
    try {
      const form = new URLSearchParams();
      form.append('csrf_test_name', '6149049b5cb3065f77ea354d92fbf5c2');
      form.append('trackid', awb);
      form.append('isawb', 'Yes');

      const res = await axios.post('https://old-xpressbees.xbees.in/search', form);
      setData(res.data);
    } catch (error) {
      alert('Tracking failed.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">TrackHive</h1>
      <input
        type="text"
        value={awb}
        onChange={(e) => setAwb(e.target.value)}
        placeholder="Enter AWB Number"
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleTrack} className="px-4 py-2 bg-blue-600 text-white rounded mb-4">
        Track
      </button>
      <div>
        <label className="inline-flex items-center mb-4">
          <input type="checkbox" className="mr-2" checked={rawView} onChange={() => setRawView(!rawView)} />
          Show Raw JSON
        </label>
      </div>
      {data && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          {rawView ? (
            <pre className="text-xs overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <div>
              <p><strong>Status:</strong> {data?.result?.StatusDesc || 'N/A'}</p>
              <p><strong>Destination:</strong> {data?.result?.FinalDestinationName || 'N/A'}</p>
              <p><strong>Expected Delivery:</strong> {data?.result?.EDD || 'N/A'}</p>
              <p><strong>Courier:</strong> {data?.result?.CourierName || 'N/A'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
