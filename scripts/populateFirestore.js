const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { firebaseConfig } = require('../src/firebase'); // Adjust the path as needed

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const assetGroups = {
  Metals: ["XAUUSD", "XAGUSD"],
  Indices: ["US30", "NAS100", "SPX500"],
  "Major Pairs": ["GBPUSD", "EURUSD", "USDJPY", "USDCAD", "AUDUSD", "NZDUSD", "USDCHF"],
  Cryptos: ["BTCUSD", "ETHUSD", "LTCUSD"],
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateMockSignal = () => {
  const assetGroup = getRandomElement(Object.keys(assetGroups));
  const asset = getRandomElement(assetGroups[assetGroup]);
  const signalType = getRandomElement(["buy", "sell"]);
  const entryPrice = (Math.random() * 100).toFixed(2);
  const stopLoss = (entryPrice - Math.random() * 10).toFixed(2);
  const takeProfit = (entryPrice + Math.random() * 10).toFixed(2);
  const status = getRandomElement(["pending", "active", "closed"]);
  const createdAt = new Date();

  return {
    asset,
    signalType,
    entryPrice,
    stopLoss,
    takeProfit,
    status,
    createdAt,
    postedBy: "mock-user",
  };
};

const populateFirestore = async () => {
  try {
    for (let i = 0; i < 100; i++) {
      const signal = generateMockSignal();
      await addDoc(collection(db, "signals"), signal);
      console.log(`Added signal for ${signal.asset}`);
    }
    console.log("Firestore populated successfully!");
  } catch (error) {
    console.error("Error populating Firestore:", error);
  }
};

populateFirestore();
