(()=>{
'use strict';
const V='TEXTBOOK-CONTENT-Y1-V3';
const M=window.BAHASA_TEXTBOOK_MAP?.years?.[1]?.units||[];
const EXTRA=[
 ['kasih','membantu','bersalam','bahagia','berterima kasih','mesra'],
 ['menjaga','menghormati','menyayangi','berkongsi','prihatin','sopan'],
 ['dusun','halaman','basikal','membantu','bercuti','seronok'],
 ['bertegur sapa','kunjung','prihatin','berkenalan','santun','kerjasama'],
 ['Wei Han','berkongsi','berbual','menolong','belajar','bersahabat'],
 ['gelongsor','buaian','jongkang-jongket','giliran','beratur','berhati-hati'],
 ['bersenam','berlari','regangan','sarapan','tidur','tenaga'],
 ['berkhasiat','sarapan','pinggan','seimbang','pilihan','tenaga'],
 ['kuman','kuku','sikat gigi','mencuci','tandas','kemas'],
 ['lintasan','lampu isyarat','topi keledar','berhenti','pandang','dengar'],
 ['peraturan','tangga','koridor','beratur','berwaspada','tertib'],
 ['contohi','rajin','amanah','jujur','sopan','bertanggungjawab'],
 ['Deepavali','Tahun Baharu Cina','Hari Raya','hiasan','kunjung-mengunjung','ucapan'],
 ['anyaman','batik','kompang','tarian','ukiran','persembahan'],
 ['pameran','corak','warna-warni','hias','kagum','kreativiti'],
 ['kartunis','karya','pameran','watak','dialog','pelukis'],
 ['Jalur Gemilang','berkibar','lambang','jalur','bulan sabit','bintang pecah empat belas'],
 ['negeri','ibu negara','masyarakat','pelbagai','aman','bangga'],
 ['biodegradasi','bekas guna semula','asingkan','kurangkan','kitar semula','sisa'],
 ['mesin','butang','fungsi','ciptaan','memudahkan','selamat'],
 ['reka cipta','bahan terpakai','model','uji','baiki','hasilkan'],
 ['pemandangan','air terjun','rimba','segar','nyaman','menghargai'],
 ['meneroka','memerhati','habitat','serangga','tumbuhan','menghormati'],
 ['pelihara','tanam semula','jimat tenaga','asingkan sampah','kurangkan plastik','gotong-royong']
];
const PASSAGES=[
 ['Ibu menyediakan sarapan. Bapa membantu mengemas meja. Kami saling menyayangi dan membantu di rumah.','Selepas sekolah, abang menolong adik menyusun buku. Kakak mengucapkan terima kasih. Keluarga kami gembira kerana bekerjasama.','Pada hujung minggu, kami makan bersama. Saya bersalam dengan ibu dan bapa. Saya sayang akan keluarga saya.'],
 ['Aina memeluk ibunya sebelum ke sekolah. Dia juga membantu adik memakai kasut. Perbuatan kecil itu menunjukkan kasih sayang.','Kita boleh menyayangi keluarga dengan bercakap sopan dan membantu. Kita juga menghormati orang yang lebih tua.','Apabila kawan sedih, Ravi mendengar dan menenangkannya. Sikap prihatin juga satu cara menunjukkan kasih sayang.'],
 ['Kami balik ke kampung pada cuti sekolah. Datuk menunggu di halaman rumah. Nenek tersenyum apabila melihat kami tiba.','Pada waktu pagi, saya mengikut datuk ke kebun. Kami melihat pokok buah-buahan dan memberi makan ayam.','Sebelum pulang, kami membantu nenek mengemas rumah. Saya berasa seronok dapat meluangkan masa bersama keluarga.'],
 ['Mei Ling tersenyum apabila berjumpa jiran baharu. Dia memperkenalkan diri dan mengucapkan selamat datang.','Jiran kami saling bertegur sapa. Apabila Encik Kumar sakit, beberapa jiran datang membantu keluarganya.','Kita hidup lebih harmoni apabila mengenali jiran, bercakap sopan dan saling menghormati.'],
 ['Wei Han mempunyai kawan daripada pelbagai kaum. Mereka belajar dan bermain bersama di sekolah.','Semasa aktiviti kumpulan, Wei Han berkongsi alat tulis dengan kawannya. Mereka berbincang sebelum menyiapkan tugasan.','Kawan yang baik saling membantu, mendengar dan menghormati. Persahabatan menjadi lebih erat apabila kita bekerjasama.'],
 ['Kanak-kanak bermain di taman permainan. Mereka beratur sebelum menggunakan gelongsor dan buaian.','Farah menunggu gilirannya. Dia tidak menolak kawan kerana mahu semua orang bermain dengan selamat.','Selepas bermain, mereka membuang sampah ke dalam tong. Taman kekal bersih dan selesa untuk semua.'],
 ['Setiap pagi, Adam melakukan regangan ringan. Dia berasa lebih cergas sebelum ke sekolah.','Selepas bersenam, Adam minum air kosong dan mengambil sarapan. Badannya mendapat tenaga untuk belajar.','Tidur yang cukup, makanan sihat dan aktiviti fizikal membantu kita kekal sihat dan gembira.'],
 ['Sarapan Hana mengandungi nasi, telur, sayur dan buah. Dia juga minum air kosong.','Ibu mengajar Hana memilih makanan yang pelbagai dan seimbang. Makanan berkhasiat membantu tubuh membesar dengan baik.','Makanan boleh sedap dan sihat pada masa yang sama. Kita perlu membuat pilihan yang bijak.'],
 ['Kuman mudah berpindah melalui tangan yang kotor. Oleh itu, Amir mencuci tangan dengan sabun sebelum makan.','Siti menggosok gigi pada waktu pagi dan malam. Dia juga memastikan kuku sentiasa pendek dan bersih.','Kebersihan diri dan persekitaran membantu menjaga kesihatan. Amalan bersih perlu dilakukan setiap hari.'],
 ['Sebelum melintas jalan, kita berhenti di tempat yang selamat. Pandang kanan, kiri dan kanan sekali lagi.','Penunggang basikal memakai topi keledar. Mereka mematuhi lampu isyarat dan tidak bermain di jalan raya.','Sikap cermat dapat mengurangkan bahaya. Kita perlu peka terhadap tanda dan keadaan di sekeliling.'],
 ['Murid berjalan dengan tertib di koridor sekolah. Mereka tidak berlari di tangga.','Di kantin, semua murid beratur. Peraturan membantu orang bergerak dengan selamat dan teratur.','Keselamatan ialah tanggungjawab bersama. Kita perlu mendengar arahan guru dan mematuhi peraturan.'],
 ['Arun memulangkan pensel yang ditemuinya kepada guru. Dia memilih untuk berlaku jujur.','Lina rajin membantu ibu tanpa disuruh. Adiknya mahu mencontohi sikap bertanggungjawab itu.','Perbuatan baik boleh menjadi teladan. Kita belajar daripada orang yang sopan, amanah dan prihatin.'],
 ['Keluarga di Malaysia menyambut pelbagai perayaan. Rumah dihias dan tetamu disambut dengan mesra.','Semasa perayaan, jiran saling mengunjungi dan mengucapkan selamat. Makanan tradisional turut dikongsi.','Perayaan menjadi lebih bermakna apabila kita menghormati adat dan budaya orang lain.'],
 ['Di sekolah, murid melihat batik, anyaman dan ukiran. Mereka kagum akan corak yang halus dan cantik.','Sekumpulan murid memainkan kompang manakala yang lain mempersembahkan tarian tradisional.','Seni mencerminkan kreativiti dan budaya masyarakat. Kita boleh menghargainya dengan belajar dan menjaganya.'],
 ['Dewan sekolah dihias dengan hasil seni murid. Ada lukisan, kolaj dan corak berwarna-warni.','Aisyah memilih bentuk dan warna yang sesuai untuk menghasilkan kad hiasan. Hasilnya kemas dan menarik.','Keindahan boleh dilihat pada warna, bentuk dan susunan. Kreativiti menjadikan hasil seni lebih istimewa.'],
 ['Pameran kartun diadakan di perpustakaan. Murid melihat pelbagai watak dan gaya lukisan.','Seorang kartunis menerangkan cara menghasilkan watak. Mula-mula dia melakar bentuk, kemudian menambah ekspresi dan dialog.','Kartun boleh menyampaikan cerita dan idea secara kreatif. Murid belajar menghargai karya pelukis tempatan.'],
 ['Jalur Gemilang berkibar di hadapan sekolah. Murid mengenal warna merah, putih, biru dan kuning.','Bendera negara mempunyai jalur, bulan sabit dan bintang. Setiap lambang mengingatkan kita tentang negara Malaysia.','Kita menghormati bendera dengan menjaganya dan berdiri tertib semasa lagu kebangsaan dimainkan.'],
 ['Malaysia mempunyai pelbagai negeri, bahasa, makanan dan budaya. Kepelbagaian menjadikan negara kita istimewa.','Rakyat hidup bersama dalam masyarakat yang pelbagai. Sikap saling menghormati membantu mengekalkan keharmonian.','Kita boleh menunjukkan rasa bangga akan negara dengan menjaga kebersihan, mematuhi peraturan dan menghormati orang lain.'],
 ['Botol dan bekas plastik sering digunakan setiap hari. Jika dibuang merata-rata, sisa boleh mencemarkan alam.','Kita boleh membawa bekas guna semula dan mengasingkan bahan yang boleh dikitar semula.','Mengurangkan penggunaan plastik ialah langkah kecil yang memberi faedah kepada alam sekitar.'],
 ['Di rumah, mesin basuh membantu mencuci pakaian. Kipas pula membantu menggerakkan udara.','Setiap alat mempunyai fungsi tertentu. Kita perlu membaca arahan dan menggunakannya dengan selamat.','Teknologi yang sesuai boleh menjadikan kerja lebih mudah dan cepat. Namun, kita tetap perlu menggunakannya dengan bijak.'],
 ['Murid mengumpulkan kotak, penutup botol dan kertas terpakai. Mereka mahu membina model kenderaan.','Mereka melakar idea, membina model dan mengujinya. Jika model tidak kukuh, mereka membaikinya.','Bahan mudah boleh menjadi sesuatu yang berfaedah apabila digunakan secara kreatif.'],
 ['Udara pagi di kawasan bukit terasa segar. Pokok hijau dan bunyi burung menjadikan suasana nyaman.','Di tepi sungai, murid memerhati air yang jernih dan batu-batan. Mereka tidak membuang sampah.','Alam yang indah perlu dihargai. Kita boleh menikmatinya sambil menjaga kebersihan dan keselamatan.'],
 ['Murid meneroka taman sekolah bersama guru. Mereka memerhati serangga, daun dan bunga.','Guru mengingatkan murid supaya tidak merosakkan tumbuhan atau mengganggu habitat haiwan.','Mendekati alam membantu kita mengenali hidupan. Pemerhatian perlu dilakukan dengan cermat dan berhemah.'],
 ['Penduduk bergotong-royong membersihkan kawasan sungai. Sampah diasingkan mengikut jenis.','Beberapa murid menanam anak pokok dan membawa botol air guna semula. Mereka juga belajar menjimatkan tenaga.','Alam dapat dipelihara apabila ramai orang melakukan tindakan kecil secara konsisten.']
];
function domainOrder(i){
 if(i<3)return ['Mendengar dan Bertutur','Membaca','Seni Bahasa'];
 if(i<6)return ['Mendengar dan Bertutur','Membaca','Tatabahasa'];
 if(i<9)return ['Membaca','Mendengar dan Bertutur','Tatabahasa'];
 if(i<12)return ['Membaca','Tatabahasa','Seni Bahasa'];
 if(i<18)return ['Mendengar dan Bertutur','Membaca','Menulis','Tatabahasa'];
 if(i<21)return ['Membaca','Menulis','Tatabahasa'];
 return ['Membaca','Menulis','Seni Bahasa','Tatabahasa'];
}
function grammarFor(i,w){
 if(i<3)return [{stage:'bunyi',prompt:`Dengar dan sebut bunyi awal dalam “${w[0]}”.`},{stage:'huruf',prompt:`Padankan bunyi awal “${w[1]}” dengan huruf yang betul.`},{stage:'transfer',prompt:'Cari satu perkataan baharu yang mempunyai bunyi awal yang sama.',independent:true}];
 if(i<6)return [{stage:'suku-kata',prompt:`Tepuk dan pecahkan “${w[0]}” kepada suku kata.`},{stage:'cantum',prompt:`Cantum suku kata untuk membentuk “${w[1]}”.`},{stage:'transfer',prompt:'Bina satu perkataan lain daripada suku kata yang dipelajari.',independent:true}];
 if(i<9)return [{stage:'kata',prompt:`Pilih perkataan yang paling sesuai untuk konteks “${w[0]}”.`},{stage:'makna',prompt:`Terangkan maksud “${w[1]}” menggunakan situasi mudah.`},{stage:'transfer',prompt:'Gunakan satu perkataan unit dalam konteks baharu.',independent:true}];
 if(i<12)return [{stage:'frasa',prompt:`Gabungkan “${w[0]}” dengan perkataan lain menjadi frasa bermakna.`},{stage:'susun',prompt:'Susun tiga perkataan menjadi frasa yang betul.'},{stage:'transfer',prompt:'Bina satu frasa baharu tanpa menyalin model.',independent:true}];
 return [{stage:'tatabahasa',prompt:'Kenal pasti kata nama atau kata kerja yang digunakan dalam petikan.'},{stage:'ayat',prompt:'Pilih perkataan yang menjadikan ayat paling bermakna.'},{stage:'transfer',prompt:'Gunakan pola bahasa yang sama dalam ayat baharu.',independent:true}];
}
function writingFor(i,title){
 if(i<3)return {guided:`Sebut dua perkataan penting daripada “${title}”.`,transfer:'Cari satu perkataan baharu dengan bunyi awal yang dipelajari.',mastery:'Kenal dan sebut perkataan baharu tanpa bantuan.',checklist:['dengar bunyi','sebut jelas','cuba sendiri']};
 if(i<6)return {guided:`Pecahkan dua perkataan daripada “${title}” kepada suku kata.`,transfer:'Cantum suku kata untuk membina perkataan baharu.',mastery:'Baca perkataan baharu tanpa petunjuk.',checklist:['suku kata tepat','cantum betul','cuba sendiri']};
 if(i<9)return {guided:`Padankan perkataan dengan maksud dalam unit “${title}”.`,transfer:'Pilih perkataan sesuai untuk situasi baharu.',mastery:'Terangkan satu perkataan menggunakan ayat atau situasi sendiri.',checklist:['makna tepat','sesuai konteks','cuba sendiri']};
 if(i<12)return {guided:`Bina dua frasa mudah tentang “${title}”.`,transfer:'Gunakan satu frasa dalam situasi baharu.',mastery:'Bina frasa baharu tanpa pilihan jawapan.',checklist:['frasa bermakna','susunan sesuai','cuba sendiri']};
 if(i<18)return {guided:`Bina satu ayat mudah tentang “${title}” menggunakan kata bantuan.`,transfer:'Tukar satu unsur dan pastikan ayat masih bermakna.',mastery:'Bina satu ayat mudah baharu tanpa model.',checklist:['ayat lengkap','makna sesuai','huruf besar/tanda noktah','cuba sendiri']};
 if(i<21)return {guided:`Baca petikan “${title}” dan jawab soalan tersurat.`,transfer:'Jawab soalan baharu menggunakan bukti daripada petikan.',mastery:'Baca petikan baharu dan cari maklumat tanpa bantuan.',checklist:['jawapan berdasarkan petikan','makna tepat','cuba sendiri']};
 return {guided:`Tulis satu ayat mudah berdasarkan unit “${title}”.`,transfer:'Gunakan idea yang sama dalam situasi baharu.',mastery:'Tulis ayat mudah baharu tanpa model atau pilihan jawapan.',checklist:['ayat bermakna','berkaitan unit','ejaan asas','cuba sendiri']};
}
function make(u,i){
 const readings=PASSAGES[i];
 const passageWords=readings.join(' ').toLowerCase().replace(/[^a-zà-ÿ\s-]/g,' ').split(/\s+/).filter(w=>w.length>3&&!['yang','dan','dengan','untuk','daripada','apabila','kerana','mereka','kami','kita','pada','dalam','lebih','juga','semasa','selepas','sebelum'].includes(w));
 const vocab=[...new Set([...(u.words||[]),...EXTRA[i],...passageWords])].slice(0,20);
 const questions=readings.flatMap((p,n)=>[
   {level:'literal',q:`Petikan ${n+1}: Nyatakan satu maklumat yang terdapat dalam petikan.`,expect:'maklumat tersurat daripada petikan'},
   {level:'meaning',q:`Petikan ${n+1}: Pilih satu perkataan penting dan jelaskan maksudnya dalam konteks.`,expect:'makna sesuai konteks'},
   {level:'application',q:`Petikan ${n+1}: Apakah satu tindakan sesuai yang boleh kamu lakukan berdasarkan idea petikan?`,expect:'tindakan relevan dan bermakna',independent:true}
 ]);
 return {year:1,unitId:u.id,title:u.title,theme:u.theme,focus:u.focus,domains:domainOrder(i),vocab,readings,questions,grammar:grammarFor(i,vocab),writing:writingFor(i,u.title),sourceBasis:u.sourceBasis,sourceStatus:u.sourceStatus,originalContent:true,copyrightNote:'Original Bahasa AI learning content; no textbook passage or exercise copied.',masteryPolicy:{guidedIsMastery:false,transferRequired:true,independentRequired:true,noHint:true}};
}
const records={};M.forEach((u,i)=>records[u.id]=make(u,i));
if(window.BAHASA_FULL_CONTENT?.records){Object.assign(window.BAHASA_FULL_CONTENT.records,records);window.BAHASA_FULL_CONTENT.version=V;window.BAHASA_FULL_CONTENT.get=id=>window.BAHASA_FULL_CONTENT.records[id]||null;}
if(window.BAHASA_CURRICULUM?.years?.[1]){
 window.BAHASA_CURRICULUM.years[1].units.forEach((u,i)=>{const r=records[u.id];if(!r)return;u.words=r.vocab.slice();u.contentDepth='TEXTBOOK_ALIGNED_ORIGINAL_DEEP';u.domains=r.domains.slice();u.sourceStatus=r.sourceStatus;});
 window.BAHASA_CURRICULUM.years[1].contentVersion=V;
}
function audit(){
 const ids=Object.keys(records),pass=new Set(),fail=[];
 if(ids.length!==24)fail.push(`unit-count:${ids.length}`);
 ids.forEach((id,idx)=>{const r=records[id];if(r.vocab.length<18)fail.push(`${id}:vocab:${r.vocab.length}`);if(r.readings.length!==3)fail.push(`${id}:readings`);r.readings.forEach(x=>{if(pass.has(x))fail.push(`${id}:duplicate-passage`);pass.add(x)});if(r.questions.length!==9)fail.push(`${id}:questions`);if(r.grammar.length!==3)fail.push(`${id}:grammar`);if(idx<12&&/tulis satu ayat|bina satu ayat/i.test(r.writing.guided))fail.push(`${id}:premature-writing`);if(!r.masteryPolicy.independentRequired)fail.push(`${id}:mastery`)});
 return {version:V,units:ids.length,uniquePassages:pass.size,totalVocab:ids.reduce((a,id)=>a+records[id].vocab.length,0),failures:fail,passed:fail.length===0};
}
window.BAHASA_TEXTBOOK_CONTENT_Y1={version:V,records,get:id=>records[id]||null,audit};
})();
