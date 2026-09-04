(()=>{
/* Bahasa AI v4 — curriculum-aware ORIGINAL learning content.
   Curriculum authority is versioned separately from app-authored exercises.
   Textbook passages/images are not copied. */
const mk=(id,title,icon,pre=[],domain='language')=>[id,title,icon,pre,domain];
const themes=[
 ['Keluarga & Diri','🏡'],['Kesihatan & Kebersihan','🧼'],['Keselamatan','🦺'],['Perpaduan & Masyarakat','🤝'],
 ['Budaya & Negara','🇲🇾'],['Sains, Teknologi & Inovasi','🔬'],['Alam & Kelestarian','🌿'],['Ekonomi, Nilai & Integriti','💡']
];
const unitTitles={
1:['Kenali Diri','Keluarga Saya','Rumah dan Sekolah','Sihat dan Ceria','Makanan Sihat','Kebersihan Diri','Selamat di Rumah','Selamat di Sekolah','Berhati-hati','Jiran Saya','Kawan Baik','Bermain Bersama','Perayaan Kita','Malaysia Kita','Seni dan Warna','Alat di Sekeliling','Ciptaan Mudah','Teknologi Membantu','Haiwan dan Tumbuhan','Alam yang Indah','Jaga Bumi','Beli dengan Bijak','Berkongsi dan Membantu','Jujur dan Amanah'],
2:['Saya Semakin Besar','Aktiviti Keluarga','Tanggungjawab Saya','Gaya Hidup Sihat','Pilih Makanan','Persekitaran Bersih','Peraturan Selamat','Keselamatan Jalan Raya','Bertindak Cermat','Hidup Berjiran','Kerjasama','Hormati Semua','Warisan Kita','Negara Tercinta','Kesenian Malaysia','Sains Harian','Teknologi Berguna','Idea Kreatif','Kenali Alam','Sayangi Haiwan','Kurangkan Sisa','Wang dan Keperluan','Usaha Membawa Hasil','Integriti Diri'],
3:['Keluarga Bahagia','Kenangan Bersama','Tanggungjawab Keluarga','Badan Sihat','Kebersihan Bersama','Minda Positif','Keselamatan di Rumah','Rekreasi Selamat','Alatan Keselamatan','Toleransi','Hormat-menghormati','Kerjasama','Budaya Kita','Malaysia Harmoni','Seni Bahasa','Sains Menarik','Teknologi Pintar','Inovasi Kreatif','Alam Sekitar','Flora dan Fauna','Lestari Bersama','Bijak Berbelanja','Keusahawanan Muda','Amanah'],
4:['Keluarga Sejahtera','Komuniti Prihatin','Jati Diri','Kesihatan Tanggungjawab','Amalan Bersih','Hidup Aktif','Peka Bahaya','Selamat di Mana-mana','Bijak Bertindak','Perpaduan','Khidmat Masyarakat','Harmoni Bersama','Warisan dan Seni','Cinta Negara','Bahasa dan Budaya','Dunia Sains','Teknologi Masa Kini','Reka Cipta','Kelestarian','Sumber Alam','Tindakan Hijau','Ekonomi Harian','Usahawan Cilik','Pengurusan Wang'],
5:['Keluarga Inspirasi','Masyarakat Penyayang','Jati Diri Malaysia','Kesihatan Berkualiti','Kebersihan Sejahtera','Aktif dan Cergas','Keselamatan Keutamaan','Waspada Risiko','Tindakan Bijak','Perpaduan Kukuh','Sukarelawan','Harmoni Negara','Warisan Terpelihara','Seni dan Estetika','Patriotisme','Sains dalam Kehidupan','Teknologi dan Manusia','Inovasi Masa Depan','Alam Tanggungjawab Kita','Tenaga dan Sumber','Gaya Hidup Lestari','Ekonomi dan Kerjaya','Keusahawanan','Bijak Kewangan'],
6:['Keluarga dan Masa Depan','Masyarakat Madani','Jati Diri dan Kepimpinan','Kesihatan Tanggungjawab Kita','Kebersihan Asas Kesejahteraan','Sihat Sentiasa','Sentiasa Peka','Sentiasa Berhati-hati','Fenomena Alam','Langkah Perpaduan','Gema Perpaduan','Semarak Perpaduan','Warisan Budaya','Persada Seni','Estetika Malaysia','Indahnya Sains','Teknologi Membantu Kita','Inovasi Kreatif','Penternakan dan Pertanian','Rezeki daripada Tanah','Dunia Tani','Sumber Ekonomi','Usahawan Berjaya','Bijak Mengurus Wang']
};
const skills={
1:[mk('huruf','Huruf & Bunyi','🔤'),mk('suku','Suku Kata','🧩',['huruf'],'reading'),mk('kata','Perkataan','🌳',['suku'],'vocabulary'),mk('frasa','Frasa','🧱',['kata'],'sentence'),mk('ayat','Ayat Mudah','💬',['frasa'],'sentence'),mk('grammar','Tatabahasa Asas','⚙️',['kata'],'grammar'),mk('faham','Membaca & Memahami','📖',['kata'],'reading'),mk('tulis','Penulisan Terkawal','✏️',['ayat'],'writing')],
2:[mk('kosa','Kosa Kata','📚'),mk('frasa','Frasa Bermakna','🧩',['kosa'],'sentence'),mk('ayat','Ayat Lengkap','💬',['frasa'],'sentence'),mk('adjektif','Kata Adjektif','🌈',['kosa'],'grammar'),mk('maklumat','Maklumat dalam Ayat','🔎',['ayat'],'sentence'),mk('faham','Pemahaman','📖',['kosa'],'reading'),mk('tulis','Penulisan Terkawal','✏️',['ayat'],'writing')],
3:[mk('konteks','Kosa Kata Konteks','📚'),mk('kembang','Ayat Berkembang','💬',['konteks'],'sentence'),mk('utama','Idea Utama','💡',['kembang'],'writing'),mk('sokong','Idea Sokongan','🧠',['utama'],'writing'),mk('susun','Susun Idea','🧩',['utama'],'writing'),mk('perenggan','Bina Perenggan','📝',['sokong','susun'],'writing'),mk('grammar','Tatabahasa','⚙️',['kembang'],'grammar'),mk('karangan','Karangan Pendek','✏️',['perenggan'],'writing')],
4:[mk('faham','Pemahaman','📖'),mk('kosa','Kosa Kata','📚'),mk('majmuk','Ayat Majmuk','🔗',['kosa'],'sentence'),mk('isi','Isi Utama','💡',['faham'],'writing'),mk('huraian','Huraian','📝',['isi'],'writing'),mk('contoh','Contoh Relevan','🎯',['huraian'],'writing'),mk('perenggan','Perenggan Lengkap','📄',['contoh','majmuk'],'writing'),mk('karangan','Karangan Berstruktur','✏️',['perenggan'],'writing')],
5:[mk('idea','Idea & KBAT','🧠'),mk('bahasa','Bahasa Menarik','✨'),mk('mula','Pendahuluan','🚀',['idea'],'writing'),mk('isi','Isi & Huraian','📝',['idea'],'writing'),mk('contoh','Contoh','🎯',['isi'],'writing'),mk('wacana','Penanda Wacana','🔗',['bahasa'],'grammar'),mk('tutup','Penutup','🏁',['isi'],'writing'),mk('karangan','Karangan Lengkap','✏️',['mula','contoh','wacana','tutup'],'writing')],
6:[mk('faham','Pemahaman Lanjutan','📖'),mk('kosa','Kosa Kata Kaya','📚'),mk('struktur','Struktur Karangan','🏗️',['faham'],'writing'),mk('koheren','Koheren Idea','🔗',['struktur'],'writing'),mk('grammar','Tatabahasa & Gaya','⚙️',['kosa'],'grammar'),mk('edit','Penyuntingan','🔎',['grammar','koheren'],'writing'),mk('kbat','Karangan KBAT','🧠',['koheren'],'writing'),mk('cabaran','Penulis Berdikari','🏆',['edit','kbat'],'writing')]
};
const goals={1:['Asas Bahasa','Bunyi → suku kata → perkataan → frasa → ayat mudah'],2:['Bina Ayat','Ayat lengkap → penerangan → maklumat'],3:['Asas Perenggan','Ayat → idea → susun idea → perenggan'],4:['Penulisan Berstruktur','Isi → huraian → contoh → perenggan'],5:['Kembangkan Karangan','Pendahuluan → isi → huraian → contoh → penutup'],6:['Penulis Berdikari','Rancang → tulis → semak → baiki → kuasai']};
function unitsFor(y){return unitTitles[y].map((title,i)=>({id:`T${y}U${i+1}`,title,theme:themes[Math.floor(i/3)],focus:skills[y][Math.min(skills[y].length-1,Math.floor(i*skills[y].length/24))][0],words:wordBank(y,i),prompt:promptBank(y,title,i)}))}
const unitLexiconY1=[
['saya','nama','murid','kelas','umur','sekolah'],['ibu','bapa','adik','kakak','keluarga','sayang'],['rumah','bilik','meja','buku','kelas','sekolah'],
['sihat','ceria','aktif','senyum','rehat','cergas'],['nasi','buah','sayur','susu','air','makan'],['sabun','mandi','tangan','gigi','bersih','tuala'],
['pintu','dapur','tangga','tajam','selamat','awas'],['kelas','tangga','kantin','guru','baris','selamat'],['awas','lihat','dengar','berhenti','jalan','cermat'],
['jiran','rumah','sapa','senyum','ramah','tolong'],['kawan','baik','kongsi','bantu','main','ceria'],['bola','taman','giliran','main','bersama','gembira'],
['raya','lampu','baju','kuih','ziarah','meriah'],['Malaysia','negara','bendera','rakyat','bangga','aman'],['warna','lukis','corak','cantik','seni','kertas'],
['jam','kipas','lampu','telefon','alat','guna'],['cipta','kotak','roda','bina','mudah','idea'],['komputer','telefon','skrin','belajar','guna','mudah'],
['kucing','burung','pokok','bunga','daun','hidup'],['langit','awan','sungai','bukit','hijau','indah'],['bumi','sampah','kitar','jimat','air','jaga'],
['wang','harga','pilih','beli','perlu','jimat'],['kongsi','bantu','beri','kawan','ikhlas','bersama'],['jujur','amanah','benar','janji','baik','percaya']];
const topicBanks=[
['keluarga','diri','rumah','sekolah','tanggungjawab','sayang','hormat','bersama','prihatin','masa'],
['sihat','bersih','makanan','senaman','rehat','air','cergas','amalan','kebersihan','sejahtera'],
['selamat','awas','risiko','peraturan','jalan','bahaya','cermat','lindung','tindakan','peka'],
['jiran','kawan','masyarakat','kerjasama','hormat','tolong','bersatu','harmoni','sukarelawan','prihatin'],
['Malaysia','budaya','warisan','seni','bahasa','negara','bendera','bangga','tradisi','patriotisme'],
['sains','teknologi','ciptaan','inovasi','idea','alat','digital','kajian','kreatif','masa depan'],
['alam','pokok','haiwan','sungai','hijau','lestari','sumber','bumi','tani','pelihara'],
['wang','usaha','amanah','jimat','jujur','ekonomi','kerjaya','niaga','urus','keperluan']];
function wordBank(y,i){
 if(y===1)return unitLexiconY1[i].slice();
 const title=unitTitles[y][i]; const theme=Math.floor(i/3); const bank=topicBanks[theme];
 const stop=new Set(['dan','yang','di','ke','kita','saya','dalam','daripada']);
 const titleWords=title.toLowerCase().replace(/[^a-zA-ZÀ-ÿ\s-]/g,'').split(/\s+/).filter(w=>w.length>2&&!stop.has(w));
 const rotated=bank.slice((i%3)*2).concat(bank.slice(0,(i%3)*2));
 const extrasByYear={2:['cerita','pilih','jelas'],3:['idea','sebab','contoh'],4:['huraian','contoh','maklumat'],5:['pandangan','kesan','cadangan'],6:['analisis','bukti','rumusan']}[y];
 return [...new Set([...titleWords,...rotated,...extrasByYear])].slice(0,6);
}
function promptBank(y,title,i){
 if(y===1){
  if(i<3)return `Dengar dan kenal bunyi huruf dalam perkataan mudah tentang “${title}”.`;
  if(i<6)return `Sebut dan padankan suku kata untuk perkataan mudah tentang “${title}”.`;
  if(i<9)return `Kenal dan pilih perkataan yang sesuai tentang “${title}”.`;
  if(i<12)return `Gabungkan perkataan menjadi frasa mudah tentang “${title}”.`;
  if(i<18)return `Bina satu ayat mudah bermakna tentang “${title}”.`;
  if(i<21)return `Baca ayat ringkas dan cari maklumat tentang “${title}”.`;
  return `Tulis satu ayat mudah secara terkawal tentang “${title}”.`;
 }
 if(y===2)return `Bina ayat lengkap dan tambah satu maklumat tentang “${title}”.`;if(y===3)return `Tulis 2–3 ayat berkaitan tentang “${title}”.`;if(y===4)return `Nyatakan satu isi, huraian dan contoh tentang “${title}”.`;if(y===5)return `Rancang satu perenggan lengkap berkaitan “${title}”.`;return `Tulis respons berstruktur, koheren dan semak semula tentang “${title}”.`}
window.BAHASA_CURRICULUM={version:'1.0-content-complete',streams:['SJKC','SJKT','SK'],curriculumVersions:{tahap1:'KSSR (Semakan 2017) · DPK Edisi 3',tahap2:'KSSR (Semakan 2017)',future:'Kurikulum Persekolahan 2027'},sourcePolicy:'KPM curriculum-aligned; original app-authored exercises; no textbook passage/image copying. SK/SP labels are only attached after source verification.',years:Object.fromEntries([1,2,3,4,5,6].map(y=>[y,{stage:goals[y][0],goal:goals[y][1],skills:skills[y],units:unitsFor(y)}]))};


// v5 verified curriculum-source registry + original teaching-content layer.
// These records separate official authority from app-authored pedagogy.
window.BAHASA_CURRICULUM.sources={
  bmTahap1E3:{authority:'Kementerian Pendidikan Malaysia',title:'Surat Siaran KPM Bil. 1 Tahun 2025 — DPK KSSR (Semakan 2017) Edisi 3 BM & BI Tahap I',scope:'Tahun 1–3 / Tahap I',status:'VERIFIED'},
  kp2027:{authority:'Kementerian Pendidikan Malaysia',title:'Kurikulum Persekolahan 2027',scope:'Versioned future curriculum track',status:'VERIFIED'},
  ksbm2026:{authority:'Kementerian Pendidikan Malaysia',title:'Kerangka Standard Bahasa Melayu KPM — SPI Bil. 6 Tahun 2026',scope:'Bahasa Melayu proficiency/mastery reference',status:'VERIFIED'}
};
const activityTemplates={
  1:{faham:'Lihat konteks dan sebut perkataan penting.',belajar:'Padankan bunyi, perkataan dan maksud.',bina:'Susun perkataan menjadi frasa atau ayat mudah.',guna:'Gunakan pola yang sama dalam konteks baharu.',independent:'Bina ayat baharu tanpa pilihan jawapan.'},
  2:{faham:'Kenal pasti siapa, tindakan dan maklumat dalam konteks.',belajar:'Pelajari kosa kata dan pola ayat lengkap.',bina:'Lengkapkan ayat dengan maklumat yang sesuai.',guna:'Tukar satu unsur dan kekalkan ayat bermakna.',independent:'Tulis ayat lengkap dalam situasi baharu.'},
  3:{faham:'Cari idea utama dalam bahan ringkas.',belajar:'Bezakan idea utama dan idea sokongan.',bina:'Susun 2–3 ayat supaya berkaitan.',guna:'Pindahkan struktur kepada topik baharu.',independent:'Tulis perenggan pendek tanpa rangka jawapan.'},
  4:{faham:'Kenal pasti isi yang relevan dengan tajuk.',belajar:'Hubungkan isi, huraian dan contoh.',bina:'Bina satu perenggan lengkap secara berpandu.',guna:'Ubah contoh tetapi kekalkan hujah yang jelas.',independent:'Tulis perenggan lengkap daripada stimulus baharu.'},
  5:{faham:'Analisis kehendak tajuk dan pilih isi.',belajar:'Rancang pendahuluan, isi, huraian, contoh dan penutup.',bina:'Gunakan penanda wacana untuk menyambung idea.',guna:'Perkayakan bahasa tanpa mengubah maksud.',independent:'Hasilkan karangan berstruktur dengan bantuan minimum.'},
  6:{faham:'Analisis tajuk, tujuan dan pembaca.',belajar:'Rancang struktur, koheren, gaya dan bukti.',bina:'Kembangkan hujah dan semak hubungan antara perenggan.',guna:'Sunting bahasa, ketepatan dan keberkesanan.',independent:'Hasilkan, semak dan baiki penulisan secara berdikari.'}
};
function masteryEvidence(y){
  if(y===1)return ['Kenal pasti makna','Bina frasa/ayat bermakna','1 percubaan baharu tanpa petunjuk'];
  if(y===2)return ['Ayat lengkap','Maklumat tambahan relevan','Transfer tanpa pilihan jawapan'];
  if(y===3)return ['Idea utama tepat','Ayat saling berkaitan','Perenggan pendek independent'];
  if(y===4)return ['Isi relevan','Huraian menjelaskan isi','Contoh menyokong','Perenggan independent'];
  if(y===5)return ['Struktur lengkap','Idea berkembang','Penanda wacana sesuai','Karangan independent'];
  return ['Respons menepati tugasan','Koheren antara idea','Bahasa disunting','Independent revision'];
}
Object.entries(window.BAHASA_CURRICULUM.years).forEach(([ys,data])=>{
  const y=+ys,t=activityTemplates[y];
  data.units.forEach((u,i)=>{
    u.learningCycle={...t};
    u.masteryEvidence=masteryEvidence(y);
    u.contentType='ORIGINAL_CURRICULUM_ALIGNED';
    u.sourceStatus=y<=3?'TAHAP1_E3_ALIGNMENT_TRACK':'KSSR_SEMAKAN_2017_TRACK';
    u.transferPrompt=y<=2?`Gunakan sekurang-kurangnya satu perkataan unit “${u.title}” dalam ayat baharu.`:
      y===3?`Gunakan idea daripada “${u.title}” untuk membina perenggan pada situasi baharu.`:
      `Gunakan kemahiran unit “${u.title}” untuk respons baharu yang tidak menyalin contoh.`;
  });
});

/* v70 stable curriculum access API — compatibility for all later engines. */
(function(){
 const C=window.BAHASA_CURRICULUM;
 C.getYear=function(y){return C.years?.[Number(y)]?.units||[]};
 C.getUnits=C.getYear;
 C.getSkills=function(y){return C.years?.[Number(y)]?.skills||[]};
 C.getYearMeta=function(y){return C.years?.[Number(y)]||null};
 C.apiVersion='70.0.0';
})();

})();
