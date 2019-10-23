use bot

var generateFirstName = function () {
    var nameCollection = [  'Conchita', 
                        'Nikolai', 
                        'Yohanes', 
                        'Gergana', 
                        'Tarej', 
                        'Ole', 
                        'Dimityr', 
                        'Nikolina', 
                        'Milko', 
                        'Kaisa'
                    ];
    return nameCollection[Math.floor(Math.random() * 10)];
}

var generateLastName = function () {
    var nameCollection = [  'Nikolov', 
                        'Wurst', 
                        'Smihailov', 
                        'Bjorndalen', 
                        'Boe', 
                        'Makarainen'
                    ];
    return nameCollection[Math.floor(Math.random() * 6)];
}

var generateAdditionalName = function () {
    var nameCollection = [  'Einar', 
                        'Thinges', 
                        'Kaun'
                    ];
    return nameCollection[Math.floor(Math.random() * 3)];
}

var generateAddress = function(){
    var streetsCollection = [  'Bulgaria bld.',
                    'G. S. Rakovski bld.',
                    'Bulair str.',
                    'Vasil Levski bld.',
                    'Syedinenie bld.'];

    var streetIndex = Math.floor(Math.random() * 5);
    
    return (Math.floor(Math.random() * 120) + 1) + ' ' + streetsCollection[streetIndex];
}

var generatePhone = function() {
   var startPhoneCollection = ["089", "088", "087", "086"];
   var index = Math.floor(Math.random() * 3);
   var phone = startPhoneCollection[index];
   for (var i = 0; i < 7; i++) {
       var randomNumber = Math.floor(Math.random() * 9);
       phone += randomNumber;
   }
   return phone;
}

var generateEmail = function(name) {
    var emailCollection = [
      '@google.com',
      '@abv.bg'
    ];
  
    var index = Math.floor(Math.random() * 2);
    return name.toLowerCase() + emailCollection[index];
}

var generateAccountName = function() {
    var accountCharactersCollection = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var accountName = '';
    for(var i = 0; i < 6; i++){
        accountName += accountCharactersCollection[i];
    }

    var accountRandomNumbers = Math.floor(Math.random() * 999999);
    accountName += accountRandomNumbers;

    return accountName;
}

var generateAccount = function(_clientId, _currency = 'BGN'){
    var accountName = generateAccountName();

    var account = {
        name: accountName,
        clientId : _clientId,
        currency : _currency,
        balance : Math.floor(Math.random() * 999999)
    }

    db.clients.update(
        {_id: _clientId},
        {$addToSet: {"accounts": account}}
    )
}

var departmentsCollection = [
    {
        name: 'Call Center',
        positions: [
            {
                id: 0,
                name: 'Expert'
            },
            {
                id: 1,
                name: 'Operator'
            }
        ]
    },
    {
        name: 'Operations',
        positions: [
            {
                id: 0,
                name: 'Expert'
            },
            {
                id: 1,
                name: 'Trainee'
            }
        ]
    }
];

var fillDepartments = function() {

    db.departments.insert(departmentsCollection[0]);
    db.departments.insert(departmentsCollection[1]);
}

var fillEmployees = function(){
    var employee = {};
    var departmentIndex;
    var positionIndex;
	
	for (i = 0; i < 8; i++) {
        departmentIndex = Math.floor(Math.random() * 2);
        positionIndex = Math.floor(Math.random() * 2);

		employee.firstName = generateFirstName();
		employee.lastName = generateLastName();
		employee.additionalName = generateAdditionalName();
        employee.address = generateAddress();
        employee.phone = generatePhone();
        employee.email = generateEmail(employee.firstName + employee.lastName);
        employee.department = departmentsCollection[departmentIndex].name;
        employee.position = departmentsCollection[departmentIndex].positions[positionIndex].name;

		db.employees.insert(employee);
	}
}

var fillClients = function(){
    var client = {};
	
	for (i = 0; i < 10; i++) {
		client.firstName = generateFirstName();
		client.lastName = generateLastName();
		client.additionalName = generateAdditionalName();
        client.address = generateAddress();
        client.phone = generatePhone();
        client.email = generateEmail(client.firstName+client.lastName);

		db.clients.insert(client);
	}
}

var fillAcounts = function(){
    var clients = db.clients.find().toArray();

	for (i = 0; i < clients.length; i++) {
		generateAccount(clients[i]._id);
	}
}

var fillAllData = function(){
    fillDepartments();
    fillEmployees();
    fillClients();
    fillAcounts();
}


// Заявки 1.1
db.departments.find({},{name: 1})
// Заявки 1.2
var addSalaryToEmployees = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"salary": Math.floor(Math.random() * 8000) + 2000}});
	}
}

addSalaryToEmployees();

db.employees.find({},{_id: 0, firstName: 1, lastName: 1, salary: 1})

// Заявки 1.3
var listEmployeesNewEmail = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		print(employees[i].firstName + ' ' + employees[i].lastName + ' : ' + employees[i].firstName.toLowerCase() + '.' + employees[i].lastName.toLowerCase() + '@bankoftomarow.bg');
	}
} 

listEmployeesNewEmail();

// Заявки 1.4

var addWorkExpirience = function(){
	var employees = db.employees.find().toArray();
	
	for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"workExpirience": Math.floor(Math.random() * 15)}});
	}
}

addWorkExpirience();

var printEmployeesWithMoreThanFiveYearWorkEpirience = function(){
    var employees = db.employees.find({workExpirience: {$gt: 5}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees with more than 5 years of work expirience')
    }
}

printEmployeesWithMoreThanFiveYearWorkEpirience();

// Заявки 1.5
var getEmployeesStartingWithS = function () {
    var employees = db.employees.find({firstName: {$regex: /^S/}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not employees which first name start with the letter S')
    }
};

getEmployeesStartingWithS();

// Заявки 1.6

var addPlaceOfBirth = function(){
	var placesOfBirthCollection = ['Bulgaria', 'Turkmenistan', 'Iraq', 'Germany', 'Norway'];
	var employees = db.employees.find().toArray();
	var placeOfBirthindex;
	
	for (i = 0; i < employees.length; i++) {
		placeOfBirthindex = Math.floor(Math.random() * 5);
		db.employees.update({_id:employees[i]._id}, {$set: {"placeOfBirth": placesOfBirthCollection[placeOfBirthindex]}});
	}
}

addPlaceOfBirth();

var getImigrants = function () {
    var employees = db.employees.find({placeOfBirth: {$ne: 'Bulgaria'}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees which are imigrants')
    }
}

getImigrants();

// Заявки 1.7

var employeesWithIInTheirName = function () {
    var employees = db.employees.find({$or: [{firstName: /I/i},{additionalName: /I/i},{lastName: /I/i}]}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].additionalName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees with I in their name')
    }
}

employeesWithIInTheirName();




// Заявкки 3.4
var employeesWithSpecificSalary = function () {
    var employees = db.employees.find({$and: [{"salary": {$gte: 2000}}, {"salary": {$lte: 3000}}]}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].firstName + ' ' + employees[i].lastName)
        }
    }
    else{
        print('There are not any employees which get salary between 2000 and 3000')
    }
}

employeesWithIInTheirName();