import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, AlertCircle, Compass, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 定義遊戲狀態型別
type GameStatus = 'playing' | 'won';

// 定義提示類型以決定顏色
type MessageType = 'idle' | 'warning' | 'error' | 'success' | 'info';

export default function App() {
  // 遊戲核心邏輯狀態
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  
  // 提示訊息狀態
  const [message, setMessage] = useState<string>('年輕的探險家，你來到了一座神秘的奇幻島嶼。你要往前走幾步尋找寶藏？(1-100)');
  const [messageType, setMessageType] = useState<MessageType>('idle');

  // 初始化遊戲（產生 1-100 隨機數）
  const initializeGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setGuessCount(0);
    setStatus('playing');
    setMessage('年輕的探險家，你來到了一座神秘的奇幻島嶼。你要往前走幾步尋找寶藏？(1-100)');
    setMessageType('idle');
  };

  // 元件掛載時初始化遊戲
  useEffect(() => {
    initializeGame();
  }, []);

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'won') return;

    const numGuess = parseInt(guess, 10);
    
    // 驗證輸入
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('請輸入有效的數字 (1-100)');
      setMessageType('error');
      setGuess('');
      return;
    }

    // 增加猜測次數
    const currentCount = guessCount + 1;
    setGuessCount(currentCount);

    // 判斷結果
    if (numGuess === targetNumber) {
      setMessage(`令人難以置信！你恰好停在了一個隱藏的寶箱前，找到了傳說中的寶藏！`);
      setMessageType('success');
      setStatus('won');
    } else if (numGuess < targetNumber) {
      const messages = [
        "你在森林裡走得不夠深，只看見幾隻松鼠，傳說中的寶藏還在更前方！",
        "你的鏟子只挖到了表面的泥土，真正的寶箱還深埋在地底！你需要再深入一點。",
        "你小心翼翼地往前走，但這裡實在太安靜了，連遺跡的影子都沒看到。繼續大膽前進吧！"
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setMessageType('warning');
    } else {
      const messages = [
        "哎呀！你跑得太快，直接衝過了藏寶地點，差點掉進前面的懸崖，快退後回頭找找！",
        "你挖得太過頭了！已經打穿了地下城的地層，甚至能感覺到岩底的岩漿了，趕緊收點力氣！",
        "狂風把你的腳步吹得太遠，你直接越過了寶藏的座標，現在到了危險的未知領域，快往回走！"
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setMessageType('warning');
    }
    
    // 清空輸入框以便下次輸入
    if (numGuess !== targetNumber) {
      setGuess('');
    }
  };

  // 取得訊息文字的顏色
  const getMessageColor = () => {
    switch (messageType) {
      case 'error': return 'text-red-500 bg-red-50 border-red-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // 取得提示圖示
  const getMessageIcon = () => {
    if (status === 'won') return <Trophy className="w-5 h-5 text-green-600 mr-2 shrink-0" />;
    if (messageType === 'error') return <AlertCircle className="w-5 h-5 text-red-500 mr-2 shrink-0" />;
    if (messageType === 'warning') return <Compass className="w-5 h-5 text-amber-500 mr-2 shrink-0 animate-pulse" />;
    return <MapPin className="w-5 h-5 text-slate-500 mr-2 shrink-0" />;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
      >
        {/* 標題區塊 */}
        <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 relative z-10">秘寶探險家</h1>
          <p className="text-indigo-200 relative z-10 text-sm">透過你的直覺，尋找隱藏在地圖 1 到 100 座標之間的寶藏！</p>
        </div>

        <div className="p-8">
          {/* 狀態資訊區塊 */}
          <div className="flex justify-between items-center mb-8 text-sm font-medium text-slate-500">
            <div className="bg-slate-100 px-4 py-2 rounded-full">
              探索步數：<span className="text-indigo-600 font-bold text-lg">{guessCount}</span>
            </div>
            {status === 'won' && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center"
              >
                <Trophy className="w-4 h-4 mr-1" />
                尋寶成功
              </motion.div>
            )}
          </div>

          {/* 訊息提示區塊 */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={message}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start p-4 rounded-xl border mb-8 transition-colors duration-300 ${getMessageColor()}`}
            >
              <div className="mt-0.5">{getMessageIcon()}</div>
              <span className="font-medium text-[15px] leading-relaxed text-left">{message}</span>
            </motion.div>
          </AnimatePresence>

          {/* 互動表單 / 結果區塊 */}
          {status === 'playing' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="輸入前進步數..."
                  className="w-full text-center text-4xl font-bold p-6 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                  autoFocus
                  disabled={status === 'won'}
                />
              </div>
              <button
                type="submit"
                disabled={!guess}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                開始探索
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="py-6">
                <p className="text-slate-500 text-lg mb-2">寶藏的神秘座標是</p>
                <div className="text-6xl font-black text-indigo-600 mb-4">{targetNumber}</div>
                <p className="text-xl text-slate-700 font-medium">
                  你總共花了 <span className="text-indigo-600 font-bold">{guessCount}</span> 步才找到！
                </p>
              </div>
              
              <button
                onClick={initializeGame}
                className="w-full flex items-center justify-center bg-slate-900 border border-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all group"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                展開新冒險
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

