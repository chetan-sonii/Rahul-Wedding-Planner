import { useState } from 'react';
import { FaPlus, FaCheck, FaTrash, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ChecklistItem {
    _id: string;
    text: string;
    isCompleted: boolean;
    dueDate?: string;
    note?: string;
}

interface Props {
    checklist: ChecklistItem[];
    onUpdate: (action: 'add' | 'toggle' | 'delete', text?: string, itemId?: string, extra?: any) => void;
}

const ChecklistTab = ({ checklist, onUpdate }: Props) => {
    const [newTask, setNewTask] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newNote, setNewNote] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAdd = () => {
        if (!newTask.trim()) return;
        onUpdate('add', newTask, undefined, { dueDate: newDate, note: newNote });
        setNewTask("");
        setNewDate("");
        setNewNote("");
        setIsExpanded(false);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* ADD TASK HEADER */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                    />
                    <button onClick={handleAdd} className="bg-primary text-white px-6 rounded-xl font-bold hover:bg-pink-700 transition-colors">
                        <FaPlus />
                    </button>
                </div>

                {/* Expanded Options (Date & Note) */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex gap-4 mt-4">
                                <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg flex-1">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <input
                                        type="date"
                                        className="outline-none text-sm w-full text-gray-600"
                                        value={newDate}
                                        onChange={(e) => setNewDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg flex-[2]">
                                    <FaStickyNote className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Add a note (optional)"
                                        className="outline-none text-sm w-full"
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* LIST */}
            <div className="divide-y divide-gray-100">
                {checklist.map((task) => (
                    <div key={task._id} className="group p-4 hover:bg-gray-50 transition-colors flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1 cursor-pointer" onClick={() => onUpdate('toggle', '', task._id)}>
                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                {task.isCompleted && <FaCheck className="text-white text-xs" />}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                    {task.text}
                                </p>
                                <div className="flex gap-4 mt-1 text-xs text-gray-400">
                                    {task.dueDate && (
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(task.dueDate).toLocaleDateString()}</span>
                                    )}
                                    {task.note && (
                                        <span className="flex items-center gap-1"><FaStickyNote /> {task.note}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => onUpdate('delete', '', task._id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                            <FaTrash />
                        </button>
                    </div>
                ))}
                {checklist.length === 0 && <div className="p-8 text-center text-gray-400">No tasks yet.</div>}
            </div>
        </div>
    );
};

export default ChecklistTab;