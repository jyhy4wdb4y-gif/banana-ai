(()=>{
'use strict';
const C=window.BAHASA_CURRICULUM,F=window.BAHASA_FULL_CONTENT;
if(!C||!F?.records)return;
const V='STUDENT-CONTENT-V15';
const T=[
 {place:'rumah dan sekolah',people:'ahli keluarga dan rakan',action:'berbincang, membantu dan melaksanakan tanggungjawab',value:'hormat, prihatin dan bekerjasama',problem:'tugas tidak dibahagi dengan jelas',solution:'membahagikan tugas dan berbincang dengan sopan'},
 {place:'kelas, kantin dan kawasan rekreasi',people:'murid, guru dan keluarga',action:'memilih amalan yang sihat dan menjaga kebersihan',value:'disiplin, kebersihan dan keseimbangan',problem:'amalan harian kurang sihat atau kurang bersih',solution:'membina rutin yang mudah, selamat dan konsisten'},
 {place:'rumah, sekolah dan jalan raya',people:'murid, guru dan pengguna jalan',action:'mengenal pasti risiko dan mematuhi peraturan',value:'waspada, cermat dan bertanggungjawab',problem:'risiko tidak dikenal pasti lebih awal',solution:'berhenti, menilai keadaan dan memilih tindakan paling selamat'},
 {place:'sekolah dan kawasan kejiranan',people:'rakan, jiran dan sukarelawan',action:'bekerjasama dan menghormati perbezaan',value:'toleransi, muhibah dan saling membantu',problem:'orang ramai kurang berkomunikasi atau bekerjasama',solution:'mendengar pandangan, berbincang dan melaksanakan tugas bersama'},
 {place:'sekolah, rumah dan pusat komuniti',people:'murid, keluarga dan penggiat seni',action:'mengenali, menghargai dan memelihara warisan',value:'bangga, hormat dan cinta akan negara',problem:'warisan atau amalan baik semakin kurang dikenali',solution:'mempelajari asal usul, berkongsi pengetahuan dan menyertai aktiviti budaya'},
 {place:'kelas, makmal dan pusat sains',people:'murid, guru dan ahli kumpulan',action:'memerhati, mencuba dan menilai kegunaan sesuatu idea',value:'ingin tahu, kreatif dan bertanggungjawab',problem:'alat atau kaedah sedia ada kurang berkesan',solution:'mengenal pasti keperluan, menguji idea dan menambah baik hasil'},
 {place:'taman, sungai dan kebun komuniti',people:'murid, keluarga dan komuniti',action:'memerhati alam dan mengurangkan pembaziran',value:'sayang akan alam, berjimat dan bertanggungjawab',problem:'sampah, pembaziran atau gangguan terhadap habitat',solution:'mengurangkan sisa, menggunakan semula dan menjaga kawasan bersama'},
 {place:'rumah, sekolah dan gerai jualan',people:'murid, keluarga dan peniaga',action:'membezakan keperluan, merancang perbelanjaan dan berlaku jujur',value:'amanah, berjimat dan berhemah',problem:'wang digunakan tanpa perancangan atau keutamaan',solution:'membuat bajet mudah, membandingkan pilihan dan menyimpan sebahagian wang'}
];
const names=[['Aina','Kumar'],['Mei Ling','Hafiz'],['Suresh','Nadia'],['Wei Han','Farah']];
function extra(y,c){
 if(y===2)return `Mereka menyebut semula dua maklumat penting dengan ayat lengkap.`;
 if(y===3)return `Selepas itu, mereka memilih satu idea utama dan menyusun dua maklumat sokongan mengikut urutan yang mudah difahami. Mereka menyemak semula ayat supaya setiap maklumat berkaitan dengan topik.`;
 if(y===4)return `Mereka kemudian membina satu isi, menghuraikan sebabnya dan memberikan contoh yang relevan. Dua idea digabungkan dengan kata hubung yang sesuai supaya penerangan lebih lancar. Sebelum berkongsi jawapan, kumpulan menyemak sama ada contoh benar-benar menyokong isi utama.`;
 if(y===5)return `Mereka menilai sebab dan kesan setiap pilihan sebelum membuat keputusan. Cadangan mereka disokong dengan contoh, kemudian disemak supaya hubungan antara isi, huraian dan rumusan lebih jelas. Mereka turut mempertimbangkan pandangan yang berbeza dan menerangkan mengapa satu pilihan lebih sesuai daripada pilihan lain.`;
 return `Mereka membezakan fakta, pendapat dan andaian sebelum membuat keputusan. Setiap cadangan dinilai dari segi kesan jangka pendek, kesan jangka panjang dan pihak yang terlibat. Mereka menyokong pendirian dengan bukti yang relevan, mempertimbangkan pandangan alternatif dan membaiki hujah yang masih lemah. Pada akhir aktiviti, setiap murid menulis rumusan sendiri serta menerangkan perubahan yang dibuat selepas semakan kendiri.`;
}
function makeReadings(y,u,i){
 const c=T[Math.floor(i/3)], [a,b]=names[i%names.length], title=u.title;
 const r1=`Topik hari ini ialah “${title}”. ${a} dan ${b} menjalankan aktiviti di ${c.place}. Mereka belajar untuk ${c.action}. Apabila ${c.problem}, mereka tidak tergesa-gesa membuat keputusan. Mereka memilih untuk ${c.solution}. Mereka mendapati bahawa ${c.value} membantu aktiviti berjalan dengan lebih baik. ${extra(y,c)}`;
 const r2=`“Apakah perkara paling penting yang kita pelajari?” tanya ${a}. ${b} menjawab bahawa mereka perlu melihat keadaan sebenar sebelum bertindak. Dalam aktiviti “${title}”, mereka membandingkan beberapa pilihan dan menerangkan sebab pilihan mereka. Guru mengingatkan murid supaya maklumat yang diberi tepat, berkaitan dengan topik dan mudah difahami. ${extra(y,c)}`;
 const labels=['Catatan projek','Nota kelas','Laporan ringkas','Pesanan kumpulan'];
 const r3=`${labels[i%labels.length]} — ${title}. Situasi: ${c.problem}. Tindakan yang dicadangkan ialah ${c.solution}. Kumpulan menerangkan bagaimana tindakan itu boleh dilakukan di ${c.place} dan siapa yang boleh membantu. Mereka juga menyemak sama ada cadangan tersebut selamat, praktikal dan selaras dengan nilai ${c.value}. ${extra(y,c)}`;
 return [r1,r2,r3];
}
for(let y=2;y<=6;y++)for(let i=0;i<24;i++){
 const u=C.years[y].units[i],id=`T${y}U${i+1}`,r=F.records[id];if(!r)continue;
 r.readings=makeReadings(y,u,i);
 r.studentContentVersion=V;
 r.sourceStatus=y===6?'OFFICIAL_THEME_FRAMEWORK_ORIGINAL_STUDENT_CONTENT_V15':'ORIGINAL_CURRICULUM_ALIGNED_STUDENT_REVIEWED_V15';
}
window.BAHASA_STUDENT_CONTENT_V15={version:V,audit(){const fail=[],all=[];for(let y=2;y<=6;y++)for(let i=1;i<=24;i++){const r=F.records[`T${y}U${i}`];if(!r||r.readings?.length!==3)fail.push(`T${y}U${i}:readings`);for(const t of r?.readings||[]){all.push(t);if(!/^[A-Z“]/.test(t))fail.push(`T${y}U${i}:capital`);if(/^bersama\b/i.test(t))fail.push(`T${y}U${i}:fragment`);}}return {units:120,readings:all.length,unique:new Set(all).size,passed:fail.length===0,failures:fail}}};
})();
