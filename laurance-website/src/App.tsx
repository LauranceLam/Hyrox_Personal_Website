import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { allWeeks, phases } from './trainingData';

interface DayProgress {
  completed: boolean;
  note: string;
  image?: string;
}

interface ProgressData {
  [key: string]: DayProgress;
}

// 我們使用一個固定的 ID 來實現跨裝置共享同一份紀錄
const USER_ID = 'laurance-shared-record';

function App() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeWeek, setActiveWeek] = useState(1);
  const [progress, setProgress] = useState<ProgressData>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  
  const [password, setPassword] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 載入進度：從 Supabase 雲端讀取
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('training_progress')
          .select('data')
          .eq('id', USER_ID)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 代表找不到資料，這是正常的初始狀態
          console.error('Error loading progress:', error);
        } else if (data) {
          setProgress(data.data);
        }
      } catch (err) {
        console.error('Failed to load progress:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProgress();
  }, []);

  const toggleComplete = (week: number, day: string) => {
    const key = `w${week}-${day}`;
    setProgress(prev => ({
      ...prev,
      [key]: {
        completed: !prev[key]?.completed,
        note: prev[key]?.note || '',
        image: prev[key]?.image
      }
    }));
    setSaveMessage('');
  };

  const saveNote = (week: number, day: string) => {
    const key = `w${week}-${day}`;
    setProgress(prev => ({
      ...prev,
      [key]: {
        completed: prev[key]?.completed || false,
        note: noteText,
        image: prev[key]?.image
      }
    }));
    setEditingNote(null);
    setNoteText('');
    setSaveMessage('');
  };

  const openNote = (week: number, day: string) => {
    const key = `w${week}-${day}`;
    setNoteText(progress[key]?.note || '');
    setEditingNote(key);
  };

  // 處理圖片上傳到 Supabase Storage
  const handleImageUpload = async (week: number, day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('圖片過大！請上傳小於 2MB 的截圖。');
      return;
    }

    setSaveMessage('Uploading image to cloud...');
    
    try {
      // 使用固定檔名，這樣每次上傳同一天的圖片都會覆蓋舊的，節省空間
      const filePath = `${USER_ID}/w${week}-${day}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('training-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 獲取圖片的公開網址
      const { data: { publicUrl } } = supabase.storage
        .from('training-photos')
        .getPublicUrl(filePath);

      const key = `w${week}-${day}`;
      setProgress(prev => ({
        ...prev,
        [key]: {
          completed: prev[key]?.completed || false,
          note: prev[key]?.note || '',
          image: publicUrl
        }
      }));
      setSaveMessage('Image uploaded to cloud! Remember to click "Save Changes" at the bottom.');
    } catch (err) {
      console.error('Upload error:', err);
      setSaveMessage('Error uploading image. Please try again.');
    }
    
    event.target.value = '';
  };

  // 處理刪除圖片 (僅從本地狀態移除，並提示儲存)
  const handleRemoveImage = (week: number, day: string) => {
    const key = `w${week}-${day}`;
    setProgress(prev => {
      const newData = { ...prev[key] };
      delete newData.image;
      return {
        ...prev,
        [key]: newData
      };
    });
    setSaveMessage('Image removed from view. Remember to click "Save Changes" at the bottom!');
  };

  // 處理密碼驗證與雲端儲存
  const handleSave = async () => {
    if (password === '19901112') {
      setIsSaving(true);
      setSaveMessage('Saving to cloud...');
      try {
        const { error } = await supabase
          .from('training_progress')
          .upsert({ id: USER_ID, data: progress }, { onConflict: 'id' });

        if (error) throw error;

        setSaveMessage('Saved successfully to the cloud!');
        setPassword('');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (err) {
        console.error('Save error:', err);
        setSaveMessage('Error saving to cloud. Please check your connection.');
      } finally {
        setIsSaving(false);
      }
    } else {
      setSaveMessage('Incorrect password!');
    }
  };

  const phaseWeeks = allWeeks.filter(w => w.phase === activePhase);
  const currentWeekData = allWeeks.find(w => w.week === activeWeek);

  const getTotalDays = () => {
    let total = 0;
    allWeeks.forEach(w => { total += w.days.length; });
    return total;
  };

  const getCompletedDays = () => {
    return Object.values(progress).filter(p => p.completed).length;
  };

  const getProgressPercent = () => {
    return Math.round((getCompletedDays() / getTotalDays()) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500 font-oswald text-xl animate-pulse">SYNCING WITH CLOUD...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black border-b-4 border-red-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,0,0,0.05) 35px, rgba(255,0,0,0.05) 70px)'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-red-600 rotate-45"></div>
                <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-sm">HYROX Training System</span>
              </div>
              <h1 className="font-oswald text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none">
                Sanya Pro Men<br />
                <span className="text-red-500">Prep 2026</span>
              </h1>
              <p className="mt-3 text-gray-400 text-lg">13-Week Race Preparation Program</p>
              <p className="mt-1 text-gray-500 text-sm">Race Date: December 4, 2026 | Sanya, China</p>
            </div>
            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-5 min-w-[260px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Athlete</span>
              </div>
              <p className="font-oswald text-2xl font-bold uppercase">Laurance LAM</p>
              <p className="text-gray-400 text-sm mt-1">Pro Men Division</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase">Overall Progress</span>
                  <span className="text-red-500 font-bold text-sm">{getProgressPercent()}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercent()}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{getCompletedDays()} / {getTotalDays()} sessions completed</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Personal Bests */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-yellow-500 text-xl">🏆</span>
            <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Personal Bests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-yellow-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Men Open</p>
                  <p className="font-oswald text-3xl font-bold text-white mt-1">1:17:38</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <span className="text-yellow-500 text-lg">⚡</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-red-600/50 rounded-lg p-4 hover:border-red-500 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-xs font-bold px-2 py-0.5 rounded-bl">PRO</div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-400 uppercase tracking-wider font-bold">Men Pro</p>
                  <p className="font-oswald text-3xl font-bold text-white mt-1">1:27:29</p>
                </div>
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-lg">🔥</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-yellow-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Double Men</p>
                  <p className="font-oswald text-3xl font-bold text-white mt-1">1:08:33</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <span className="text-yellow-500 text-lg">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Navigation */}
      <section className="bg-black sticky top-0 z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => {
                  setActivePhase(phase.id);
                  const firstWeek = allWeeks.find(w => w.phase === phase.id);
                  if (firstWeek) setActiveWeek(firstWeek.week);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded font-bold text-sm uppercase tracking-wide transition-all ${
                  activePhase === phase.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Phase {phase.id}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Info */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {phases.filter(p => p.id === activePhase).map(phase => (
            <div key={phase.id}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="font-oswald text-lg md:text-xl font-bold uppercase text-white">{phase.name}</h3>
                  <p className="text-red-500 text-sm font-bold">{phase.weeks}</p>
                </div>
                <p className="text-gray-400 text-sm max-w-xl">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Week Selector */}
      <section className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex overflow-x-auto gap-2 scrollbar-hide">
            {phaseWeeks.map(w => {
              const weekCompleted = w.days.every(d => progress[`w${w.week}-${d.day}`]?.completed);
              const weekPartial = w.days.some(d => progress[`w${w.week}-${d.day}`]?.completed);
              return (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(w.week)}
                  className={`flex-shrink-0 px-4 py-2 rounded-md font-bold text-sm transition-all border ${
                    activeWeek === w.week
                      ? 'bg-white text-black border-white'
                      : weekCompleted
                        ? 'bg-green-900/30 text-green-400 border-green-700 hover:bg-green-900/50'
                        : weekPartial
                          ? 'bg-yellow-900/20 text-yellow-400 border-yellow-700 hover:bg-yellow-900/40'
                          : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  W{w.week}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Training Plan */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentWeekData && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase">
                Week {currentWeekData.week}
                <span className="text-gray-500 text-lg ml-3 font-inter font-normal">Phase {currentWeekData.phase}</span>
              </h2>
              <div className="text-sm text-gray-400">
                {currentWeekData.days.filter(d => progress[`w${currentWeekData.week}-${d.day}`]?.completed).length}
                /{currentWeekData.days.length} days done
              </div>
            </div>

            <div className="space-y-4">
              {currentWeekData.days.map(day => {
                const key = `w${currentWeekData.week}-${day.day}`;
                const dayProgress = progress[key];
                const isCompleted = dayProgress?.completed || false;
                const hasNote = dayProgress?.note && dayProgress.note.trim() !== '';
                const hasImage = !!dayProgress?.image;

                return (
                  <div
                    key={day.day}
                    className={`rounded-lg border transition-all ${
                      isCompleted
                        ? 'bg-green-950/20 border-green-800/50'
                        : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleComplete(currentWeekData.week, day.day)}
                          className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-600 border-green-500 text-white'
                              : 'border-gray-600 hover:border-red-500'
                          }`}
                        >
                          {isCompleted && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div>
                          <h3 className={`font-oswald text-lg font-bold uppercase ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                            {day.day}
                          </h3>
                          {day.sessions.length > 0 && (
                            <p className="text-xs text-gray-500">{day.sessions[0].time}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => openNote(currentWeekData.week, day.day)}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide transition-all ${
                          hasNote
                            ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/50'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        {hasNote ? '📝 已備註' : '📝 註解'}
                      </button>
                    </div>

                    {/* Sessions */}
                    <div className="p-4 space-y-4">
                      {day.sessions.map((session, idx) => (
                        <div key={idx} className={`${idx > 0 ? 'pt-4 border-t border-gray-800' : ''}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs text-red-400 font-bold uppercase tracking-wider">{session.time}</span>
                          </div>
                          <h4 className={`font-bold text-base mb-2 ${isCompleted ? 'text-green-300' : 'text-white'}`}>
                            {session.title}
                          </h4>
                          <ul className="space-y-1.5 ml-4">
                            {session.details.map((detail, dIdx) => (
                              <li key={dIdx} className="text-sm text-gray-400 flex gap-2">
                                <span className="text-gray-600 flex-shrink-0 mt-0.5">›</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Note Display */}
                    {hasNote && editingNote !== key && (
                      <div className="px-4 pb-2">
                        <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-md p-3">
                          <p className="text-xs text-yellow-500 font-bold uppercase mb-1">📝 Note</p>
                          <p className="text-sm text-yellow-200/80">{dayProgress.note}</p>
                        </div>
                      </div>
                    )}

                    {/* Note Editor */}
                    {editingNote === key && (
                      <div className="px-4 pb-2">
                        <div className="bg-gray-800 border border-gray-600 rounded-md p-3">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                            備註: 記錄未完成原因 / 訓練改動內容
                          </p>
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none resize-none"
                            rows={3}
                            placeholder="例如：因工作未能完成跑步訓練 / 將 Threshold Run 改為 3x2km..."
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => saveNote(currentWeekData.week, day.day)}
                              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded uppercase transition-colors"
                            >
                              確認備註
                            </button>
                            <button
                              onClick={() => { setEditingNote(null); setNoteText(''); }}
                              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded uppercase transition-colors"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Upload & Preview Section */}
                    <div className="px-4 pb-4">
                      {hasImage ? (
                        <div className="relative mt-2 group">
                          <img 
                            src={dayProgress.image} 
                            alt="Training Record" 
                            className="max-w-full h-auto rounded-md border border-gray-600 shadow-lg"
                          />
                          <button
                            onClick={() => handleRemoveImage(currentWeekData.week, day.day)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            title="Remove Image"
                          >
                            ✕
                          </button>
                          <p className="text-xs text-gray-500 mt-1 text-center">Image synced to cloud (Remember to Save)</p>
                        </div>
                      ) : (
                        <label className="mt-2 flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-700 rounded-md cursor-pointer hover:border-red-500 hover:bg-gray-800/50 transition-all group">
                          <div className="text-center">
                            <svg className="mx-auto h-8 w-8 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-1 text-xs text-gray-400 group-hover:text-white">Click to upload Garmin/Samsung Health screenshot</p>
                            <p className="text-[10px] text-gray-600">Max 2MB</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(currentWeekData.week, day.day, e)}
                          />
                        </label>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Password Protected Save Section */}
        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="font-oswald text-lg font-bold uppercase text-white">Save Weekly Progress to Cloud</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Please enter your password to sync all completed sessions, notes, and uploaded images to the cloud.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSaveMessage('');
                }}
                placeholder="Enter password to unlock save..."
                className="w-full bg-black border border-gray-600 rounded p-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full md:w-auto px-8 py-3 text-white font-bold rounded uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 ${
                isSaving ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {isSaving ? 'Syncing...' : 'Save Changes'}
            </button>
          </div>
          {saveMessage && (
            <div className={`mt-4 p-3 rounded-md text-sm font-bold text-center ${
              saveMessage.includes('success') || saveMessage.includes('uploaded') || saveMessage.includes('removed')
                ? 'bg-green-900/30 text-green-400 border border-green-800' 
                : 'bg-red-900/30 text-red-400 border border-red-800'
            }`}>
              {saveMessage}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-600 rotate-45"></div>
            <span className="font-oswald text-sm font-bold uppercase tracking-widest text-gray-500">HYROX</span>
          </div>
          <p className="text-gray-600 text-sm">
            Laurance LAM — Sanya Pro Men 2026 Training Program
          </p>
          <p className="text-gray-700 text-xs mt-1">
            "The only easy day was yesterday."
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;