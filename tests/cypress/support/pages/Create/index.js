import modal from '../Components/Modal'

class CreatePage {

    constructor() {
        this.modal = modal

    }

    form(foodtruck){
        cy.setGeolocation(foodtruck.latitude,foodtruck.longitude)
        cy.get('input[name=name]').type(foodtruck.name)
        cy.get('textarea[name=details]').type(foodtruck.details)
        cy.get('input[id=openingHours]').type(foodtruck.opening_hours)

        ////button[text()="Sim"]
       // if (foodtruck.open_on_weekends === 'Sim')
         //   cy.contains('button','Sim').click()

        //if (foodtruck.open_on_weekends === 'Não')    
          //  cy.contains('button','Não').click()

      // segunda forma de implementar o código vai depender de como o dev implementou no banco.
       cy.contains('button', foodtruck.open_on_weekends ? 'Sim' : 'Não')
         .click()      
    }

    submit () {
        // comparando o xpaph 
        // //button[text()="Cadastrar"]
        cy.contains('button', 'Cadastrar').click()
    }

}

export default new CreatePage ()