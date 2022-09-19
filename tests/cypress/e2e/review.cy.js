import mapPage from '../support/pages/Map'
import foodTruckPage from '../support/pages/Foodtruck'

describe('Avaliações', () => {



    it('deve recomendar um food truck', () => {
        cy.fixture('review').as('userReview')

        cy.get('@userReview').then((data) => {
            cy.apiCreateUser(data.user)
            cy.apiLogin(data.user)
            cy.apiCreateFoodTruck(data.foodtruck)

            cy.uiLogin(data.user)

            mapPage.goToFoodtruck(data.foodtruck.name)
            foodTruckPage.addReview(data.review)
            foodTruckPage.reviewShouldBe(data.user,data.review)

        })


    })

}) 