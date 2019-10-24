db.createCollection( "vehicles" , { 
    validator: { $jsonSchema: { 
       bsonType: "object", 
       required: [ "storage_number", "identificator"], 
       properties: { 
          storage_number: { 
             bsonType: "string",
             description: "required and must be a valid string (3 Letters A to Z)" }, 
          identificator: { 
             bsonType: "string", 
             description: "required and must be a vlid string (5 numbers from 0 to 9)" }
       }
    }
 }})

db.vehicles.insert({
    storage_number: 'QAZ',
    identificator: '959592'
 })

 
db.vehicles.insert({
    storage_number: 'BMV',
    identificator: '849499'
 })
 
db.vehicles.insert({
    storage_number: 'OIP',
    identificator: '123456'
 })
 
db.vehicles.insert({
    storage_number: 'QAZ',
    identificator: '879543',
    poeple: 2
 })

 db.vehicles.insert({storage_number: 'QAZ',identificator: '879543',poeple: 2})

 
db.vehicles.insert({
    storage_number: 'QAZ',
    identificator: '999999',
    poeple: 2
 })

 
db.vehicles.insert({
    storage_number: 'ASD',
    identificator: '949494',
    poeple: 2
 })

 
db.vehicles.insert({
    storage_number: 'BMV',
    identificator: '123456',
    poeple: 2
 })
 
 db.vehicles.update(
    {},
    { $set: {"poeple": null} },
    false,
    true
  )


  var generateCargoName = function () {
    var cargoName = [  'Krastavici', 
                        'Domati', 
                        'Morkovi', 
                        'Zele', 
                        'Banani', 
                        'Qbylki'
                    ];
    return cargoName[Math.floor(Math.random() * 6)];
}

var generateCategory = function () {
    var categories = [  'Zelenchuci', 
                        'Plodove'
                    ];
    return categories[Math.floor(Math.random() * 2)];
}

var fillCargo = function(){
    var vehicles = db.vehicles.find().toArray();
    var cargo = {}

    for(i = 0; i < vehicles.length; i++){
        cargo.name = generateCargoName();
        cargo.category = generateCategory();
        cargo.quantity = Math.floor(Math.random + 200) + 1;
        cargo.vehicle_Id = vehicles[i]._id;

        db.cargo.insert(cargo);
    }
}

var printVehiclesWithCargos = function() {
    var vehicles = db.vehicles.find().toArray();
    var cargo;
    for(i = 0; i < vehicles.length; i++){
        print(vehicles[i].storage_number + ' / ' + vehicles[i].identificator);
        cargo = db.cargo.find({vehicle_Id : vehicles[i]._id});
        print('Name:' + cargo.name);
        print('Category:' + cargo.category);
        print('Quantity:' + cargo.quantity);
    }
}