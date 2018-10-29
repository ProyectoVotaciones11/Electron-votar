
var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');
const excel = require('node-excel-export');


router.route('/exportar-usuarios').get(getExportarUsuariosHandler);
 

 function getExportarUsuariosHandler(req, res){
// You can define styles as json object
      const styles = {
        headerDark: {
          fill: {
            fgColor: {
              rgb: 'FF000000'
            }
          },
          font: {
            color: {
              rgb: 'FFFFFFFF'
            },
            sz: 14,
            bold: true,
            underline: true,
            
          }
        },
        
        cellPink: {
          fill: {
            fgColor: {
              rgb: 'FFFFCCFF'
            }
          }
        },
        cellGreen: {
          fill: {
            fgColor: {
              rgb: 'FF00FF00'
            }
          }
        }
      };
       
      //Array of objects representing heading rows (very top)
      const heading = [
        [{value: 'Resultados de votaciones', style: styles.headerDark}] // <-- It can be only values
      ];
       
      //Here you specify the export structure
      const specification = {
        Nombres: { // <- the key should match the actual data key
          displayName: 'Nombres', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
          width: 120 // <- width in pixels
         },
        Apellidos: {
          displayName: 'Apellidos',
          headerStyle: styles.headerDark,
          width: 120
          },
         
        aspiracion: {
          displayName: 'Aspiracion',
          headerStyle: styles.headerDark,
           width: 120
        },
         
        cantidad: {
          displayName: 'Votos',
          headerStyle: styles.headerDark,
          width: 50 // <- width in pixels
        }
      }
       
      
     
       
      // Define an array of merges. 1-1 = A:1
      // The merges are independent of the data.
      // A merge will overwrite all data _not_ in the top-left cell.
      const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 4 } }
      ]

      consulta = "SELECT C.*, a.aspiracion, C.rowid, count(v.rowid) as cantidad from Candidatos C " +
        "INNER JOIN Aspiraciones a ON C.aspiracion_id = a.rowid "+
        "LEFT JOIN Votos v ON v.candidato_id = C.rowid  " +
        "GROUP BY C.rowid ORDER BY C.aspiracion_id";

        db.query(consulta).then(function(result){

        const dataset = result;

        const report = excel.buildExport(
          [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
              name: 'Report', // <- Specify sheet name (optional)
              heading: heading, // <- Raw heading array (optional)
              merges: merges, // <- Merge cell ranges
              specification: specification, // <- Report specification
              data: dataset // <-- Report data
            }
          ]
        );
         
        // You can then return this straight
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.send(report);
      }, function(error){

         res.status(400).send({ error: error })
      
      })

      

}
module.exports = router;