// "use client";

// import { motion } from "framer-motion";
// import {
//   FileText,
//   Upload,
//   Sparkles,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { useState } from "react";

// export default function StudentResumePage() {
// //   const atsScore = 72; // TEMP: AI output later
 
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [atsScore, setAtsScore] = useState<number | null>(null);

//   const [resumeFile, setResumeFile] = useState<File | null>(null);

//   const handleAnalyzeResume = async () => {
//   if (!resumeFile) return;

//   setIsAnalyzing(true);
//   setAtsScore(null);

//   // Simulate AI processing time
//   await new Promise((resolve) => setTimeout(resolve, 2500));

//   // TEMP: Fake AI score
//   const generatedScore = Math.floor(60 + Math.random() * 25);

//   setAtsScore(generatedScore);
//   setIsAnalyzing(false);
// };

//   const handleRemoveFile = () => {
//   setResumeFile(null);

//   // clear input value so same file can be re-selected
//   const input = document.getElementById("resume-upload") as HTMLInputElement;
//   if (input) input.value = "";
// };


// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     alert("Only PDF or DOCX files are allowed");
//     return;
//   }

//   setResumeFile(file);
// };

//   return (
//     <div className="space-y-10 max-w-6xl">
//       {/* HEADER */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h1 className="text-2xl font-semibold">Resume & ATS Analyzer</h1>
//         <p className="text-gray-400 text-sm mt-1">
//           Build an ATS-friendly resume with AI & mentor guidance.
//         </p>
//       </motion.div>

//       {/* UPLOAD + SCORE */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* UPLOAD */}
//         {/* <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-4"
//         >
//           <div className="flex items-center gap-2 text-indigo-400">
//             <Upload size={18} />
//             <h2 className="font-medium">Upload Resume</h2>
//           </div>

//           <div className="border border-dashed border-white/20 rounded-lg p-6 text-center text-sm text-gray-400">
//             PDF / DOCX supported  
//             <br />
//             <span className="text-xs">(ATS-scan ready)</span>
//           </div>

//           <button className="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-2 text-sm">
//             Analyze Resume
//           </button>
//         </motion.div> */}
//         <motion.div
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 0.1 }}
//   className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-4"
// >
//   <div className="flex items-center gap-2 text-indigo-400">
//     <Upload size={18} />
//     <h2 className="font-medium">Upload Resume</h2>
//   </div>

//   {/* HIDDEN FILE INPUT */}
//   <input
//     type="file"
//     accept=".pdf,.docx"
//     id="resume-upload"
//     className="hidden"
//     onChange={handleFileChange}
//   />

//   {/* CLICKABLE UPLOAD BOX */}
//   <label
//     htmlFor="resume-upload"
//     className="cursor-pointer border border-dashed border-white/20 rounded-lg p-6 text-center text-sm text-gray-400 hover:border-indigo-500/40 transition block"
//   >
//     {resumeFile ? (
//       <span className="text-gray-200">
//         Selected: <strong>{resumeFile.name}</strong>
//       </span>
//     ) : (
//       <>
//         Click to upload resume  
//         <br />
//         <span className="text-xs">(PDF / DOCX only)</span>
//       </>
//     )}
//   </label>

//   {/* ANALYZE BUTTON */}
//   {/* <button
//     disabled={!resumeFile}
//     className={`w-full rounded-lg py-2 text-sm transition
//       ${
//         resumeFile
//           ? "bg-indigo-600 hover:bg-indigo-500"
//           : "bg-white/10 text-gray-500 cursor-not-allowed"
//       }`}
//   >
//     Analyze Resume
//   </button> */}

//   <button
//   onClick={handleAnalyzeResume}
//   disabled={!resumeFile || isAnalyzing}
//   className={`w-full rounded-lg py-2 text-sm transition flex items-center justify-center gap-2
//     ${
//       resumeFile && !isAnalyzing
//         ? "bg-indigo-600 hover:bg-indigo-500"
//         : "bg-white/10 text-gray-500 cursor-not-allowed"
//     }`}
// >
//   {isAnalyzing ? (
//     <>
//       <Spinner />
//       Analyzing Resume...
//     </>
//   ) : (
//     "Analyze Resume"
//   )}
// </button>

//   <button
//         type="button"
//         onClick={handleRemoveFile}
//         className="text-xs text-red-400 hover:text-red-300 transition text-center block mx-auto cursor-pointer"
//       >
//         Remove file
//       </button>
// </motion.div>


//         {/* ATS SCORE */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.15 }}
//           className="border border-white/10 rounded-xl bg-white/5 p-6 flex flex-col justify-between"
//         >
//           <div>
//             <h2 className="font-medium flex items-center gap-2">
//               <Sparkles size={16} className="text-indigo-400" />
//               ATS Score
//             </h2>

//             {/* <div className="text-5xl font-semibold text-indigo-400 mt-4">
//               {atsScore}%
//             </div> */}

//              <div className="text-5xl font-semibold text-indigo-400 mt-4">
//   {isAnalyzing ? "--" : atsScore ? `${atsScore}%` : "--"}
// </div>

// <p className="text-sm text-gray-400 mt-2">
//   {isAnalyzing
//     ? "AI is analyzing your resume..."
//     : atsScore
//     ? atsScore >= 80
//       ? "Strong ATS compatibility."
//       : "Needs optimization for better ATS results."
//     : "Upload and analyze your resume."}
// </p>

//             <p className="text-sm text-gray-400 mt-2">
//               Good, but needs optimization for top companies.
//             </p>
//           </div>

//           <button className="mt-6 border border-white/15 rounded-lg py-2 text-sm hover:bg-white/5 transition">
//             Improve with AI
//           </button>
//         </motion.div>

//         {/* STATUS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-4"
//         >
//           <h2 className="font-medium">Resume Health</h2>

//           <StatusItem ok text="Keyword Optimization" />
//           <StatusItem ok text="Readable by ATS Bots" />
//           <StatusItem warn text="Experience needs metrics" />
//           <StatusItem warn text="Projects need impact" />
//         </motion.div>
//       </div>

//       {/* AI + MENTOR GUIDANCE */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* AI GUIDANCE */}
//         <motion.div
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.25 }}
//           className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-3"
//         >
//           <h2 className="font-medium flex items-center gap-2">
//             <Sparkles size={16} className="text-indigo-400" />
//             AI Suggestions
//           </h2>

//           <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
//             <li>Add measurable impact in projects</li>
//             <li>Use role-specific keywords (JD based)</li>
//             <li>Avoid graphics & tables</li>
//             <li>Keep resume under 1 page</li>
//           </ul>
//         </motion.div>

//         {/* MENTOR GUIDANCE */}
//         <motion.div
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-3"
//         >
//           <h2 className="font-medium flex items-center gap-2">
//             <FileText size={16} className="text-indigo-400" />
//             Mentor Feedback
//           </h2>

//           <p className="text-sm text-gray-300 leading-relaxed">
//             Resume structure is good. Focus more on system design exposure
//             and quantify your internship impact. Remove unnecessary skills.
//           </p>

//           <p className="text-xs text-gray-500">
//             Reviewed by Rakesh Kumar · Senior Software Engineer
//           </p>
//         </motion.div>
//       </div>

//       {/* ATS TEMPLATES */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.35 }}
//         className="space-y-4"
//       >
//         <h2 className="text-lg font-medium">
//           ATS-Friendly Resume Templates
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <TemplateCard title="Software Engineer" />
//           <TemplateCard title="Data Analyst" />
//           <TemplateCard title="Full Stack Developer" />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ---------- Helper Components ---------- */

// function StatusItem({ ok, warn, text }: any) {
//   return (
//     <div className="flex items-center gap-2 text-sm">
//       {ok && <CheckCircle size={14} className="text-green-400" />}
//       {warn && <AlertTriangle size={14} className="text-yellow-400" />}
//       <span className="text-gray-300">{text}</span>
//     </div>
//   );
// }

// function Spinner() {
//   return (
//     <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
//   );
// }

// function TemplateCard({ title }: { title: string }) {
//   return (
//     <div className="border border-white/10 rounded-lg bg-white/5 p-4 space-y-2 hover:border-indigo-500/40 transition">
//       <h3 className="font-medium text-sm">{title}</h3>
//       <p className="text-xs text-gray-400">
//         Clean, single-column, ATS-optimized
//       </p>
//       <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
//         Use Template
//       </button>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import AIResumeRewrite from "./ai-rewrite";

/* ===================== MAIN PAGE ===================== */

export default function StudentResumePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  /* ---------- FILE HANDLING ---------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOCX files are allowed");
      return;
    }

    setResumeFile(file);
    setAtsScore(null);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setAtsScore(null);
    const input = document.getElementById(
      "resume-upload"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  /* ---------- MOCK AI ANALYSIS ---------- */

  const handleAnalyzeResume = async () => {
    if (!resumeFile) return;

    setIsAnalyzing(true);
    setAtsScore(null);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 2500));

    // Mock ATS score (replace with real AI later)
    const score = Math.floor(60 + Math.random() * 25);

    setAtsScore(score);
    setIsAnalyzing(false);
  };

  
  /* ---------- INTELLIGENCE HELPERS ---------- */

  const getAtsMessage = () => {
    if (atsScore === null) return "Upload and analyze your resume.";
    if (atsScore >= 80) return "Strong ATS compatibility.";
    if (atsScore >= 65) return "Decent, but needs optimization.";
    return "Low ATS score. Resume needs major improvement.";
  };

  const getResumeHealth = () => {
    if (atsScore === null) return [];
    return [
      { text: "Keyword Optimization", ok: atsScore >= 70 },
      { text: "Readable by ATS Bots", ok: atsScore >= 60 },
      { text: "Experience has metrics", ok: atsScore >= 75 },
      { text: "Projects show impact", ok: atsScore >= 70 },
    ];
  };

  const getAiSuggestions = () => {
    if (atsScore === null) return [];

    if (atsScore >= 80)
      return ["Minor keyword tuning", "Customize resume per job role"];

    if (atsScore >= 65)
      return [
        "Add measurable impact (numbers, %)",
        "Improve project descriptions",
        "Add missing JD keywords",
      ];

    return [
      "Rewrite experience section",
      "Remove graphics & tables",
      "Add role-specific skills",
      "Limit resume to 1 page",
    ];
  };

  /* ===================== UI ===================== */

  return (
    <div className="space-y-10 max-w-6xl">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold">Resume & ATS Analyzer</h1>
        <p className="text-gray-400 text-sm mt-1">
          Analyze your resume with AI & mentor-grade logic.
        </p>
      </motion.div>

      {/* UPLOAD + SCORE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UPLOAD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-indigo-400">
            <Upload size={18} />
            <h2 className="font-medium">Upload Resume</h2>
          </div>

          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="resume-upload"
            className="cursor-pointer border border-dashed border-white/20 rounded-lg p-6 text-center text-sm text-gray-400 hover:border-indigo-500/40 transition block"
          >
            {resumeFile ? (
              <span className="text-gray-200">
                Selected: <strong>{resumeFile.name}</strong>
              </span>
            ) : (
              <>
                Click to upload resume
                <br />
                <span className="text-xs">(PDF / DOCX only)</span>
              </>
            )}
          </label>

          <button
            onClick={handleAnalyzeResume}
            disabled={!resumeFile || isAnalyzing}
            className={`w-full rounded-lg py-2 text-sm flex items-center justify-center gap-2 transition
              ${
                resumeFile && !isAnalyzing
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isAnalyzing ? (
              <>
                <Spinner />
                Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>

          {resumeFile && (
            <button
              onClick={handleRemoveFile}
              className="text-xs text-red-400 hover:text-red-300 transition block mx-auto"
            >
              Remove file
            </button>
          )}
        </motion.div>

        {/* ATS SCORE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="border border-white/10 rounded-xl bg-white/5 p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="font-medium flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              ATS Score
            </h2>

            <div className="text-5xl font-semibold text-indigo-400 mt-4">
              {isAnalyzing ? "--" : atsScore ? `${atsScore}%` : "--"}
            </div>

            <p className="text-sm text-gray-400 mt-2">
              {isAnalyzing ? "AI is analyzing your resume..." : getAtsMessage()}
            </p>
          </div>

          <button className="mt-6 border border-white/15 rounded-lg py-2 text-sm hover:bg-white/5 transition">
            Improve with AI
          </button>
        </motion.div>

        {/* RESUME HEALTH */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-4"
        >
          <h2 className="font-medium">Resume Health</h2>

          {getResumeHealth().length === 0 ? (
            <p className="text-sm text-gray-400">
              Analyze resume to see health report.
            </p>
          ) : (
            getResumeHealth().map((item) => (
              <StatusItem
                key={item.text}
                ok={item.ok}
                warn={!item.ok}
                text={item.text}
              />
            ))
          )}
        </motion.div>
      </div>

      {/* AI + MENTOR GUIDANCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI GUIDANCE */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-3"
        >
          <h2 className="font-medium flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            AI Suggestions
          </h2>

          {getAiSuggestions().length === 0 ? (
            <p className="text-sm text-gray-400">
              Analyze resume to get AI suggestions.
            </p>
          ) : (
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              {getAiSuggestions().map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          )}
        </motion.div>
         
        <AIResumeRewrite />

        {/* MENTOR FEEDBACK */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-3"
        >
          <h2 className="font-medium flex items-center gap-2">
            <FileText size={16} className="text-indigo-400" />
            Mentor Feedback
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Resume structure is solid. Focus on quantifying impact and aligning
            projects with the job description.
          </p>

          <p className="text-xs text-gray-500">
            Reviewed by Rakesh Kumar · Senior Software Engineer
          </p>
        </motion.div>
      </div>

      {/* TEMPLATES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-medium">
          ATS-Friendly Resume Templates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TemplateCard title="Software Engineer" />
          <TemplateCard title="Data Analyst" />
          <TemplateCard title="Full Stack Developer" />
        </div>
      </motion.div>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function StatusItem({
  ok,
  warn,
  text,
}: {
  ok?: boolean;
  warn?: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok && <CheckCircle size={14} className="text-green-400" />}
      {warn && <AlertTriangle size={14} className="text-yellow-400" />}
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function Spinner() {
  return (
    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
  );
}

function TemplateCard({ title }: { title: string }) {
  return (
    <div className="border border-white/10 rounded-lg bg-white/5 p-4 space-y-2 hover:border-indigo-500/40 transition">
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-gray-400">
        Clean, single-column, ATS-optimized
      </p>
      <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
        Use Template
      </button>
    </div>
  );
}
