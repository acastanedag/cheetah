function envioFormulario(arr,url,params,metodo){  
        const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";
        $.ajax(
        {
            url: rutaAplicatico+url,
            type: metodo,
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                if(mensaje.message=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>ERROR: </strong>su sesión a caducado, sera dirigido al inicio.</div>')
                    setTimeout(refreshWindow, 4000);

                    //window.location = '../../index.html';
                }
                if(mensaje.status)
                {                  
                    $('#alertas').html('<div class="alert alert-dismissable alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>Tip:</strong> Dato insertado Correctamente.</div>')
                    setTimeout(refreshWindow, 4000);
                    //window.location = 'inmueble.html'
                }
                else {$('#resultado').html(mensaje.error);}
            }
        })        
}

function refreshWindow()
{
    window.location = 'inmueble.php';
}

function traerDatos(arr,url,params)
{
    const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";
    $.ajax(
        {
            url: rutaAplicatico+url,
            type: 'POST',
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                var datos = JSON.parse(msgDivididoDos);                
                if (datos=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>ERROR: </strong>su sesión a caducado, sera dirigido al inicio.</div>')                  
                    window.location = '../../index.php';
                }
                else
                {
                    $.each(datos, function(x , y) 
                    {
                        var idmongo= JSON.stringify(y['_id']);
                        var idMongoFinal = JSON.parse(idmongo);
                        var t = $('#example').DataTable();
                        t.row.add( [
                            '',                            
                            y['nombre_copropiedad'],
                            y['tipo_unidad'],
                            y['detalle'],                            
                            '<a id="open-editarcopripiedad" class="btn editar solo inline" href="inmueble-editar.php?idt='+idMongoFinal.$id+'"></a><a class="btn borrar solo inline" href="inmueble-eliminar.php?idt='+idMongoFinal.$id+'"></a>'
                        ] ).draw();
                        $('#tableContainer > tbody:last').append('<tr><td>'+y['nombre_copropiedad']+'</td><td>'+y['tipo_unidad']+'</td><td>'+y['detalle']+'</td><td><a class="btn editar solo inline" href="inmueble-editar.html?idt='+idMongoFinal.$id+'"></a><a class="btn borrar solo inline" href="inmueble-eliminar.html?idt='+idMongoFinal.$id+'"></a></td></tr>')
                    })
                }                
            }
        });
}


function traerDatosCopropiedad(arr,url,params)
{
    const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";    
    $.ajax(
        {
            url: rutaAplicatico+url,
            type: 'POST',
            data: JSON.stringify(arr),
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                var datos = JSON.parse(msgDivididoDos);                
                if (datos=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>Tip:</strong> NO PUDO LISTAR POR TOKEN, Solicitando un nuevo token por favor espere.</div>')
                    window.location = '../index.html';                      
                }
                else
                {
                    $.each(datos, function(x , y) {               
                        var idmongo= JSON.stringify(y['_id']);
                        var idMongoFinal = JSON.parse(idmongo);               
                        if(idMongoFinal.$id)
                        {
                            $('#id_crm_persona').val(y['id_crm_persona']);
                            $('#fecha_creacion').val(y['fecha_creacion']);
                            $('#nombre').val(y['nombre']);
                            $('#direccion').val(y['direccion']);
                            $('#telefono').val(y['telefono']);
                            $('#nit').val(y['nit']);
                            $('#email').val(y['email']);
                            $('#porteria').prop("checked", y['tiene_porteria']);
                            $('#ascensor').prop("checked", y['tiene_acensor']);
                            $('#zona_ddq').prop("checked", y['tiene_zona_ddq']);
                            $('#piscina').prop("checked", y['tiene_piscina']);
                            $('#gimnasio').prop("checked", y['tiene_gimnasio']);
                            $('#sauna').prop("checked", y['tiene_sauna']);
                            $('#turco').prop("checked", y['tiene_turco']);
                            $('#jardin').prop("checked", y['tiene_jardin']);                           
                            $('#estadp').val(y['estadp']);
                            $('#modulos').val(y['modulos_activos']);                            
                            $('#color > option[value="'+y['color']+'"]').attr('selected', 'selected');

                        }                    
                    })
                }                
            }
        });

function sleep(milliseconds) { 
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
}

function traerDatosModificables(arr,url,params)
{
    const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";
    $.ajax(
        {
            url: rutaAplicatico+url,
            type: 'POST',
            data: JSON.stringify(arr),
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                var datos = JSON.parse(msgDivididoDos);                
                if (datos=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>Tip:</strong> NO PUDO LISTAR POR TOKEN, Solicitando un nuevo token por favor espere.</div>')
                    window.location = '../index.html';                      
                }
                else
                {
                    $.each(datos, function(x , y) {               
                        var idmongo= JSON.stringify(y['_id']);
                        var idMongoFinal = JSON.parse(idmongo);               
                        if(idMongoFinal.$id==params['idt'])
                        {
                            $('#id_copropiedad').val(y['id_copropiedad']);
                            $('#nombre').val(y['nombre_copropiedad']);
                            $('#tipo').val(y['tipo_unidad']);
                            $('#identificador').val(y['identificador']);
                            $('#nombremostrar').append(" "+y['detalle']+"?");
                            $('#reservable').prop("checked", y['reservable']);
                            $('#detalle').val(y['detalle']);
                            $('#estado').val(y['estado']);
                            $('#fecha_creacion').val(y['fecha_creacion']);
                        }                    
                    })
                }                
            }
        });

function sleep(milliseconds) { 
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
}


function TraerUsuarioCopropiedad(arr,url,metodo){
    const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";    
    $.ajax(
        {
            url: rutaAplicatico+url,
            type: 'POST',
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                var datos = JSON.parse(msgDivididoDos);                
                if (datos=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>ERROR: </strong>su sesión a caducado, sera dirigido al inicio.</div>')                  
                    window.location = '../index.html';
                }
                else
                {
                    $.each(datos, function(x , y) 
                    {
                        var idmongo= JSON.stringify(y['_id']);
                        var idMongoFinal = JSON.parse(idmongo);                        
                        $('#usuario').append('<option value="'+y['"id_crm_persona']+'">'+y['nombre']+'</option>')
                    })               
                }
                return false;
            }
        });


}
function TraerModulosCopropiedad(arr,url,metodo){ 
    //alert("Ahora Si");
    const rutaAplicatico = "http://aws02.sinfo.co/api/admin/copropiedad/";
    $.ajax(
        {
            url: rutaAplicatico+url,
            type: 'POST',
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) 
            {
                var msgDividido = JSON.stringify(msg);
                var mensaje =  JSON.parse(msgDividido);
                var msgDivididoDos = JSON.stringify(mensaje.message);
                var datos = JSON.parse(msgDivididoDos);                
                if (datos=="Token invalido")
                {
                    $('#alertas').html('<div class="alert alert-dismissable alert-error"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>ERROR: </strong>su sesión a caducado, sera dirigido al inicio.</div>')                  
                    window.location = '../index.html';
                }
                else
                {                    
                    $.each(datos, function(x , y) 
                    {
                        var idmongo= JSON.stringify(y['_id']);
                        var idMongoFinal = JSON.parse(idmongo);                       
                        sessionStorage.setItem("cp", idMongoFinal.$id);
                        var datos = JSON.stringify(y['modulos_activos']);
                        sessionStorage.setItem("modulos",y['modulos_activos'])
                        var endata =  JSON.parse(datos);                                                
                        //$('#tableContainer > tbody:last').append('<tr><td>'+y['nombre']+'</td><td>'+y['direccion']+'</td><td>'+y['telefono']+'</td><td>'+y['nit']+'</td><td><a class="btn editar solo inline" href="copropiedad-editar.html?idt='+idMongoFinal.$id+'"></a><a class="btn borrar solo inline" href="copropiedad-eliminar.html?idt='+idMongoFinal.$id+'"></a></td></tr>')
                    })
                }                
            }
        });
}
