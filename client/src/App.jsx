import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Setup Enterprise MERN Architecture', status: 'Done', priority: 'High', assignee: 'Reena Yadav' },
    { id: 2, title: 'Design Figma Wireframes for Auth & Kanban', status: 'In Progress', priority: 'High', assignee: 'Reena Yadav' },
    { id: 3, title: 'Implement JWT Authentication & RBAC', status: 'To Do', priority: 'Medium', assignee: 'Unassigned' }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: 'To Do',
      priority: newTaskPriority,
      assignee: 'Reena Yadav'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-600/30">
            ⚡
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              TaskMatrix Enterprise <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Team Lead: Reena Yadav (SIH 2026)</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Kanban Board
          </button>
          <button 
            onClick={() => setActiveTab('backlog')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'backlog' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Sprint Backlog
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-lg font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            API Connected (5000)[span_1](start_span)[span_1](end_span)
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full space-y-6">
        
        {activeTab === 'dashboard' ? (
          <>
            {/* Task Creation & Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h2 className="text-sm font-bold text-slate-200">Sprint 1: Core Architecture & UI[span_2](start_span)[span_2](end_span)</h2>
                <p className="text-xs text-slate-400">Manage tasks across columns and update workflow states seamlessly[span_3](start_span)[span_3](end_span).</p>
              </div>

              <form onSubmit={addTask} className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <input 
                  type="text" 
                  placeholder="Task title..." 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 lg:w-60"
                />
                <select 
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  + Add Task
                </button>
              </form>
            </div>

            {/* Kanban 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {['To Do', 'In Progress', 'Done'].map((statusCol) => {
                const columnTasks = tasks.filter(t => t.status === statusCol);
                return (
                  <div key={statusCol} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]">
                    
                    {/* Column Header */}
                    <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          statusCol === 'To Do' ? 'bg-amber-500' : statusCol === 'In Progress' ? 'bg-indigo-500' : 'bg-emerald-500'
                        }`}></span>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">{statusCol}</h3>
                      </div>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Task Cards Container */}
                    <div className="space-y-3 flex-1">
                      {columnTasks.length === 0 ? (
                        <div className="h-32 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-xs text-slate-600 font-mono">
                          No tasks
                        </div>
                      ) : (
                        columnTasks.map((task) => (
                          <div key={task.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 shadow-md hover:border-slate-700 transition">
                            <p className="text-xs font-medium text-slate-200 mb-3 leading-relaxed">{task.title}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px]">
                              <span className={`px-2 py-0.5 rounded font-mono ${
                                task.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {task.priority}
                              </span>

                              <div className="flex items-center gap-1.5">
                                {statusCol !== 'To Do' && (
                                  <button onClick={() => updateStatus(task.id, statusCol === 'Done' ? 'In Progress' : 'To Do')} title="Move Left" className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-indigo-600 text-slate-300 rounded transition">←</button>
                                )}
                                {statusCol !== 'Done' && (
                                  <button onClick={() => updateStatus(task.id, statusCol === 'To Do' ? 'In Progress' : 'Done')} title="Move Right" className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-indigo-600 text-slate-300 rounded transition">→</button>
                                )}
                                <button onClick={() => deleteTask(task.id)} title="Delete" className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 rounded transition">✕</button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-4xl mx-auto w-full">
            <h3 className="text-sm font-bold text-indigo-400 mb-2">Sprint Backlog & Architecture Epics</h3>
            <p className="text-xs text-slate-400 mb-6">Comprehensive tracking list of features and modules aligned for enterprise delivery.</p>
            
            <div className="space-y-3">
              {tasks.ap(t => (
                <div key={t.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">{t.title}</span>
                  <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-mono">{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;