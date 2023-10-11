'use client'
import { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'

interface Task{
  content: string,
  isComplete: boolean
};

type TaskListProps = {
  taskData: Task[]
}

type TaskItemProps = {
  isComplete: boolean,
  children: any,
  key?: any,
}

const taskData: Task[] = [
  {content: 'This is task one', isComplete: false},
  {content: 'Butter', isComplete: false},
  {content: 'Paneer Tikka Masala', isComplete: false},
  {content: 'Lego', isComplete: true},
  {content: 'Edifice', isComplete: false},
  {content: 'Casio', isComplete: true},
  {content: 'Mandalorian', isComplete: false},
];

export default function Stuff() {
  return (
    <div>
      <TaskList taskData={taskData} />
    </div>
  );
}


function TaskList({ taskData }: TaskListProps) {
  return (
    <ul className="flex flex-col items-start">
      {taskData.map(({ content, isComplete }, index ) => 
        <TaskItem isComplete={isComplete} key={index} >{ content }</TaskItem>
      )}
    </ul>
  );
}

const taskItemVariant: Variants = {
  done: { 
    width: '100%',
    transition: {
      duration:0.3,
      ease: "easeOut"
    }
  },
  notDone: { 
    width: '0%' ,
    transition: {
      duration:0.3,
      ease: "easeOut"
    }
  }
};

function TaskItem({ isComplete, children }: TaskItemProps){
  const [done, setDone] = useState(isComplete);
  const toggleDone = () => setDone( prev => !prev);

  return (
    <li 
      className="flex justify-start items-center text-slate-800 mb-2 px-2 cursor-pointer"
      onClick={toggleDone}
    >
      <div className='w-3 h-3 mr-2'>
        <AnimatePresence mode='wait'>
          {done?<TickSVG/>:<HyphenSVG/>}
        </AnimatePresence>
      </div>
      <div className='relative'>
        <span className={`${done?'text-slate-500':''}`}>{ children }</span>
        <AnimatePresence>
          {done && (
              <motion.div 
                className="absolute w-full bg-green-500 h-[2px] top-1/2 left-0"
                variants={taskItemVariant}
                initial={"notDone"}
                animate={"done"}
                exit={"notDone"}
              ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

function HyphenSVG(){
  return (
    <motion.svg 
      transition={{ duration: 0.4, ease: "easeOut"}}
      initial={{scale:0}} 
      animate={{scale:1}} 
      exit={{scale:0}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </motion.svg>
  );
}

function TickSVG(){
  return (
    <motion.svg 
      transition={{ duration: 0.4, ease: "easeOut" }}
      initial={{scale:0}} 
      animate={{scale:1}} 
      exit={{scale:0}} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 490 490"  >
      <polygon fill='#22c55e' stroke="#22c55e" points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "/>
    </motion.svg>
  );
}