import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors'

const app = express();

app.use(express.static('client'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const db = await sqlite.open({
    filename: './disease_information.db',
    driver: sqlite3.Database
});

console.log('db initialized')

// await db.migrate();



app.get('/', async (request, response) => {
    response.json({
        status: "api running",

    });
    console.log('status')
});

app.post('/api/diseases/', async (request, response) => {
    const { disease_name } = request.body;
    await db.all(`SELECT * FROM diseases WHERE lower(disease_name) = ? `, disease_name.toLowerCase())


        .then(queryResults => {
            if (queryResults.length == 1) {
                // setTimeout(() =>{


                //  })


                response.json({

                    status: 'success',
                    isFound: true,
                    search_results: queryResults
                })



            } else {
                response.json({
                    status: "Disease Not Found",
                    isFound: false,
                })
            }

        })
})


app.post(`/api/diseases/update`, async (request, response) => {

    //console.log(request, body)

    const {disease_name, description, symptoms_and_signs, treatment, id } = request.body;

    const results = await db.run(`update diseases set disease_name = ?, description = ?, symptoms_and_signs = ?, treatment = ? where id = ?`,

        disease_name,
        description,
        symptoms_and_signs,
        treatment,
        id
    )

     //console.log(results)

    response.json({
        status: 'success'
    })

})

app.post(`/api/health_status/update`, async(request, response) =>{

    // console.log(request,body)
 
 const {diagnosis, picture_name, id} = request.body;
 
 const results = await db.run(`update health_status set diagnosis = ?, picture_name = ?  where id = ?`,
 diagnosis, 
 picture_name,
 id
 
 )
 
 
 //console.log(results)
 
 response.json({
     status: 'success'
 })
 
 
 })

// app.post('/api/diseases/', async (request, response) => {
//     const { disease_name } = request.body;
//      await db.all(`SELECT diseases.disease_name, management.management_type, management.id from diseases JOIN management on diseases.id= management.disease_id WHERE diseases.disease_name = ?`, disease_name )
//         .then(queryResults => {
//             if (queryResults.length > 0) {
//                 response.json({
//                     status: 'success',
//                     isFound: true,
//                     search_results: queryResults
//                 })



//             } else {
//                 response.json({
//                     status: "Disease Not Found",
//                     isFound: false,
//                 })
//             }

//         })
// })




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`api running ${PORT}`);
})