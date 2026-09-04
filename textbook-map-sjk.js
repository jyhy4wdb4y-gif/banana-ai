(()=>{
'use strict';
const Y1_THEMES=[
 {theme:'Sayangi Keluarga',units:['Saya Sayang akan Keluarga','Mari Sayang','Balik ke Kampung']},
 {theme:'Hidup Harmoni',units:['Kenali Jiran','Kawan-kawan Wei Han','Taman Permainan']},
 {theme:'Badan Sihat dan Bersih',units:['Sihat dan Gembira','Sedap dan Sihat','Kebersihan dan Kesihatan']},
 {theme:'Cermat dan Selamat',units:['Berhati-hati Selalu','Selamat Sentiasa','Jadikan Teladan']},
 {theme:'Seni Budaya Kita',units:['Meriahnya Perayaan','Kesenian Kita','Wah, Cantiknya!']},
 {theme:'Malaysia Oh Malaysia',units:['Pameran Kartun Malaysia','Bendera Malaysia','Negaraku Istimewa']},
 {theme:'Hebatnya Sains Teknologi dan Inovasi',units:['Mesra Plastik','Hebat dan Mudah','Berfaedah dan Kreatif']},
 {theme:'Cintai Alam',units:['Indahnya Alam','Dekati Alam','Selamatkan Alam']}
];
const LEX=[
 ['keluarga','ibu','bapa','abang','kakak','adik','sayang','hormat','bantu','bersama','rumah','bahagia'],
 ['sayang','peluk','bantu','jaga','hormat','baik','mesra','gembira','keluarga','kawan','guru','kasih'],
 ['kampung','datuk','nenek','rumah','kebun','pokok','ayam','sungai','pulang','ziarah','keluarga','gembira'],
 ['jiran','rumah','sapa','senyum','ramah','tolong','kenal','dekat','baik','hormat','bersama','harmoni'],
 ['kawan','bermain','belajar','kongsi','bantu','baik','ceria','sekolah','kelas','bersama','hormat','mesra'],
 ['taman','gelongsor','buaian','bola','bermain','giliran','selamat','kawan','ceria','lari','duduk','bersama'],
 ['sihat','gembira','cergas','senaman','rehat','tidur','air','bersih','aktif','badan','ceria','kuat'],
 ['nasi','sayur','buah','susu','air','makan','sedap','sihat','sarapan','ikan','pilih','khasiat'],
 ['sabun','mandi','tangan','gigi','bersih','tuala','sikat','basuh','kesihatan','kotor','kemas','amalan'],
 ['awas','lihat','dengar','berhenti','jalan','cermat','bahaya','selamat','patuhi','tanda','lintas','hati-hati'],
 ['selamat','peraturan','baris','tangga','pintu','guru','awas','tertib','jaga','ikut','bahaya','cermat'],
 ['teladan','baik','jujur','sopan','bantu','hormat','rajin','amanah','ikut','contoh','amalan','puji'],
 ['perayaan','meriah','baju','kuih','hiasan','lampu','ziarah','keluarga','tetamu','ucapan','budaya','gembira'],
 ['seni','lukisan','tarian','muzik','corak','warna','cantik','kraf','hasil','kreatif','budaya','persembahan'],
 ['cantik','warna','corak','hiasan','indah','kemas','seni','bentuk','kagum','lihat','hasil','menarik'],
 ['kartun','pameran','pelukis','gambar','watak','Malaysia','lihat','karya','warna','cerita','kreatif','dewan'],
 ['bendera','Malaysia','Jalur Gemilang','merah','putih','biru','kuning','bulan','bintang','kibar','negara','bangga'],
 ['negara','Malaysia','rakyat','negeri','bahasa','budaya','aman','indah','bangga','istimewa','bersatu','harmoni'],
 ['plastik','guna','semula','bekas','botol','ringan','mesra','alam','kurang','sisa','bersih','kitar'],
 ['alat','mudah','guna','ciptaan','teknologi','bantu','cepat','selamat','idea','hebat','fungsi','harian'],
 ['kreatif','idea','cipta','bina','bahan','guna','faedah','alat','kotak','kertas','hasil','mudah'],
 ['alam','langit','awan','sungai','bukit','pokok','bunga','hijau','indah','udara','burung','damai'],
 ['alam','hutan','pantai','taman','haiwan','tumbuhan','lihat','kenal','jaga','bersih','dekati','hargai'],
 ['selamatkan','alam','sampah','kitar','jimat','air','pokok','bersih','kurang','guna','pelihara','bumi']
];
const focus=i=>i<3?'huruf':i<6?'suku':i<9?'kata':i<12?'frasa':i<18?'ayat':i<21?'faham':'tulis';
const flat=Y1_THEMES.flatMap((t,ti)=>t.units.map((title,j)=>({title,theme:t.theme,themeNo:ti+1,unitNo:ti*3+j+1})));
window.BAHASA_TEXTBOOK_MAP={
 version:'2026.09-y1-sjk-foundation',track:'SJK',alignment:'Buku Teks aligned · DPK Edisi 3',
 copyrightPolicy:'Structure and curriculum alignment only; learning passages/questions are original Bahasa AI content.',
 sources:{catalog:{authority:'Kementerian Pendidikan Malaysia',title:'E-Katalog Buku Teks KPM',status:'VERIFIED'},dpk:{authority:'Kementerian Pendidikan Malaysia',title:'DPK KSSR (Semakan 2017) Edisi 3 Bahasa Melayu Tahap I',status:'VERIFIED'}},
 years:{1:{mappingStatus:'TEXTBOOK_STRUCTURE_MAPPED',themes:Y1_THEMES,units:flat.map((u,i)=>({...u,id:`T1U${i+1}`,focus:focus(i),words:LEX[i],sourceBasis:'Bahasa Melayu Tahun 1 SJK textbook structure + KPM curriculum alignment',sourceStatus:'STRUCTURE_VERIFIED_CONTENT_ORIGINAL',originalContent:true}))},2:{mappingStatus:'PENDING_SOURCE_VERIFICATION'},3:{mappingStatus:'PENDING_SOURCE_VERIFICATION'},4:{mappingStatus:'PENDING_SOURCE_VERIFICATION'},5:{mappingStatus:'PENDING_SOURCE_VERIFICATION'},6:{mappingStatus:'PENDING_SOURCE_VERIFICATION'}}
};
})();
