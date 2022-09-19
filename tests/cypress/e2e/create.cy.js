
import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {

    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Chaves',
            instagram: '@rchaves',
            password: 'pwd123'
        }

        const foodtruck = {

            latitude: '-16.626780538547216',
            longitude: '-49.385768473148346',
            name: 'Tienda Del Chavo',
            details: 'O melhor lugar para tomar um suco de limão que parede de groselha!',
            opening_hours: 'das 14h ás 20h',
            open_on_weekends: false

        }
        cy.apiCreateUser(user)
        cy.uiLogin(user)


        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')

        cy.wait(3000)
    })

    it('não deve cadastrar foodtruck com o nome duplicado', () => {

    // Dado que eu tenho um food truck cadastrado    
        const user = {
            name: 'Adele',
            instagram: '@adele',
            password: 'pwd123'
        }

        const foodtruck = {

            latitude: '-16.62289970416694',
            longitude: '-49.38948333263398',
            name: 'Adele M truck',
            details: 'O melhor lugar para comer um sandubão!',
            opening_hours: 'das 16h ás 22h',
            open_on_weekends: false

        }
        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)
        cy.uiLogin(user)
                

    // Quando tento cadastrar esse food truck de novo    

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()

    // Então devo ver a mensagem de alerta de duplicado     
        createPage.modal.haveText('Esse food truck já foi cadastrado!')

        
    })

    it('todos os campos são obrigatórios', () => {

        const user = {
            name: 'Charles',
            instagram: '@charles',
            password: 'pwd123'
        }

        const foodtruck = {

            latitude: '-16.626780538547216',
            longitude: '-49.385768473148346',   
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        cy.setGeolocation(foodtruck.latitude,foodtruck.longitude)
        createPage.submit()
        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
        createPage.modal.haveText(message)

        cy.wait(3000)
    })


})