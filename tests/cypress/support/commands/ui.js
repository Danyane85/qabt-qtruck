import loginPage from '../pages/Login'
import mapPage from '../pages/Map'


Cypress.Commands.add('uiLogin', (user) => {
    loginPage.go('-16.647704850012488', '-49.496428370475776')
    loginPage.form(user)
    loginPage.submit()
    mapPage.loggedUser(user.name)

})

Cypress.Commands.add('apiCreateFoodTruck', (payload) =>{

    cy.request({
        url:'http://localhost:3333/foodtrucks',
        method: 'POST',
        headers: {
            'Authorization': Cypress.env('token')
        },
        body: payload
    }).then(response =>{
        expect(response.status).to.eql(201)
    })  

})

Cypress.Commands.add('setGeolocation', (lat, long)=> {
    localStorage.setItem('qtruck:latitude',lat)
    localStorage.setItem('qtruck:longitude',long)
})