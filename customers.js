
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM hotel',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Hoteles de Loja",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Agregar Hotel"});
};

exports.edit = function(req, res){
    
    var id = req.params.idhotel;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM hotel WHERE idhotel = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Editar Hotel",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            idhotel:input.idhotel,
            Nombre:input.nombre,
            Pais:input.pais,
            Provincia:input.provin,
            Cantón: input.canton,
            latitud: input.latitud,
            longitud: input.longitud,
        };
        var insert_sql = 'INSERT INTO hoteles.hotel set ?';
        var query = connection.query(insert_sql,data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.idhotel;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            Nombre:input.address,
            Pais:input.email,
            Provincia:input.provincia,
            Cantón    : input.canton,
            latitud : input.latitud,
            longitud  : input.longitud,
        };
        
        connection.query("UPDATE hotel set ? WHERE idhotel = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.idhotel;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM hotel  WHERE idhotel = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


