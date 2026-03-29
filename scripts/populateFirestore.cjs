const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// NOTE: The firebaseConfig is hardcoded here for compatibility with CommonJS. 
// This is not ideal, but it solves the module compatibility issue.
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

// Focusing on top movers as requested
const topMovers = ["XAUUSD", "BTCUSD", "NAS100", "US30"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateMockSignal = () => {
  const asset = getRandomElement(topMovers); // Select from top movers
  const signalType = getRandomElement(["buy", "sell"]);
  const entryPrice = Math.random() * 100;
  const stopLoss = entryPrice - Math.random() * 10;
  const takeProfit = entryPrice + Math.random() * 10;
  const status = getRandomElement(["pending", "active", "closed"]);
  const createdAt = new Date();

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
    // Generate 30 trades as requested
    for (let i = 0; i < 30; i++) {
      const signal = generateMockSignal();
      await addDoc(collection(db, "signals"), signal);
      console.log(`Added signal for ${signal.asset}`);
    }
    console.log("Firestore populated successfully with 30 signals!");
  } catch (error) {
    console.error("Error populating Firestore:", error);
  } finally {
    // The script hangs, so we need to exit explicitly.
    process.exit(0);
  }
};

populateFirestore();
