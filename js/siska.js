$("#angkatan").val("2016");
var tahun = $("#angkatan").val();
var prodi = '57201';
var namaprodi = 'SISTEM INFORMASI';
var nim = '51016012';
refreshDataTable();
daftarprodi();
detailprodi();

$("#angkatan").change(function(){
  tahun = $(this).val();
  refreshDataTable();
})

function refreshDataTable(){
  $("#prodi").html(namaprodi);
  $("#tahun").html(tahun);
  var table=$('#tablemhs').DataTable({
    "ajax" : {
      "url" : "https://siska.kharisma.ac.id/api/mhs/angkatan/"+tahun+"/prodi/"+prodi,
      "type" : "GET"
    },
    "sAjaxDataProp" : "list_mahasiswa",
    "columns" : [
      {"data" : "nim",
       "render": function ( data, type, row, meta ) {
        return '<a onclick="setnim('+row.nim+')" data-toggle="modal" data-target="#myModal">'+data+'</a>';}},
      {"data" : "nama",
       "render": function ( data, type, row, meta ) {
        return '<a onclick="setnim('+row.nim+')" data-toggle="modal" data-target="#myModal">'+data+'</a>';}},
      {"data" : "email",
       "render": function ( data, type, row, meta ) {
        return '<a onclick="setnim('+row.nim+')" data-toggle="modal" data-target="#myModal">'+data+'</a>';}}
    ],
    "destroy" : true,
    "responsive" : true
  });
  $('#pencarian').on( 'keyup', function () {
  table
      .search( this.value )
      .draw();
} );
}

function daftarprodi(){
  var lprodi="";
  $.get("https://siska.kharisma.ac.id/api/prodi",
  function(result){
    $.each(result.program_studi,function(key,val){
      lprodi+='<a class="list-group-item" onclick="setprodi(\'' + val.kode + '\',\'' + val.nama + '\')">'+val.nama+'</a>';
      $("#listprodi").html(lprodi);
    })
    });
}

function setprodi(kdprodi,nmprodi){
  prodi = kdprodi;
  namaprodi = nmprodi;
  refreshDataTable();
  detailprodi();
}

function setnim(nimmhs){
  nim = nimmhs;
  detailmhs();
  fotomhs();
}

function detailprodi(){
  $.get("https://siska.kharisma.ac.id/api/detailprodi/kode/"+prodi,
    function(result){
      $.each(result, function(key,val){
        $("#kdprodi").html(val.kode);
        $("#nmprodi").html(val.nama);
        $("#jmlsks").html(val.sks_lulus);
        $("#nomorsk").html(val.nosk_akreditasi);
        $("#tgsk").html(val.tgsk_akreditasi);
        $("#tgexp").html(val.tgexp_akreditasi);
        $("#status_a").html(val.status_akreditasi);
      });
      $.each(result.program_studi, function(key,val){
        $("#kodejenjang").html(val.kode);
        $("#kdjenjang").html(val.kode);
        $("#nmjenjang").html(val.namajenjang);
        $("#nmprogram").html(val.namaprogram);
      });
    });
}

function detailmhs(){
  $("#nimdetail").empty();
  $.getJSON("https://siska.kharisma.ac.id/api/detailmhs/nim/"+nim, function(jd){
      $("#d_nim").html(jd.nimhs);
      $("#d_nama").html(jd.namamhs);
      $("#d_prodi").html(jd.prodi);
      $("#d_smtmulai").html(jd.smtmulai);
      $("#d_tglmasuk").html(jd.tanggal_masuk);
      $("#d_email").html(jd.email);
      $("#d_ipk").html(jd.ipk);
      $("#d_nidndosen").html(jd.dosen_pa.nidn);
      $("#d_namadosen").html(jd.dosen_pa.nama+" "+jd.dosen_pa.gelar_belakang);
    });
}

function fotomhs(){
  $("#fotomhs").empty();
  $.getJSON("https://siska.kharisma.ac.id/api/picmhs/nim/"+nim, function(jd){
    $('#fotomhs').html('<img class="mhsfoto" src="'+jd.foto+'">');
  })
}
