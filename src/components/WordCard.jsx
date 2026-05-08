1: import React, { useState } from 'react';
2: import { Brain, CheckCircle, ChevronRight, MessageSquare, Loader2, Volume2, Eye, PenTool, Settings2, Lightbulb, Database, Info } from 'lucide-react';
3: import { analyzeAnswer, translateExample } from '../lib/ai';
4: 
5: const WordCard = ({ term, onNext, progress }) => {
6:   const [mode, setMode] = useState('study'); 
7:   const [translation, setTranslation] = useState('');
8:   const [description, setDescription] = useState('');
9:   const [showResult, setShowResult] = useState(false);
10:   const [aiFeedback, setAiFeedback] = useState(null);
11:   const [isAnalyzing, setIsAnalyzing] = useState(false);
12:   const [revealed, setRevealed] = useState(false);
13:   const [exampleTranslation, setExampleTranslation] = useState(null);
14:   const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
15:   const [speechRate, setSpeechRate] = useState(0.8);
16:   const [showSpeedSettings, setShowSpeedSettings] = useState(false);
17: 
18:   const speak = (text, lang = 'en-US') => {
19:     window.speechSynthesis.cancel();
20:     const utterance = new SpeechSynthesisUtterance(text);
21:     utterance.lang = lang;
22:     utterance.rate = speechRate;
23:     window.speechSynthesis.speak(utterance);
24:   };
25: 
26:   const handleReveal = async () => {
27:     setRevealed(true);
28:     if (term.example) {
29:       setIsLoadingTranslation(true);
30:       const translated = await translateExample(term.example);
31:       setExampleTranslation(translated);
32:       setIsLoadingTranslation(false);
33:     }
34:   };
35: 
36:   const handleAnalyze = async () => {
37:     setIsAnalyzing(true);
38:     try {
39:       const feedback = await analyzeAnswer(term, translation, description);
40:       setAiFeedback(feedback);
41:       if (term.example && !exampleTranslation) {
42:         const translated = await translateExample(term.example);
43:         setExampleTranslation(translated);
44:       }
45:       setShowResult(true);
46:     } catch (error) {
47:       setAiFeedback("Falha na conexão com a IA.");
48:       setShowResult(true);
49:     } finally {
50:       setIsAnalyzing(false);
51:     }
52:   };
53: 
54:   const handleNext = () => {
55:     setShowResult(false);
56:     setRevealed(false);
57:     setTranslation('');
58:     setDescription('');
59:     setAiFeedback(null);
60:     setExampleTranslation(null);
61:     setShowSpeedSettings(false);
62:     onNext();
63:   };
64: 
65:   return (
66:     <div className="premium-card flex flex-col w-full h-full">
67:       
68:       {/* Cabeçalho do Card */}
69:       <div className="flex items-center justify-between p-4 border-b border-[#334155] bg-[#1e293b]">
70:         <div className="flex gap-2 bg-[#0f172a] p-1 rounded-lg border border-[#334155]">
71:           <button 
72:             onClick={() => { setMode('study'); setShowResult(false); setRevealed(false); }}
73:             className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'study' ? 'bg-[#334155] text-white' : 'text-text-muted hover:text-white'}`}
74:           >
75:             <Eye className="w-3.5 h-3.5" /> Memorizar
76:           </button>
77:           <button 
78:             onClick={() => { setMode('practice'); setShowResult(false); }}
79:             className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'practice' ? 'bg-[#334155] text-white' : 'text-text-muted hover:text-white'}`}
80:           >
81:             <PenTool className="w-3.5 h-3.5" /> Praticar
82:           </button>
83:         </div>
84:         <span className="text-xs font-mono text-text-muted bg-[#0f172a] px-3 py-1 rounded-md border border-[#334155]">
85:           {progress}
86:         </span>
87:       </div>
88: 
89:       <div className="p-6 md:p-8 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
90:         
91:         {/* Metadados da Palavra */}
92:         <div className="flex items-center justify-center gap-2 mb-6 w-full">
93:           <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded uppercase tracking-wider text-center">
94:             {term.context}
95:           </span>
96:         </div>
97: 
98:         {/* Palavra Principal */}
99:         <div className="text-center mb-8 relative w-full flex flex-col items-center justify-center">
100:           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">
101:             {term.word}
102:           </h2>
103:           
104:           <div className="flex items-center justify-center gap-3 relative w-full">
105:             <button 
106:               onClick={() => speak(term.word)}
107:               className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg shrink-0"
108:               title="Ouvir"
109:             >
110:               <Volume2 className="w-6 h-6" />
111:             </button>
112:             
113:             {/* Controle de Velocidade Compacto */}
114:             <div className="relative">
115:               <button 
116:                 onClick={() => setShowSpeedSettings(!showSpeedSettings)}
117:                 className="w-10 h-10 flex items-center justify-center rounded-full bg-[#334155] text-text-muted hover:text-white transition-colors"
118:                 title="Ajustar Velocidade"
119:               >
120:                 <Settings2 className="w-5 h-5" />
121:               </button>
122:               
123:               {showSpeedSettings && (
124:                 <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#0f172a] border border-[#334155] rounded-xl p-2 shadow-xl z-20 flex gap-1">
125:                   {[0.5, 0.8, 1.0].map((rate) => (
126:                     <button
127:                       key={rate}
128:                       onClick={() => { setSpeechRate(rate); setShowSpeedSettings(false); speak(term.word); }}
129:                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${speechRate === rate ? 'bg-accent text-white' : 'text-text-muted hover:bg-[#334155]'}`}
130:                     >
131:                       {rate}x
132:                     </button>
133:                   ))}
134:                 </div>
135:               )}
136:             </div>
137:           </div>
138: 
139:           {term.phonetic && (
140:             <p className="mt-4 text-text-muted font-mono text-sm">{term.phonetic}</p>
141:           )}
142:         </div>
143: 
144:         {/* Área Interativa (Não Revelado) */}
145:         {!showResult && !revealed ? (
146:           <div className="flex-1 flex flex-col justify-end">
147:             {mode === 'practice' ? (
148:               <div className="space-y-4">
149:                 <div>
150:                   <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5 ml-1">Sua Tradução</label>
151:                   <input
152:                     type="text"
153:                     className="premium-input"
154:                     placeholder="Ex: Registro"
155:                     value={translation}
156:                     onChange={(e) => setTranslation(e.target.value)}
157:                   />
158:                 </div>
159:                 <div>
160:                   <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5 ml-1">Conceito Técnico</label>
161:                   <textarea
162:                     className="premium-input min-h-[100px] resize-none"
163:                     placeholder="Para que serve no ServiceNow?"
164:                     value={description}
165:                     onChange={(e) => setDescription(e.target.value)}
166:                   />
167:                 </div>
168:                 <button
169:                   onClick={handleAnalyze}
170:                   className="btn-primary mt-6"
171:                   disabled={!translation || !description || isAnalyzing}
172:                 >
173:                   {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
174:                   {isAnalyzing ? 'Analisando...' : 'Analisar Resposta'}
175:                 </button>
176:               </div>
177:             ) : (
178:               <button
179:                 onClick={handleReveal}
180:                 className="btn-primary mt-auto"
181:               >
182:                 Ver Significado
183:               </button>
184:             )}
185:           </div>
186:         ) : (
187:           /* Área de Resultado (Revelado) */
188:           <div className="flex-1 flex flex-col animate-fade space-y-4 pb-4">
189:             
190:             {aiFeedback && mode === 'practice' && (
191:               <div className="bg-[#0f172a] border-l-4 border-accent p-4 rounded-r-lg mb-2 shadow-sm">
192:                 <div className="flex items-center gap-2 text-accent mb-2">
193:                   <Brain className="w-4 h-4" />
194:                   <span className="text-xs font-bold uppercase tracking-wider">Feedback IA</span>
195:                 </div>
196:                 <p className="text-sm text-white leading-relaxed">{aiFeedback}</p>
197:               </div>
198:             )}
199: 
200:             {/* NOVO: Bloco de Conceito Dual (Comum vs Sistema) */}
201:             {term.system_meaning || term.common_meaning ? (
202:               <div className="grid grid-cols-1 gap-3">
203:                 {term.common_meaning && (
204:                   <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
205:                     <div className="flex items-center gap-2 text-blue-400 mb-1">
206:                       <MessageSquare className="w-3.5 h-3.5" />
207:                       <span className="text-[10px] font-bold uppercase tracking-widest">Inglês Comum</span>
208:                     </div>
209:                     <p className="text-sm text-blue-100/80">{term.common_meaning}</p>
210:                   </div>
211:                 )}
212:                 
213:                 {term.system_meaning && (
214:                   <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
215:                     <div className="flex items-center gap-2 text-accent mb-1">
216:                       <Database className="w-3.5 h-3.5" />
217:                       <span className="text-[10px] font-bold uppercase tracking-widest">ServiceNow System</span>
218:                     </div>
219:                     <p className="text-sm text-white font-medium">{term.system_meaning}</p>
220:                   </div>
221:                 )}
222:               </div>
223:             ) : (
224:               <div className="bg-[#0f172a] rounded-xl border border-[#334155] p-5">
225:                 <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
226:                   <Info className="w-3 h-3" /> Definição
227:                 </h4>
228:                 <p className="text-lg font-medium text-white">{term.explanation}</p>
229:               </div>
230:             )}
231: 
232:             {/* NOVO: Pro Tip do Especialista */}
233:             {term.pro_tip && (
234:               <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 relative overflow-hidden group">
235:                 <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
236:                   <Lightbulb className="w-8 h-8 text-amber-500" />
237:                 </div>
238:                 <div className="flex items-center gap-2 text-amber-500 mb-1 relative z-10">
239:                   <Lightbulb className="w-3.5 h-3.5" />
240:                   <span className="text-[10px] font-bold uppercase tracking-widest">Pro Tip / Macete</span>
241:                 </div>
242:                 <p className="text-sm text-amber-100/90 relative z-10 leading-relaxed font-medium">
243:                   {term.pro_tip}
244:                 </p>
245:               </div>
246:             )}
247: 
248:             {/* Exemplo Prático */}
249:             <div className="bg-[#0f172a] rounded-xl border border-[#334155] p-4">
250:               <div className="flex items-start justify-between gap-4">
251:                 <div className="flex-1">
252:                   <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Exemplo em Contexto</h4>
253:                   <p className="text-sm text-accent/90 italic font-mono mb-2">"{term.example}"</p>
254:                   
255:                   {isLoadingTranslation ? (
256:                     <div className="flex items-center gap-2 text-[10px] text-text-muted">
257:                       <Loader2 className="w-2.5 h-2.5 animate-spin" /> Traduzindo...
258:                     </div>
259:                   ) : (
260:                     <p className="text-sm text-text-muted leading-relaxed">{exampleTranslation}</p>
261:                   )}
262:                 </div>
263:                 <button 
264:                   onClick={() => speak(term.example)}
265:                   className="p-2 bg-[#1e293b] rounded-lg text-text-muted hover:text-white border border-[#334155] transition-colors shrink-0"
266:                 >
267:                   <Volume2 className="w-4 h-4" />
268:                 </button>
269:               </div>
270:             </div>
271: 
272:             <button
273:               onClick={handleNext}
274:               className="btn-primary !mt-6"
275:             >
276:               Próximo <ChevronRight className="w-5 h-5 ml-1" />
277:             </button>
278:           </div>
279:         )}
280: 
281:       </div>
282:     </div>
283:   );
284: };
285: 
286: export default WordCard;
287: 

