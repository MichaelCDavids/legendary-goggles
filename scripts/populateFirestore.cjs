const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDi-udeLvnLa19ROUTOA-QNI1wP2VxszXs",
  authDomain: "legendary-goggles-297529-77b0d.firebaseapp.com",
  projectId: "legendary-goggles-297529-77b0d",
  storageBucket: "legendary-goggles-297529-77b0d.firebasestorage.app",
  messagingSenderId: "559424686391",
  appId: "1:559424686391:web:6148de8e0347b65286f2b2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const topMovers = ["XAUUSD", "BTCUSD", "NAS100", "US30"];

const priceRanges = {
    XAUUSD: { min: 2300, max: 2400 },
    BTCUSD: { min: 60000, max: 70000 },
    NAS100: { min: 18000, max: 19000 },
    US30:   { min: 38000, max: 39000 },
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateMockSignal = () => {
  const asset = getRandomElement(topMovers);
  const signalType = getRandomElement(["buy", "sell"]);
  
  const range = priceRanges[asset];
  const entryPrice = range.min + Math.random() * (range.max - range.min);
  
  const priceMove = entryPrice * 0.01; // 1% price move for SL/TP
  let stopLoss, takeProfit;

  if (signalType === 'buy') {
      stopLoss = entryPrice - priceMove * (Math.random() + 0.5); 
      takeProfit = entryPrice + priceMove * (Math.random() * 2 + 1);
  } else { // sell
      stopLoss = entryPrice + priceMove * (Math.random() + 0.5);
      takeProfit = entryPrice - priceMove * (Math.random() * 2 + 1);
  }

  const status = Math.random() < 0.8 ? 'closed' : getRandomElement(['active', 'pending']);

  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const randomTimestamp = lastWeek.getTime() + Math.random() * (now.getTime() - lastWeek.getTime());
  const createdAt = new Date(randomTimestamp);

  return {
    asset,
    signalType,
    entryPrice: entryPrice.toFixed(2),
    stopLoss: stopLoss.toFixed(2),
    takeProfit: takeProfit.toFixed(2),
    status,
    createdAt,
    postedBy: "mock-user",
  };
};

const populateFirestore = async () => {
  try {
    console.log("Deleting existing signals...");
    // This is a placeholder for delete logic. In a real scenario, you'd want a more robust solution.
    // For this script, we'll just add new signals. If you need to clear, do it manually or via a separate script.

    console.log("Populating Firestore with new high-quality signals...");
    for (let i = 0; i < 30; i++) {
      const signal = generateMockSignal();
      await addDoc(collection(db, "signals"), signal);
      console.log(`Added ${signal.status} ${signal.signalType} signal for ${signal.asset} @ ${signal.entryPrice}`);
    }
    console.log("Firestore populated successfully with 30 new signals!");
  } catch (error) {
    console.error("Error populating Firestore:", error);
  } finally {
    process.exit(0);
  }
};

populateFirestore();
