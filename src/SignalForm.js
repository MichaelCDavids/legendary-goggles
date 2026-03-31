import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from './firebase'; // Import storage
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage'; // Import storage functions
import './SignalForm.css';
import { UserContext } from './UserContext';
import PriceInput from './PriceInput';
import CustomSelect from './CustomSelect';

const SignalForm = () => {
  const { user, role } = useContext(UserContext); // Use role from UserContext
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(''); // 'image' or 'video'

  const instrumentOptions = [
    { value: 'forex', label: 'Forex' },
    { value: 'indices', label: 'Indices' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'crypto', label: 'Crypto' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'closed', label: 'Closed' },
  ];

  const orderTypeOptions = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
  ];

  if (role !== 'admin') { // Check for admin role
    return (
      <div className="not-authorized">
        <h2>Not Authorized</h2>
        <p>You do not have permission to post a signal.</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target.result);
      };
      reader.readAsDataURL(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        setFileType('image');
      } else if (selectedFile.type.startsWith('video/')) {
        setFileType('video');
      } else {
        setFileType('');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { 
      instrument, 
      status, 
      orderType, 
      entryPrice, 
      stopLoss, 
      takeProfit1, 
      takeProfit2, 
      takeProfit3, 
      additionalNotes 
    } = event.target.elements;

    try {
      let mediaUrl = '';
      if (file) {
        const storageRef = ref(storage, `signals/${Date.now()}`);
        await uploadString(storageRef, file, 'data_url');
        mediaUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, 'signals'), {
        instrument: instrument.value,
        status: status.value,
        orderType: orderType.value,
        entryPrice: entryPrice.value,
        stopLoss: stopLoss.value,
        takeProfit1: takeProfit1.value,
        takeProfit2: takeProfit2.value,
        takeProfit3: takeProfit3.value,
        additionalNotes: additionalNotes.value,
        mediaUrl,
        mediaType: fileType, // Add mediaType to Firestore
        timestamp: serverTimestamp(),
        postedBy: user.uid,
      });

      navigate(`/post-success/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to post signal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signal-form-container">
      <h2>Post a New Signal</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signal-form">
        <div className="form-row">
          <CustomSelect label="Instrument" name="instrument" options={instrumentOptions} />
          <CustomSelect label="Status" name="status" options={statusOptions} />
          <CustomSelect label="Order Type" name="orderType" options={orderTypeOptions} />
        </div>

        <div className="form-row">
          <PriceInput label="Entry Price" name="entryPrice" />
          <PriceInput label="Stop Loss" name="stopLoss" />
        </div>

        <div className="form-row">
          <PriceInput label="Take Profit 1" name="takeProfit1" />
          <PriceInput label="Take Profit 2" name="takeProfit2" />
          <PriceInput label="Take Profit 3" name="takeProfit3" />
        </div>

        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea name="additionalNotes" id="additionalNotes" rows="4"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="media-upload">Upload Image or Video</label>
          <input type="file" id="media-upload" name="media" accept="image/*,video/*" onChange={handleFileChange} />
        </div>

        {file && (
          <div className="media-preview">
            {fileType === 'image' ? (
              <img src={file} alt="Preview" />
            ) : (
              <video controls src={file} />
            )}
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Signal'}
        </button>
      </form>
    </div>
  );
};

export default SignalForm;
